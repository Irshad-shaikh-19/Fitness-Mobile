import React from "react";
import { useGetPublicWhySectionQuery } from "../../store/api/pages/landingPageApi";
import { getIconComponent } from "../../components/GetIcons";
export const WhySection: React.FC = () => {
  const { data: whyData, isLoading, isError } = useGetPublicWhySectionQuery();

  if (isLoading) {
    return (
      <>
        <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
          <div className="h-12 bg-gray-800 rounded mb-16 animate-pulse mx-auto max-w-md"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (isError || !whyData?.data) {
    // Fallback to default content
    return (
      <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why FitnessFlicks?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Default cards would go here */}
        </div>
      </section>
    );
  }

  const { data } = whyData;

  return (
    <section className="py-20 px-6 md:px-12 bg-[#0D0F14]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        {data.section_title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {data.cards.map((card: any, index: any) => {
          const IconComponent = getIconComponent(card.icon);

          return (
            <div
              key={card._id}
              className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${card.iconColor}20` }}
              >
                <IconComponent
                  className="w-8 h-8"
                  style={{ color: card.iconColor }}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
