
import { Star, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string | null;
  category: string | null;
  link: string | null;
}

const FeaturedPosts = () => {
  const { data: featuredPosts, isLoading } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, date, excerpt, category, link')
        .eq('is_featured', true)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });

  // Early return if loading
  if (isLoading) {
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Star className="text-primary w-6 h-6" />
            <h2 className="text-3xl font-bold text-white">Featured Posts</h2>
          </div>
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  // Early return if no posts
  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Star className="text-primary w-6 h-6" />
          <h2 className="text-3xl font-bold text-white">Featured Posts</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
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
    </section>
  );
};

export default FeaturedPosts;
