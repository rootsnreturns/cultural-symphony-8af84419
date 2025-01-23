import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const episodes = [
  {
    id: 1,
    title: "Innovation in African Tech",
    date: "2024-01-20",
    guest: "Dr. Sarah Mensah",
    description: "Exploring the rising tech ecosystem across African markets",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    content: "Join us as we dive deep into the fascinating world of African technology with Dr. Sarah Mensah. We explore emerging trends, challenges, and opportunities in the continent's rapidly evolving tech landscape.",
    guestBio: "Dr. Sarah Mensah is a renowned tech researcher and consultant with over 15 years of experience in African markets.",
    resources: ["African Tech Report 2024", "Innovation Hub Directory", "Startup Funding Guide"]
  },
  {
    id: 2,
    title: "Cultural Bridge Builders",
    date: "2024-01-15",
    guest: "James Okonjo",
    description: "How diaspora communities maintain connections with their roots",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6",
    content: "A fascinating discussion about maintaining cultural ties across continents. James shares insights from his work with diaspora communities.",
    guestBio: "James Okonjo is a cultural consultant and community leader working with African diaspora groups worldwide.",
    resources: ["Diaspora Network Guide", "Cultural Exchange Programs", "Community Building Toolkit"]
  },
  {
    id: 3,
    title: "Future of African Business",
    date: "2024-01-10",
    guest: "Maria Diallo",
    description: "New opportunities in pan-African entrepreneurship",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349",
    content: "Maria Diallo shares her vision for the future of African business and entrepreneurship. Learn about emerging opportunities and challenges.",
    guestBio: "Maria Diallo is a successful entrepreneur and business consultant specializing in pan-African ventures.",
    resources: ["African Business Guide", "Entrepreneurship Resources", "Market Analysis Report"]
  }
];

const EpisodeDetails = () => {
  const { id } = useParams();
  const episode = episodes.find(ep => ep.id === Number(id));

  if (!episode) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 text-white">
          Episode not found
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <img
              src={episode.image}
              alt={episode.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="text-white mb-8">
            <div className="text-sm text-gray-400 mb-2">
              {new Date(episode.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <h1 className="text-4xl font-bold mb-4">{episode.title}</h1>
            <h2 className="text-xl text-gray-400 mb-6">with {episode.guest}</h2>
            
            <div className="flex gap-4 mb-8">
              <Button className="bg-primary hover:bg-primary/90">
                <Play className="mr-2 h-4 w-4" /> Play Episode
              </Button>
              <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                Show Notes
              </Button>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-semibold mb-4">Episode Description</h3>
              <p className="text-gray-300 mb-8">{episode.content}</p>

              <h3 className="text-2xl font-semibold mb-4">About the Guest</h3>
              <p className="text-gray-300 mb-8">{episode.guestBio}</p>

              <h3 className="text-2xl font-semibold mb-4">Resources</h3>
              <ul className="list-disc list-inside text-gray-300">
                {episode.resources.map((resource, index) => (
                  <li key={index} className="mb-2">{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EpisodeDetails;