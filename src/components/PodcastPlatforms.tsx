import { Button } from "./ui/button";

const PodcastPlatforms = () => {
  const platforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com",
      icon: "/lovable-uploads/086ff8ab-83b0-4cd9-b22b-961374220df8.png"
    },
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com",
      icon: "/lovable-uploads/051b5c2a-cb4f-4394-83a8-1850f36ebb3c.png"
    },
    {
      name: "Google Podcasts",
      url: "https://podcasts.google.com",
      icon: "/lovable-uploads/320eb689-382c-470c-a417-cc4f08f72284.png"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com",
      icon: "/lovable-uploads/0d377d1f-5770-4576-b731-9893739cf816.png"
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: "/lovable-uploads/a3aed2a2-0c7e-4031-8df8-1547667d8dc6.png"
    },
    {
      name: "Audible",
      url: "https://audible.com",
      icon: "/lovable-uploads/086ff8ab-83b0-4cd9-b22b-961374220df8.png"
    }
  ];

  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Listen on Your Favorite Platform
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant="secondary"
              className="w-full h-auto py-4 bg-secondary/10 hover:bg-secondary/20 flex flex-col items-center gap-3"
              asChild
            >
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center"
              >
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm text-white">{platform.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastPlatforms;