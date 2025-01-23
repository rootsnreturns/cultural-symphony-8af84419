import { Button } from "@/components/ui/button";

const MeetTheHost = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Meet Your Host</h1>
            <p className="text-xl text-gray-300">
              Hi, I'm Akin Walker, the host of Roots N Returns. As an advocate for Africa's growth,
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
              src="/lovable-uploads/a3aed2a2-0c7e-4031-8df8-1547667d8dc6.png"
              alt="Akin Walker"
              className="absolute inset-0 w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheHost;