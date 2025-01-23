import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const episodes = [
  {
    id: 1,
    title: "Innovation in African Tech",
    guest: "Dr. Sarah Mensah",
    description: "Exploring the rising tech ecosystem across African markets",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
  },
  {
    id: 2,
    title: "Cultural Bridge Builders",
    guest: "James Okonjo",
    description: "How diaspora communities maintain connections with their roots",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6",
  },
  {
    id: 3,
    title: "Future of African Business",
    guest: "Maria Diallo",
    description: "New opportunities in pan-African entrepreneurship",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349",
  },
];

const FeaturedEpisodes = () => {
  return (
    <section className="py-20 bg-black" id="episodes">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Featured Episodes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode) => (
            <Card key={episode.id} className="bg-secondary text-white border-gray-800 hover:border-primary transition-colors">
              <CardHeader>
                <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <CardTitle className="text-xl mb-2">{episode.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  with {episode.guest}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{episode.description}</p>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Play className="mr-2 h-4 w-4" /> Play Episode
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-700 hover:bg-gray-800 text-[#333333] opacity-100"
                >
                  Show Notes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisodes;