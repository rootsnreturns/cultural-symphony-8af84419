
import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/FeaturedPosts";
import Archives from "@/components/Archives";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <FeaturedPosts />
      <Archives />
    </main>
  );
};

export default Index;
