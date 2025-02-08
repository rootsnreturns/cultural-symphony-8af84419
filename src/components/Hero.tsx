
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    newsletterSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img
          src="/lovable-uploads/086ff8ab-83b0-4cd9-b22b-961374220df8.png"
          alt="African cultural background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative mx-auto px-4 z-20 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Stay Connected.<br />
          <span className="text-primary">Stories of Transformation</span><br />
          from Africa and Beyond
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 mx-auto">
          Join our community of changemakers and receive curated stories, actionable resources, and exclusive updates.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-lg"
          onClick={scrollToNewsletter}
        >
          Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
