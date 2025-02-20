
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get RSS feed URL from config
    const { data: configData, error: configError } = await supabaseClient
      .from('config')
      .select('value')
      .eq('key', 'rss_feed_url')
      .single()

    if (configError) {
      console.error('Error fetching config:', configError)
      throw new Error('Could not fetch RSS feed URL from config')
    }

    const feedUrl = configData?.value
    if (!feedUrl) {
      throw new Error('RSS feed URL not configured')
    }

    console.log('Fetching RSS feed from:', feedUrl)

    // Fetch RSS feed with cache-busting
    const response = await fetch(`${feedUrl}?_=${Date.now()}`, {
      headers: {
        'Accept': 'application/xml, application/rss+xml, text/xml',
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader Bot/1.0)',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }

    const xmlText = await response.text()
    console.log('Raw XML response:', xmlText.substring(0, 500)) // Log first 500 chars for debugging
    
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('Invalid XML response from RSS feed')
    }

    const items = xmlDoc.getElementsByTagName('item')
    console.log(`Found ${items.length} items in RSS feed`)

    // Enhanced logging for the first item
    if (items.length > 0) {
      const firstItem = items[0]
      console.log('First item details:', {
        title: firstItem.getElementsByTagName('title')[0]?.textContent,
        link: firstItem.getElementsByTagName('link')[0]?.textContent,
        pubDate: firstItem.getElementsByTagName('pubDate')[0]?.textContent,
      })
    }

    const posts = Array.from(items).map(item => {
      const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent
      const date = pubDate ? new Date(pubDate) : new Date()
      
      // Enhanced logging for date parsing
      console.log('Processing date:', {
        original: pubDate,
        parsed: date.toISOString()
      })

      return {
        guid: item.getElementsByTagName('guid')[0]?.textContent || crypto.randomUUID(),
        title: item.getElementsByTagName('title')[0]?.textContent || 'Untitled',
        link: item.getElementsByTagName('link')[0]?.textContent || null,
        date: date.toISOString(),
        content: item.getElementsByTagName('description')[0]?.textContent || '',
        excerpt: (item.getElementsByTagName('description')[0]?.textContent || '').substring(0, 150) + '...',
        category: item.getElementsByTagName('category')[0]?.textContent || 'Uncategorized',
      }
    })

    console.log(`Processing ${posts.length} posts`)

    // Update posts in database
    let successCount = 0
    for (const post of posts) {
      try {
        // Log each post before upserting
        console.log('Upserting post:', {
          guid: post.guid,
          title: post.title,
          date: post.date
        })

        const { error: upsertError } = await supabaseClient
          .from('posts')
          .upsert(
            {
              guid: post.guid,
              title: post.title,
              link: post.link,
              date: post.date,
              content: post.content,
              excerpt: post.excerpt,
              category: post.category,
            },
            {
              onConflict: 'guid'
            }
          )

        if (upsertError) {
          console.error('Error upserting post:', upsertError)
        } else {
          successCount++
        }
      } catch (error) {
        console.error('Error processing post:', error)
      }
    }

    console.log(`Successfully processed ${successCount} out of ${posts.length} posts`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Posts updated successfully', 
        count: successCount 
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    )
  } catch (error) {
    console.error('Error in fetch-rss function:', error)
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
    )
  }
})
