
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get RSS feed URL from config
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: configData } = await supabaseClient
      .from('config')
      .select('value')
      .eq('key', 'rss_feed_url')
      .single()

    if (!configData) {
      throw new Error('RSS feed URL not configured')
    }

    // Fetch RSS feed
    const response = await fetch(configData.value)
    const xmlText = await response.text()

    // Parse XML to JSON
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    const items = xmlDoc.getElementsByTagName('item')

    const posts = Array.from(items).map(item => ({
      guid: item.getElementsByTagName('guid')[0]?.textContent || '',
      title: item.getElementsByTagName('title')[0]?.textContent || '',
      link: item.getElementsByTagName('link')[0]?.textContent || '',
      pub_date: item.getElementsByTagName('pubDate')[0]?.textContent || '',
      content: item.getElementsByTagName('description')[0]?.textContent || '',
      excerpt: item.getElementsByTagName('description')[0]?.textContent?.substring(0, 150) + '...' || '',
      category: item.getElementsByTagName('category')[0]?.textContent || null,
    }))

    // Update posts in database
    for (const post of posts) {
      await supabaseClient
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
    }

    return new Response(
      JSON.stringify({ message: 'Posts updated successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
