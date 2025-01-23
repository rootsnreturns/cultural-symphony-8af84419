import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const episodes = [
  {
    id: 1,
    title: "Innovation in African Tech",
    description: "Join us as we explore the rising tech ecosystem across African markets with Dr. Sarah Mensah, a leading tech entrepreneur and innovator.",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    slug: "innovation-in-african-tech",
    guest: "Dr. Sarah Mensah",
    duration: "45 minutes",
    longDescription: "In this episode, Dr. Sarah Mensah shares her journey through Africa's tech landscape and provides insights into the innovative solutions emerging from the continent. From fintech revolutions to sustainable technology initiatives, we explore how African entrepreneurs are solving local challenges with global impact.",
    guestBio: "Dr. Sarah Mensah is the founder of TechBridge Africa and has over 15 years of experience in technology and innovation across multiple African markets. She holds a Ph.D. in Computer Science from the University of Cape Town and has been recognized as one of Africa's most influential tech leaders.",
    resources: [
      {
        title: "African Tech Ecosystem Report 2024",
        url: "#"
      },
      {
        title: "TechBridge Africa Initiative",
        url: "#"
      }
    ]
  },
  {
    id: 2,
    title: "Cultural Bridge Builders",
    description: "Discover how diaspora communities maintain connections with their roots through technology and cultural exchange with James Okonjo.",
    date: "2024-03-08",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6",
    slug: "cultural-bridge-builders",
    guest: "James Okonjo",
    duration: "38 minutes",
    longDescription: "James Okonjo leads us through an inspiring discussion about how modern technology is helping diaspora communities stay connected to their cultural heritage. We explore innovative platforms and initiatives that are bridging geographical gaps and strengthening cultural ties across continents.",
    guestBio: "James Okonjo is a cultural advocate and technology consultant who has spent the last decade building digital platforms that connect African diaspora communities. He is the founder of DiasporaBridge and serves as an advisor to several cultural preservation initiatives.",
    resources: [
      {
        title: "DiasporaBridge Platform",
        url: "#"
      },
      {
        title: "Cultural Preservation in the Digital Age",
        url: "#"
      }
    ]
  },
  {
    id: 3,
    title: "Future of African Business",
    description: "Maria Diallo shares insights on emerging opportunities in pan-African entrepreneurship and the future of business across the continent.",
    date: "2024-03-01",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349",
    slug: "future-of-african-business",
    guest: "Maria Diallo",
    duration: "42 minutes",
    longDescription: "In this forward-looking episode, Maria Diallo breaks down the exciting developments in African business landscapes. From emerging markets to cross-border trade opportunities, we explore how entrepreneurs are shaping the future of commerce across the continent.",
    guestBio: "Maria Diallo is a renowned business strategist and founder of AfricaGrowth Partners. With over two decades of experience in African markets, she has helped numerous businesses scale across borders and has been featured in Forbes Africa.",
    resources: [
      {
        title: "African Business Outlook 2024",
        url: "#"
      },
      {
        title: "Pan-African Trade Initiative",
        url: "#"
      }
    ]
  }
];

const Episode = () => {
  const { slug } = useParams();
  const episode = episodes.find((ep) => ep.slug === slug);

  if (!episode) {
    return <div className="container mx-auto px-4 py-12">Episode not found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video relative mb-8">
            <img
              src={episode.image}
              alt={episode.title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{episode.title}</h1>
          <div className="flex items-center gap-4 mb-8">
            <Button className="bg-primary hover:bg-primary/90">
              <Play className="mr-2 h-4 w-4" /> Play Episode
            </Button>
            <p className="text-gray-600">
              {new Date(episode.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} • {episode.duration}
            </p>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Episode Description</h2>
            <p className="mb-8">{episode.longDescription}</p>

            <h2 className="text-2xl font-semibold mb-4">About the Guest</h2>
            <p className="mb-8">{episode.guestBio}</p>

            <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
            <ul className="list-disc pl-6">
              {episode.resources.map((resource, index) => (
                <li key={index} className="mb-2">
                  <a href={resource.url} className="text-primary hover:underline">
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Episode;