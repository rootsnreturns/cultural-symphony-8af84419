import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const episodes = [
  {
    id: 1,
    title: "Innovation in African Tech",
    description: "Join us as we explore the rising tech ecosystem across African markets with Dr. Sarah Mensah, a leading tech entrepreneur and innovator.",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    slug: "innovation-in-african-tech",
    guest: "Dr. Sarah Mensah",
    duration: "45 minutes"
  },
  {
    id: 2,
    title: "Cultural Bridge Builders",
    description: "Discover how diaspora communities maintain connections with their roots through technology and cultural exchange with James Okonjo.",
    date: "2024-03-08",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6",
    slug: "cultural-bridge-builders",
    guest: "James Okonjo",
    duration: "38 minutes"
  },
  {
    id: 3,
    title: "Future of African Business",
    description: "Maria Diallo shares insights on emerging opportunities in pan-African entrepreneurship and the future of business across the continent.",
    date: "2024-03-01",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349",
    slug: "future-of-african-business",
    guest: "Maria Diallo",
    duration: "42 minutes"
  }
];

const EpisodeList = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Episodes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <Link key={episode.id} to={`/episode/${episode.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{episode.title}</CardTitle>
                  <CardDescription>
                    with {episode.guest} • {episode.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{episode.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(episode.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EpisodeList;