
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting RSS fetch process');
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
    
    const feedUrl = "https://rss.beehiiv.com/feeds/O10YsDPvqE.xml";
    console.log('Fetching RSS feed from:', feedUrl);

    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xml = await response.text();
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    if (!doc) {
      throw new Error('Failed to parse XML');
    }

    const items = Array.from(doc.querySelectorAll('item'));
    console.log(`Found ${items.length} items in feed`);

    const updates = items.map((item, index) => {
      const title = item.querySelector('title')?.textContent || 'Untitled';
      const link = item.querySelector('link')?.textContent || null;
      const guid = item.querySelector('guid')?.textContent || link;
      const pubDate = item.querySelector('pubDate')?.textContent;
      const description = item.querySelector('description')?.textContent || '';
      const category = item.querySelector('category')?.textContent || 'General';

      return {
        guid,
        title,
        link,
        date: new Date(pubDate || Date.now()).toISOString(),
        content: description,
        excerpt: description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        category,
        is_featured: index < 3 // Mark the first 3 posts as featured
      };
    });

    console.log(`Preparing to upsert ${updates.length} posts`);

    const { error: upsertError } = await supabaseAdmin
      .from('posts')
      .upsert(updates, {
        onConflict: 'guid'
      });

    if (upsertError) {
      console.error('Error upserting posts:', upsertError);
      throw upsertError;
    }

    console.log('Successfully updated posts');

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
        status: 200
      }
    );
  }
});
