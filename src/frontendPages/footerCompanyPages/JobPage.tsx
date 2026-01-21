import React from "react";
import { getIconComponent } from "../../components/GetIcons";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetJobsSectionQuery } from "@/store/api/pages/footerApi";

export function JobsPage() {
  const { data: jobsData, isLoading, isError } = useGetJobsSectionQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 bg-gray-800 rounded mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded mb-8 animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
                >
                  <div className="h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !jobsData?.data) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Jobs</h1>
            <p className="text-lg text-gray-300 mb-8">
              No job openings available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { data } = jobsData;

  // Get the icon component based on the icon name from API
  const IconComponent = getIconComponent(data.icon || "FaBriefcase", "fa");

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${data.iconColor}20` }}
            >
              {/* Use IconComponent here */}
              <IconComponent
                className="w-6 h-6"
                style={{ color: data.iconColor }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
          </div>

          {data.subtitle && (
            <p className="text-lg text-gray-300 mb-8">{data.subtitle}</p>
          )}

          <div className="space-y-4">
            {data.cards.map((job) => (
              <div
                key={job._id}
                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#F97316]/50 transition-colors cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-2">{job.role}</h3>
                <p className="text-gray-400">
                  {job.location} • {job.department}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
