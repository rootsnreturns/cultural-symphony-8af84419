
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

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
    },
    staleTime: 1000 * 60 * 5, // Consider data stale after 5 minutes
    refetchOnWindowFocus: true
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

    fetchRSS();
    const interval = setInterval(fetchRSS, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch, toast]);

  if (isLoading || !posts) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Stories</h1>
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts available yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a 
                key={post.id} 
                href={post.link || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-secondary border-gray-800 hover:border-primary transition-colors h-full">
                  <CardHeader>
                    <div className="text-sm text-primary mb-2">{post.category}</div>
                    <CardTitle className="text-xl text-white">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                    <div className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
