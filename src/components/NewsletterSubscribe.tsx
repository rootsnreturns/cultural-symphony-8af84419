
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const interests = [
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "diaspora", label: "Diaspora Engagement" },
  { id: "innovation", label: "Innovation & Technology" },
  { id: "culture", label: "Culture & Arts" },
];

const NewsletterSubscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            name,
            email,
            interests: selectedInterests,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Successfully subscribed!",
        description: "Welcome to our community of changemakers!",
      });

      // Reset form
      setName("");
      setEmail("");
      setSelectedInterests([]);
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message === "duplicate key value violates unique constraint \"newsletter_subscribers_email_key\""
          ? "This email is already subscribed."
          : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-primary/5" id="newsletter">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-200">
              Subscribe to receive curated stories, actionable resources, and exclusive updates from Africa and the diaspora.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-200 mb-2 block">Your Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="text-gray-200 mb-2 block">Your Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-200 block">Areas of Interest (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interests.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest.id}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={(checked) => {
                        setSelectedInterests(prev =>
                          checked
                            ? [...prev, interest.id]
                            : prev.filter(i => i !== interest.id)
                        );
                      }}
                    />
                    <Label
                      htmlFor={interest.id}
                      className="text-gray-200 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {interest.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
