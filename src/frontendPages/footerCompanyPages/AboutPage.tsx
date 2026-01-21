import React from "react";
import { getIconComponent } from "../../components/GetIcons";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAboutUsQuery } from "@/store/api/pages/footerApi";

export default function AboutPage() {
  const { data: aboutData, isLoading, isError } = useGetAboutUsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 bg-gray-800 rounded mb-8 animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded mb-6 animate-pulse"></div>
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-full mb-4 animate-pulse"></div>
                  <div className="h-6 bg-gray-800 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !aboutData?.data) {
    // Fallback to static content
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>
            <p className="text-lg text-gray-300 mb-12">
              Content could not be loaded. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { data } = aboutData;

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
          {data.subtitle && (
            <p className="text-lg text-gray-300 mb-12">{data.subtitle}</p>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {data.cards.map((card) => {
              const IconComponent = getIconComponent(card.logo, "fa");

              return (
                <div
                  key={card._id}
                  className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <IconComponent
                    className="w-12 h-12 mb-4"
                    style={{ color: card.logoColor }}
                  />
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-400">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
