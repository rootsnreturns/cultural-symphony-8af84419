
import { Button } from "@/components/ui/button";
import { BookOpen, Mail, Share2, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GetInvolved = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    window.location.href = "mailto:info@rootsnreturns.com";
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Roots N Returns',
          text: 'Check out Roots N Returns - Stories of Transformation from Africa and Beyond',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Join the Movement</h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-secondary/10 p-6 rounded-lg">
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Read</h2>
            <p className="text-gray-300 mb-4">Discover weekly stories exploring African innovation and diaspora impact.</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/posts')}
            >
              Latest Stories
            </Button>
          </div>
          
          <div className="bg-secondary/10 p-6 rounded-lg">
            <Share2 className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Share</h2>
            <p className="text-gray-300 mb-4">Help spread the word about African success stories and opportunities.</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleShare}
            >
              Share Now
            </Button>
          </div>
          
          <div className="bg-secondary/10 p-6 rounded-lg">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Act</h2>
            <p className="text-gray-300 mb-4">Explore ways to engage with initiatives and make an impact.</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleContact}
            >
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary/10 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Partner with Us</h2>
            <p className="text-gray-300 mb-6">Collaborate with us to amplify African success stories and create opportunities.</p>
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleContact}
            >
              Contact Us
            </Button>
          </div>
          
          <div className="bg-primary/10 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Network</h2>
            <p className="text-gray-300 mb-6">Connect with changemakers and be part of the transformation.</p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full"
              onClick={handleContact}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
