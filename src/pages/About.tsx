
import { Globe2, Rocket, Users, Lightbulb, Newspaper, Briefcase, Mic, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Hero Section */}
<div className="text-center mb-12">
  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Roots N Returns</h1>
  <p className="text-3xl md:text-4xl font-semibold text-white mb-3">
    We make Africa’s most promising opportunities accessible to the diaspora.
  </p>
  <p className="text-lg md:text-xl text-primary">
    Turning Heritage into Impact, One Investment at a Time
  </p>
</div>

{/* Mission + Credibility */}
<section className="mb-16">
  <div className="grid lg:grid-cols-3 gap-8 items-start">
    <div className="lg:col-span-2">
      <div className="max-w-3xl text-gray-300 space-y-5 text-lg">
        <p>
          At Roots N Returns, we believe Africa’s future will be shaped by those who know it best — the people who carry its heritage and believe in its promise. We are a global community connecting Africa and its diaspora, transforming shared roots into real-world returns — economic, social, and cultural.
        </p>
        <p>
          Our mission is simple: make it easier for the diaspora and global allies to invest in Africa’s growth sectors — in ways that are profitable, purposeful, and sustainable.
        </p>
      </div>
    </div>
    <aside className="bg-secondary/60 border border-gray-800 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">In good company</h3>
      <ul className="space-y-3 text-gray-300">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          <span>Growing, high-intent subscriber base</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          <span>Notable partnerships and expert contributors</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          <span>Recent events: roundtables and sector deep dives</span>
        </li>
      </ul>
    </aside>
  </div>
</section>

        {/* Why Roots N Returns */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Roots N Returns Exists</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Globe2 className="h-5 w-5 text-primary" />A Bridge Between Africa & Its Diaspora</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We connect diaspora talent, investors, and innovators with on-the-ground opportunities to fuel Africa's growth.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Rocket className="h-5 w-5 text-primary" />From Conversation to Execution</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We transform stories into strategies and conversations into real impact, empowering individuals and businesses to contribute meaningfully.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Users className="h-5 w-5 text-primary" />A Curated, High-Intent Community</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Our audience isn't passive—they're builders, funders, and changemakers seeking credible insights, transparent opportunities, and meaningful collaborations.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Lightbulb className="h-5 w-5 text-primary" />Purpose Meets Profit</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                We believe Africa's development doesn't have to be a trade-off between purpose and profit. Our platform champions socially impactful, financially viable, and globally competitive initiatives.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Newspaper className="h-5 w-5 text-primary" />Roots N Returns Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
We spotlight our quarterly themes across agribusiness, housing, logistics, and the creative economy. Each issue blends deep-dive analysis, founder stories, and actionable investment pathways.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Users className="h-5 w-5 text-primary" />Community & Networking</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
Join a vetted network of diaspora leaders, entrepreneurs, and investors shaping Africa’s future together.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Briefcase className="h-5 w-5 text-primary" />Opportunities & Investment Pathways</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
We spotlight diaspora-led ventures, investment-ready startups, and projects that align with both financial returns and social impact.
              </CardContent>
            </Card>
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3"><Mic className="h-5 w-5 text-primary" />Exclusive Events & Thought Leadership</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
Participate in virtual roundtables, sector deep dives, and expert panels — connecting you directly to those driving Africa’s growth.
              </CardContent>
            </Card>
          </div>
</section>
<section className="mt-16 text-center">
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
    Be part of Africa’s next growth story — join the Roots N Returns community today.
  </h2>
  <Link to="/">
    <Button size="lg" className="mt-2">
      Subscribe
    </Button>
  </Link>
</section>
</div>
    </main>
  );
};

export default About;
