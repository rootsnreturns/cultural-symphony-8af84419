
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple function to extract content between XML tags
function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 'is');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

// Extract CDATA content
function extractCDATA(text: string): string {
  if (!text) return '';
  if (text.includes('<![CDATA[')) {
    return text.replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1');
  }
  return text;
}

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
    console.log('Received XML, length:', xml.length);
    
    // Extract all items using regex instead of DOM parsing
    const itemsRegex = /<item>([\s\S]*?)<\/item>/g;
    const itemsMatches = [...xml.matchAll(itemsRegex)];
    
    if (itemsMatches.length === 0) {
      console.log('No items found in feed');
      // Return sample data for debugging if no items found
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No items found in feed',
          xmlLength: xml.length,
          xmlPreview: xml.substring(0, 200) // First 200 chars for debugging
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    console.log(`Found ${itemsMatches.length} items in feed`);

    // Process each item to extract relevant data
    const updates = itemsMatches.map((match, index) => {
      const itemXml = match[0];
      
      const title = extractTag(itemXml, 'title');
      const link = extractTag(itemXml, 'link');
      const guid = extractTag(itemXml, 'guid') || link;
      const pubDate = extractTag(itemXml, 'pubDate');
      const description = extractCDATA(extractTag(itemXml, 'description') || '');
      const category = extractTag(itemXml, 'category') || 'General';
      
      // Clean description text for excerpt
      const textDescription = description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const excerpt = textDescription.substring(0, 150) + (textDescription.length > 150 ? '...' : '');
      
      return {
        guid,
        title,
        link,
        date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        content: description,
        excerpt,
        category,
        is_featured: index < 3 // Mark the first 3 posts as featured
      };
    });

    console.log(`Preparing to upsert ${updates.length} posts`);

    // Insert into database
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
