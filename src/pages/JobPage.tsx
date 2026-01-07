import { Briefcase } from "lucide-react";
import { PageTemplate } from "./OtherPages";

export function JobsPage() {
  const openings = [
    {
      title: "Senior Software Engineer",
      location: "Los Angeles, CA / Remote",
      department: "Engineering",
    },
    {
      title: "Content Producer",
      location: "Los Angeles, CA",
      department: "Content",
    },
    { title: "UX Designer", location: "Remote", department: "Design" },
  ];

  return (
    <PageTemplate title="Jobs" icon={Briefcase}>
      <p className="text-lg text-gray-300 mb-8">
        Join our team and help millions achieve their fitness goals.
      </p>
      <div className="space-y-4">
        {openings.map((job, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#F97316]/50 transition-colors cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <p className="text-gray-400">
              {job.location} • {job.department}
            </p>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
