
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

  // Fetch posts from Supabase
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

  // Fetch RSS feed immediately and periodically
  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const { error } = await supabase.functions.invoke('fetch-rss', {
          method: 'POST'
        });
        
        if (error) {
          console.error('Error fetching RSS:', error);
          toast({
            title: "Error fetching posts",
            description: "There was an error fetching the latest posts. Please try again later.",
            variant: "destructive"
          });
        } else {
          // Refetch posts after successful RSS fetch
          refetch();
          toast({
            title: "Posts updated",
            description: "Latest posts have been fetched successfully.",
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

    // Fetch immediately
    fetchRSS();
    
    // Then fetch every 15 minutes
    const interval = setInterval(fetchRSS, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Stories</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-secondary border-gray-800 animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Stories</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {posts?.map((post) => (
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
      </div>
    </div>
  );
};

export default Posts;
