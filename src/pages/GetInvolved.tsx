
import { Button } from "@/components/ui/button";
import { BookOpen, Share2, Target } from "lucide-react";

const GetInvolved = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Community Member",
      quote: "Being part of Roots N Returns has opened my eyes to the incredible innovations happening across Africa. It's more than just a podcast - it's a movement.",
      image: "/lovable-uploads/320eb689-382c-470c-a417-cc4f08f72284.png"
    },
    {
      name: "David Okonjo",
      role: "Tech Entrepreneur",
      quote: "Through this platform, I've connected with other African entrepreneurs and found invaluable partnerships. The impact is real and lasting.",
      image: "/lovable-uploads/0d377d1f-5770-4576-b731-9893739cf816.png"
    },
    {
      name: "Maya Patel",
      role: "Diaspora Advocate",
      quote: "The stories shared here have inspired me to reconnect with my roots and contribute to Africa's growth story. It's truly transformative.",
      image: "/lovable-uploads/a3aed2a2-0c7e-4031-8df8-1547667d8dc6.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Join the Movement</h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-secondary/10 p-6 rounded-lg">
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Read</h2>
            <p className="text-gray-300 mb-4">Discover weekly stories exploring African innovation and diaspora impact.</p>
            <Button variant="outline" className="w-full">
              Latest Stories
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
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-primary/10 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Partner with Us</h2>
            <p className="text-gray-300 mb-6">Collaborate with us to amplify African success stories and create opportunities.</p>
            <Button size="lg" className="w-full">
              Contact Us
            </Button>
          </div>
          
          <div className="bg-primary/10 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Network</h2>
            <p className="text-gray-300 mb-6">Connect with changemakers and be part of the transformation.</p>
            <Button size="lg" variant="secondary" className="w-full">
              Learn More
            </Button>
          </div>
        </div>

        <div className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Community Voices
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-secondary/10 p-6 rounded-lg flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <h3 className="text-white font-semibold">{testimonial.name}</h3>
                <p className="text-primary text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
