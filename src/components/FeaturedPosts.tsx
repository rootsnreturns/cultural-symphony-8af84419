
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featuredPosts = [
  {
    id: 1,
    title: "Understanding African Markets",
    date: "March 15, 2024",
    excerpt: "An in-depth analysis of emerging market trends across the continent.",
    category: "Markets",
  },
  {
    id: 2,
    title: "Diaspora Investment Opportunities",
    date: "March 10, 2024",
    excerpt: "How African diaspora can participate in continental growth.",
    category: "Investment",
  },
  {
    id: 3,
    title: "Future of African Tech",
    date: "March 5, 2024",
    excerpt: "Exploring technological innovations shaping Africa's future.",
    category: "Technology",
  },
];

const FeaturedPosts = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Star className="text-primary w-6 h-6" />
          <h2 className="text-3xl font-bold text-white">Featured Posts</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="bg-secondary border-gray-800 hover:border-primary transition-colors">
              <CardHeader>
                <div className="text-sm text-primary mb-2">{post.category}</div>
                <CardTitle className="text-xl text-white">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="text-sm text-gray-500">{post.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
