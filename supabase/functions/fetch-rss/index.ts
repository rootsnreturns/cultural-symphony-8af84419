
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const feedUrl = "https://rss.beehiiv.com/feeds/O10YsDPvqE.xml";
    console.log('Fetching RSS feed from:', feedUrl);

    const response = await fetch(feedUrl, {
      headers: {
        'Accept': 'application/xml, application/rss+xml, text/xml',
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader Bot/1.0)',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('Invalid XML response from RSS feed');
    }

    const items = xmlDoc.getElementsByTagName('item');
    console.log(`Found ${items.length} items in RSS feed`);

    let insertCount = 0;
    for (const item of Array.from(items)) {
      const guid = item.getElementsByTagName('guid')[0]?.textContent;
      if (!guid) continue;

      const title = item.getElementsByTagName('title')[0]?.textContent;
      if (!title) continue;

      const link = item.getElementsByTagName('link')[0]?.textContent || null;
      const description = item.getElementsByTagName('description')[0]?.textContent || '';
      const category = item.getElementsByTagName('category')[0]?.textContent || 'General';
      const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent;
      
      // Parse HTML content to get clean excerpt
      const tempDiv = parser.parseFromString(description, 'text/html');
      const textContent = tempDiv?.documentElement?.textContent || '';
      const excerpt = textContent.substring(0, 150) + '...';
      
      const date = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();

      const { error: upsertError } = await supabaseClient
        .from('posts')
        .upsert({
          guid,
          title,
          link,
          date,
          content: description,
          excerpt,
          category
        }, {
          onConflict: 'guid'
        });

      if (!upsertError) {
        insertCount++;
      } else {
        console.error('Error upserting post:', upsertError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Posts updated successfully',
        count: insertCount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
