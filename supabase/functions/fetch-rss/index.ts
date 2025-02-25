
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { parse } from "https://deno.land/x/xml@2.1.3/mod.ts";

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

    const xmlText = await response.text();
    console.log('Received XML response, parsing...');

    const parsed = parse(xmlText);
    const channel = parsed.rss.channel;
    const items = Array.isArray(channel.item) ? channel.item : [channel.item];

    console.log(`Found ${items.length} items in feed`);

    const updates = items.map(item => ({
      guid: item.guid?._text || item.link._text,
      title: item.title._text,
      link: item.link._text,
      date: new Date(item.pubDate?._text || Date.now()).toISOString(),
      content: item.description?._text || '',
      excerpt: (item.description?._text || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      category: item.category?._text || 'General'
    }));

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
