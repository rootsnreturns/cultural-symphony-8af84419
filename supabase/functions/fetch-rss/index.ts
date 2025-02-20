
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const feedUrl = "https://rss.beehiiv.com/feeds/O10YsDPvqE.xml";
    console.log('Starting RSS fetch from:', feedUrl);

    // Fetch RSS feed
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`RSS feed fetch failed with status: ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    if (!xmlDoc) {
      throw new Error("Failed to parse XML document");
    }

    const items = xmlDoc.getElementsByTagName("item");
    console.log(`Processing ${items.length} RSS items`);

    const updates = [];
    for (const item of Array.from(items)) {
      const guid = item.getElementsByTagName('guid')[0]?.textContent;
      const title = item.getElementsByTagName('title')[0]?.textContent;

      if (!guid || !title) {
        console.log('Skipping item due to missing guid or title');
        continue;
      }

      const link = item.getElementsByTagName('link')[0]?.textContent || null;
      const description = item.getElementsByTagName('description')[0]?.textContent || '';
      const category = item.getElementsByTagName('category')[0]?.textContent || 'General';
      const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent;

      // Clean excerpt from HTML
      const tempDiv = parser.parseFromString(description, 'text/html');
      const textContent = tempDiv?.documentElement?.textContent || '';
      const excerpt = textContent.substring(0, 150) + '...';

      const date = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();

      updates.push({
        guid,
        title,
        link,
        date,
        content: description,
        excerpt,
        category
      });
    }

    console.log(`Attempting to upsert ${updates.length} posts`);

    // Batch upsert all posts
    const { error: upsertError } = await supabaseAdmin
      .from('posts')
      .upsert(updates, {
        onConflict: 'guid'
      });

    if (upsertError) {
      throw upsertError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Posts updated successfully',
        count: updates.length
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error in fetch-rss function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 // Return 200 even for errors to prevent function failure
      }
    );
  }
});
