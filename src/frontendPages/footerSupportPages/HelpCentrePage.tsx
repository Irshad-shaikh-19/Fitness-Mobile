import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetHelpCentreQuery } from "@/store/api/pages/footerSupportApi";
import { getIconComponent } from "@/components/GetIcons";

export default function HelpCentrePage() {
  const { data: helpData, isLoading, isError } = useGetHelpCentreQuery();
  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- LOADING STATE ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <main className="py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-10 w-64 mx-auto bg-gray-800 rounded mb-4 animate-pulse" />
              <div className="h-5 w-80 mx-auto bg-gray-800 rounded animate-pulse" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded mb-4 animate-pulse" />
                  <div className="h-5 bg-gray-800 rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (isError || !helpData?.data) {
    return (
      <div className="min-h-screen bg-[#0D0F14] text-white">
        <main className="py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Help Centre</h1>
            <p className="text-gray-400">
              Help centre content is currently unavailable.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const { title, subtitle, cards } = helpData.data;

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredCards = cards.filter((card) => {
    const search = searchTerm.toLowerCase();
    return (
      card.title.toLowerCase().includes(search) ||
      card.subtitle?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* ----------- HEADER ----------- */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

            {subtitle && (
              <p className="text-lg text-gray-400 mb-8">{subtitle}</p>
            )}

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* ----------- CATEGORIES ----------- */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>

            {filteredCards.length === 0 ? (
              <p className="text-gray-400">
                No results found for "{searchTerm}"
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => {
                  const IconComponent = getIconComponent(
                    card.logo || "FaQuestionCircle",
                    "fa"
                  );

                  return (
                    <div
                      key={card._id}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#F97316]/50 transition-colors cursor-pointer"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                        style={{
                          backgroundColor: `${card.logoColor}20`,
                        }}
                      >
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: card.logoColor }}
                        />
                      </div>

                      <h3 className="text-lg font-bold mb-2">
                        {card.title}
                      </h3>

                      {card.subtitle && (
                        <p className="text-gray-400 text-sm">
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
