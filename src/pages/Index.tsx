import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedEpisodes from "@/components/FeaturedEpisodes";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <FeaturedEpisodes />
      <NewsletterSubscribe />
    </main>
  );
};

export default Index;