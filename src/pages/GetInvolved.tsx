import { Button } from "@/components/ui/button";
import { Headphones, Share2, Target } from "lucide-react";

const GetInvolved = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Join the Movement</h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-secondary/10 p-6 rounded-lg">
            <Headphones className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Listen</h2>
            <p className="text-gray-300 mb-4">Tune into weekly episodes exploring African innovation and diaspora impact.</p>
            <Button variant="outline" className="w-full">
              Latest Episodes
            </Button>
          </div>
          
          <div className="bg-secondary/10 p-6 rounded-lg">
            <Share2 className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Share</h2>
            <p className="text-gray-300 mb-4">Help spread the word about African success stories and opportunities.</p>
            <Button variant="outline" className="w-full">
              Share Now
            </Button>
          </div>
          
          <div className="bg-secondary/10 p-6 rounded-lg">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Act</h2>
            <p className="text-gray-300 mb-4">Explore ways to engage with initiatives and make an impact.</p>
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary/10 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Donate</h2>
            <p className="text-gray-300 mb-6">Support initiatives discussed on the podcast and help create lasting impact.</p>
            <Button size="lg" className="w-full" id="donate">
              Make a Donation
            </Button>
          </div>
          
          <div className="bg-primary/10 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Partner with Us</h2>
            <p className="text-gray-300 mb-6">Collaborate with us to amplify African success stories and create opportunities.</p>
            <Button size="lg" variant="secondary" className="w-full">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;