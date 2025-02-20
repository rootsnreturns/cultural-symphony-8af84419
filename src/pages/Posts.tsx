
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string | null;
  category: string | null;
  link: string | null;
}

const Posts = () => {
  const { toast } = useToast();

  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-rss');
        
        if (error) {
          console.error('Error fetching RSS:', error);
          toast({
            title: "Error fetching posts",
            description: "There was an error fetching the latest posts. Please try again later.",
            variant: "destructive"
          });
        } else {
          await refetch();
          toast({
            title: "Posts updated",
            description: `Successfully fetched ${(data as any)?.count || 0} new posts.`,
          });
        }
      } catch (error) {
        console.error('Error fetching RSS:', error);
        toast({
          title: "Error fetching posts",
          description: "There was an error fetching the latest posts. Please try again later.",
          variant: "destructive"
        });
      }
    };

    // Initial fetch
    fetchRSS();
    
    // Set up periodic fetching every 15 minutes
    const interval = setInterval(fetchRSS, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch, toast]);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Stories</h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : !posts || posts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts available yet.</p>
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
