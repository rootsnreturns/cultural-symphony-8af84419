import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

const Episodes = () => {
  return (
    <main className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">All Episodes</h1>
        <div className="grid gap-8">
          {episodes.map((episode) => (
            <Link key={episode.id} to={`/episodes/${episode.id}`}>
              <Card className="bg-secondary text-white border-gray-800 hover:border-primary transition-colors">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 aspect-video relative">
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="text-sm text-gray-400 mb-2">
                        {new Date(episode.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <CardTitle className="text-xl mb-2">{episode.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        with {episode.guest}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{episode.description}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Episodes;