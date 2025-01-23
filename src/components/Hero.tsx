import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1493962853295-0fd70327578a"
          alt="African landscape"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 z-20 text-center">
        <img
          src="/lovable-uploads/320eb689-382c-470c-a417-cc4f08f72284.png"
          alt="Roots N Returns Logo"
          className="w-48 h-48 mx-auto mb-8 animate-float"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Stories of Transformation from Africa and Beyond
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Connecting, informing, and inspiring Africans and the diaspora through powerful conversations
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <Play className="mr-2 h-5 w-5" /> Play Latest Episode
        </Button>
      </div>
    </div>
  );
};

export default Hero;