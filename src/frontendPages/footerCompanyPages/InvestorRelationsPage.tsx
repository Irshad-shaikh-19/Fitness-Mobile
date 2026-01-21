import React from "react";
import { getIconComponent } from "../../components/GetIcons";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetInvestorRelationsQuery } from "@/store/api/pages/footerApi";

export function InvestorRelationsPage() {
  const {
    data: investorData,
    isLoading,
    isError,
  } = useGetInvestorRelationsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 bg-gray-800 rounded mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded mb-8 animate-pulse"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 text-center"
                >
                  <div className="h-10 bg-gray-800 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !investorData?.data) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Investor Relations
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Investor information could not be loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { data } = investorData;

  // Get the icon component based on the logo name from API
  const IconComponent = getIconComponent(data.logo || "FaChartLine", "fa");

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${data.logoColor}20` }}
            >
              <IconComponent
                className="w-6 h-6"
                style={{ color: data.logoColor }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
          </div>

          {data.subtitle && (
            <p className="text-lg text-gray-300 mb-8">{data.subtitle}</p>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {data.cards.map((stat) => (
              <div
                key={stat._id}
                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 text-center hover:border-gray-700 transition-colors"
              >
                <p className="text-4xl font-bold text-[#F97316] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
