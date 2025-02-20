
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
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

    if (!configData?.value) {
      throw new Error('RSS feed URL not configured')
    }

    console.log('Fetching RSS feed from:', configData.value)

    // Fetch RSS feed with appropriate headers
    const response = await fetch(configData.value, {
      headers: {
        'Accept': 'application/xml, application/rss+xml, text/xml',
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader Bot/1.0)'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }

    const xmlText = await response.text()
    
    // Parse XML to JSON
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('Invalid XML response from RSS feed')
    }

    const items = xmlDoc.getElementsByTagName('item')
    console.log(`Found ${items.length} items in RSS feed`)

    const posts = Array.from(items).map(item => ({
      guid: item.getElementsByTagName('guid')[0]?.textContent || '',
      title: item.getElementsByTagName('title')[0]?.textContent || '',
      link: item.getElementsByTagName('link')[0]?.textContent || '',
      pub_date: item.getElementsByTagName('pubDate')[0]?.textContent || '',
      content: item.getElementsByTagName('description')[0]?.textContent || '',
      excerpt: item.getElementsByTagName('description')[0]?.textContent?.substring(0, 150) + '...' || '',
      category: item.getElementsByTagName('category')[0]?.textContent || null,
    }))

    console.log(`Processing ${posts.length} posts`)

    // Update posts in database
    for (const post of posts) {
      const { error: upsertError } = await supabaseClient
        .from('posts')
        .upsert(
          {
            guid: post.guid,
            title: post.title,
            link: post.link,
            pub_date: post.pub_date,
            content: post.content,
            excerpt: post.excerpt,
            category: post.category,
            date: post.pub_date,
          },
          {
            onConflict: 'guid',
          }
        )

      if (upsertError) {
        console.error('Error upserting post:', upsertError)
        // Continue with other posts even if one fails
      }
    }

    return new Response(
      JSON.stringify({ message: 'Posts updated successfully', count: posts.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in fetch-rss function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
