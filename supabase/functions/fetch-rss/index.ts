
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

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

    // Fetch RSS feed
    const response = await fetch(configData.value)

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }

    const xmlText = await response.text()
    
    // Parse XML to JSON using Deno DOM
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    if (!xmlDoc) {
      throw new Error('Failed to parse XML response')
    }

    const items = xmlDoc.getElementsByTagName('item')
    console.log(`Found ${items.length} items in RSS feed`)

    const posts = Array.from(items).map(item => ({
      guid: item.querySelector('guid')?.textContent || crypto.randomUUID(),
      title: item.querySelector('title')?.textContent || 'Untitled',
      link: item.querySelector('link')?.textContent || null,
      pub_date: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
      content: item.querySelector('description')?.textContent || '',
      excerpt: (item.querySelector('description')?.textContent || '').substring(0, 150) + '...',
      category: item.querySelector('category')?.textContent || 'Uncategorized',
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
            date: new Date(post.pub_date).toISOString(),
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
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Posts updated successfully', 
        count: posts.length 
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
        status: 200 // Return 200 even for errors to avoid CORS issues
      }
    )
  }
})
