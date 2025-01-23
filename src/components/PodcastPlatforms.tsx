import { Button } from "./ui/button";

const PodcastPlatforms = () => {
  const platforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com",
      icon: "/lovable-uploads/c6c1537e-5211-4f0c-a3b3-06a1c78c5723.png"
    },
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com",
      icon: "/lovable-uploads/13485fe9-edd1-4caf-8b9a-69ec79537ebd.png"
    },
    {
      name: "Google Podcasts",
      url: "https://podcasts.google.com",
      icon: "/lovable-uploads/d0d93691-f427-416a-8a91-d6903a78f7e4.png"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com",
      icon: "/lovable-uploads/dee34e33-fcf5-4ede-8369-97554bf4d76a.png"
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: "/lovable-uploads/f0b324ee-597e-42c1-8d93-a7543165dba1.png"
    }
  ];

  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Listen on Your Favorite Platform
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                  className="w-12 h-12 object-contain"
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