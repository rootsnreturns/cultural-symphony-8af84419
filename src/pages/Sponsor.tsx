
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Sponsor = () => {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Why Sponsor Roots N Returns?</h1>
        
        <div className="max-w-3xl mx-auto mb-16 text-gray-300">
          <p className="mb-6">
            At Roots N Returns, we're not just a newsletter—we're a movement. We connect Africa and its diaspora through trust, transparency, and action, fostering conversations that lead to real-world investments, collaborations, and innovation.
          </p>
          <p>
            Our mission is clear: turn shared heritage into collective progress by bridging the gap between diaspora-driven initiatives, African entrepreneurs, and global investors. By sponsoring Roots N Returns, you're not just advertising—you're aligning your brand with a transformative vision for Africa's future.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Who We Reach</h2>
          <p className="text-gray-300 mb-6">Our community is made up of highly engaged, forward-thinking changemakers who are:</p>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>Diaspora Investors & Entrepreneurs – Actively seeking opportunities to engage, invest, and build within Africa.</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>Industry Professionals & Thought Leaders – Across tech, finance, sustainability, and innovation.</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>Policymakers & Development Advocates – Committed to shaping Africa's economic and social future.</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span>Cultural Enthusiasts & Global Citizens – Passionate about Africa's resurgence and global influence.</span>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Sponsorship Benefits for Businesses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Direct Access to a Niche & Influential Audience</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Your brand will be in front of decision-makers, investors, and professionals with deep ties to Africa's economic growth.
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Position Your Brand as a Thought Leader</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Align with a trusted platform that drives real conversations about business, innovation, and impact.
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Authentic, Story-Driven Advertising</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We integrate sponsors organically, ensuring your brand's message resonates with our audience. No intrusive ads—just strategic, value-driven exposure.
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">ROI-Driven Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We focus on high-intent, engaged subscribers, meaning your sponsorship dollars go further with higher conversion potential.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Ways to Partner With Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Newsletter Sponsorships</h3>
                <p className="text-gray-300">Feature your brand in front of thousands of engaged readers.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Branded Content & Thought Leadership</h3>
                <p className="text-gray-300">Get featured in a custom editorial piece that aligns with your mission.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Event Partnerships</h3>
                <p className="text-gray-300">Sponsor an exclusive panel, roundtable, or networking event connecting leaders across the diaspora.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Custom Collaborations</h3>
                <p className="text-gray-300">Have a unique idea? Let's co-create an opportunity that maximizes your brand's impact.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsor;
