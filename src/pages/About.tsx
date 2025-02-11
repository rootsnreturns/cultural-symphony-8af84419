
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Roots N Returns</h1>
          <p className="text-2xl text-primary font-semibold">Reimagining Pan-Africanism: Turning Heritage into Impact</p>
        </div>

        {/* Mission Statement */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto text-gray-300 space-y-6 text-lg">
            <p>
              At Roots N Returns, we believe Africa's future is built through trust, collaboration, and action—not just conversation. We are a global movement connecting Africa and its diaspora, transforming shared heritage into collective progress.
            </p>
            <p>
              We don't just highlight opportunities—we create pathways for diaspora investors, entrepreneurs, and changemakers to engage meaningfully with Africa's economic and social transformation. Our platform bridges the gap between vision and execution, ensuring that Africa's growth is driven by those who care most about its future.
            </p>
          </div>
        </div>

        {/* Why Roots N Returns */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Roots N Returns?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">A Bridge Between Africa & Its Diaspora</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We connect diaspora talent, investors, and innovators with on-the-ground opportunities to fuel Africa's growth.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Beyond Conversations—We Drive Action</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We transform stories into strategies and conversations into real impact, empowering individuals and businesses to contribute meaningfully.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">A Curated, High-Intent Community</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Our audience isn't passive—they're builders, funders, and changemakers seeking credible insights, transparent opportunities, and meaningful collaborations.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Aligning Purpose with Profit</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We believe Africa's development doesn't have to be a trade-off between purpose and profit. Our platform champions socially impactful, financially viable, and globally competitive initiatives.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Roots N Returns Newsletter</h3>
                <p className="text-gray-300">
                  Stay informed with curated insights, exclusive interviews, and deep-dive analysis on Africa's most dynamic sectors.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Community & Networking</h3>
                <p className="text-gray-300">
                  Join a network of diaspora leaders, entrepreneurs, and investors shaping Africa's future through collaborative projects, mentorship, and strategic partnerships.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Opportunities & Investment Pathways</h3>
                <p className="text-gray-300">
                  We spotlight diaspora-led ventures, investment-ready startups, and actionable opportunities to fuel economic growth and innovation.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Exclusive Events & Thought Leadership</h3>
                <p className="text-gray-300">
                  Participate in virtual discussions, roundtables, and industry panels featuring experts driving Africa's transformation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
