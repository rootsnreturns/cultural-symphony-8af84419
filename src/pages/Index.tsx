import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedEpisodes from "@/components/FeaturedEpisodes";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <FeaturedEpisodes />
    </main>
  );
};

export default Index;