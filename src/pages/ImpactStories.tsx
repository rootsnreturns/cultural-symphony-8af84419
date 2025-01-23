import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const impactData = [
  { name: "2023 Q1", value: 200 },
  { name: "2023 Q2", value: 300 },
  { name: "2023 Q3", value: 400 },
  { name: "2023 Q4", value: 500 },
];

const ImpactStories = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Impact Stories</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Rebecca's Success Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Rebecca's startup at ActivSpaces raised $1M in funding after featuring in Episode 4.
              </p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Diaspora Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Diaspora-backed scholarships supported 500 students in Ghana after Episode 7 inspired
                listeners to act.
              </p>
              <Button className="w-full" size="lg">
                Submit Your Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImpactStories;