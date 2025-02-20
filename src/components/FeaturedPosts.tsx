
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string | null;
  category: string | null;
  link: string | null;
}

const FeaturedPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_featured', true)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Star className="text-primary w-6 h-6" />
            <h2 className="text-3xl font-bold text-white">Featured Posts</h2>
          </div>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
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
      </div>
    </section>
  );
};

export default FeaturedPosts;
