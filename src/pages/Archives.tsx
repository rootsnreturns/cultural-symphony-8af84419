
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  date: string;
  link: string | null;
}

const Archives = () => {
  const { data: posts } = useQuery({
    queryKey: ['archives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });

  // Group posts by year and month
  const groupedPosts = posts?.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(post);
    return acc;
  }, {} as Record<number, Record<string, Post[]>>);

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Archives</h1>
        
        {groupedPosts && Object.entries(groupedPosts).map(([year, months]) => (
          <div key={year} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{year}</h2>
            {Object.entries(months).map(([month, monthPosts]) => (
              <Card key={`${year}-${month}`} className="mb-4 bg-secondary border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{month}</h3>
                  <ul className="space-y-2">
                    {monthPosts.map((post) => (
                      <li key={post.id}>
                        <a
                          href={post.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary block py-1"
                        >
                          {post.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archives;
