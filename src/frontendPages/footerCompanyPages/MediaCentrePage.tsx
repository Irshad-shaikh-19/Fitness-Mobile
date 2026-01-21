import React from "react";
import { getIconComponent } from "../../components/GetIcons";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMediaCentreQuery } from "@/store/api/pages/footerApi";

export function MediaCentrePage() {
  const { data: mediaData, isLoading, isError } = useGetMediaCentreQuery();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
                  <div className="h-4 bg-gray-800 rounded mb-2 animate-pulse w-24"></div>
                  <div className="h-6 bg-gray-800 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !mediaData?.data) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Media Centre
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              No media content available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { data } = mediaData;

  // Get the icon component based on the logo/icon name from API
  const IconComponent = getIconComponent(data.logo || "FaNewspaper", "fa");

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${data.iconColor}20` }}
            >
              <IconComponent
                className="w-6 h-6"
                style={{ color: data.iconColor }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
          </div>

          {data.description && (
            <p className="text-lg text-gray-300 mb-8">{data.description}</p>
          )}

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>
            <div className="space-y-4">
              {data.cards.map((news) => (
                <div
                  key={news._id}
                  className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <p className="text-[#F97316] text-sm mb-2">
                    {formatDate(news.createdAt)}
                  </p>
                  <h3 className="text-lg font-bold">{news.title}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
