
import { Archive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const archives = [
  {
    year: "2024",
    months: ["March", "February", "January"],
    count: 15,
  },
  {
    year: "2023",
    months: ["December", "November", "October"],
    count: 12,
  },
];

const Archives = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Archive className="text-primary w-6 h-6" />
          <h2 className="text-3xl font-bold text-white">Archives</h2>
        </div>
        <div className="max-w-2xl mx-auto">
          {archives.map((year) => (
            <Card key={year.year} className="mb-4 bg-secondary border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">{year.year}</h3>
                  <span className="text-primary">{year.count} posts</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {year.months.map((month) => (
                    <button
                      key={month}
                      className="px-4 py-2 text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Archives;
