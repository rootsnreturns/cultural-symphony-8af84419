
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading";
import { toast } from "@/components/ui/use-toast";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string | null;
  category: string | null;
  link: string | null;
}

const Posts = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts from database');
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      console.log('Retrieved posts:', data?.length || 0);
      return data as Post[];
    }
  });

  // Define fetchRSS outside useEffect so it can be used in the button onClick
  const fetchRSS = async () => {
    if (isFetching) return;
    
    console.log('Initiating RSS fetch');
    setIsFetching(true);
    try {
      const response = await supabase.functions.invoke('fetch-rss');
      console.log('RSS fetch response:', response);
      
      if (response.error) {
        console.error('Error in RSS fetch:', response.error);
        toast({
          title: "Error fetching latest posts",
          description: "Couldn't get the latest content. Please try again later.",
          variant: "destructive"
        });
      } else {
        await refetch();
        toast({
          title: "Posts updated",
          description: "The latest posts have been fetched successfully."
        });
      }
    } catch (error) {
      console.error('Error in fetchRSS:', error);
      toast({
        title: "Connection error",
        description: "Couldn't connect to the RSS service. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    // Initial fetch only if no posts
    if (!posts || posts.length === 0) {
      fetchRSS();
    }
    
    // Set up periodic fetching every 15 minutes
    const interval = setInterval(fetchRSS, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch, posts, isFetching]);

  if (isError) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Stories</h1>
          <div className="text-red-500 text-center">Error loading posts. Please try again later.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Stories</h1>
        {isLoading || isFetching ? (
          <LoadingSpinner />
        ) : !posts || posts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 mb-4">No posts available yet.</p>
            <button 
              onClick={() => fetchRSS()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              disabled={isFetching}
            >
              {isFetching ? 'Fetching...' : 'Fetch Latest Posts'}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a 
                key={post.id} 
                href={post.link || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="rounded-lg border border-gray-800 bg-secondary p-6 h-full transition-colors group-hover:border-primary">
                  <div className="mb-6">
                    <div className="text-sm text-primary mb-2">{post.category}</div>
                    <h3 className="text-xl font-semibold text-white mb-4">{post.title}</h3>
                    <p className="text-gray-400">{post.excerpt}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
