import { Newspaper } from "lucide-react";
import { PageTemplate } from "./OtherPages";

export function MediaCentrePage() {
  return (
    <PageTemplate title="Media Centre" icon={Newspaper}>
      <p className="text-lg text-gray-300 mb-8">
        Welcome to the FitnessFlicks Media Centre.
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Latest News</h2>
        <div className="space-y-4">
          {[
            {
              date: "Dec 15, 2024",
              title: "FitnessFlicks Reaches 10 Million Subscribers",
            },
            {
              date: "Nov 28, 2024",
              title: "New Partnership with Olympic Athletes Announced",
            },
          ].map((news, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
            >
              <p className="text-[#F97316] text-sm mb-2">{news.date}</p>
              <h3 className="text-lg font-bold">{news.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </PageTemplate>
  );
}
