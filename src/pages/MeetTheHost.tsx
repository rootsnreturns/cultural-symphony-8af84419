import { Button } from "@/components/ui/button";

const MeetTheHost = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Meet Your Host</h1>
            <p className="text-xl text-gray-300">
              Hi, I'm Sarah Johnson, the host of Roots N Returns. As an advocate for Africa's growth,
              I'm passionate about amplifying the voices driving innovation and progress across the
              continent and the diaspora.
            </p>
            <Button asChild>
              <a href="https://twitter.com/rootsnreturns" target="_blank" rel="noopener noreferrer">
                Follow My Journey
              </a>
            </Button>
          </div>
          <div className="relative h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
              alt="Sarah Johnson"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheHost;