import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedEpisodes from "@/components/FeaturedEpisodes";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import PodcastPlatforms from "@/components/PodcastPlatforms";
import EpisodeList from "@/components/EpisodeList";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <FeaturedEpisodes />
      <EpisodeList />
      <PodcastPlatforms />
      <NewsletterSubscribe />
    </main>
  );
};

export default Index;