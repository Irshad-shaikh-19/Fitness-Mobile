import { useState } from "react";
import { Search as SearchIcon, X, Play, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockWorkouts = [
  {
    id: 1,
    title: "30-MIN HIIT BURN",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "30 min",
    coach: "Mike T.",
  },
  {
    id: 2,
    title: "Core Blast",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    category: "Core",
    duration: "15 min",
    coach: "Sarah M.",
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=600&fit=crop&q=80",
    category: "Yoga",
    duration: "25 min",
    coach: "Emily R.",
  },
  {
    id: 4,
    title: "Upper Body Strength",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=600&fit=crop&q=80",
    category: "Strength",
    duration: "45 min",
    coach: "James K.",
  },
];

const mockCategories = ["All", "Cardio", "Strength", "Yoga", "Core"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filteredWorkouts = mockWorkouts.filter((workout) => {
    const matchesQuery =
      !query ||
      workout.title.toLowerCase().includes(query.toLowerCase()) ||
      workout.coach.toLowerCase().includes(query.toLowerCase()) ||
      workout.category.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      workout.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  const isSearching = query.length > 0 || selectedCategory !== "All";

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white pb-24 pt-6">
      <main className="px-4 md:px-12 pt-4">
        {/* Search + Filter Row */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search workouts, coach, or category..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-gray-900 border-gray-700 text-white text-lg rounded-xl"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Dropdown Button */}
            <div className="relative md:w-56">
              <Button
                variant="outline"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="w-full h-14 border-gray-700 text-gray-300 justify-between"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{selectedCategory}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {/* Dropdown */}
              {showFilterDropdown && (
                <div className="absolute z-20 mt-2 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden">
                  {mockCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-[#F97316] text-black font-semibold"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredWorkouts.length > 0 ? (
          <>
            <h2 className="text-lg font-bold mb-4">
              {isSearching ? "Search Results" : "Recent Searches"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredWorkouts.map((workout) => (
                <div key={workout.id} className="group cursor-pointer">
                  <div className="relative rounded-md overflow-hidden bg-gray-800 transition-all duration-300 active:scale-95 sm:group-hover:scale-105 sm:group-hover:shadow-2xl">
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={workout.thumbnailUrl}
                        alt={workout.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-xs font-semibold">
                        {workout.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <h3 className="font-bold text-sm mb-1 line-clamp-1">
                        {workout.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-300">
                        <span className="font-semibold text-green-400">
                          {workout.category}
                        </span>
                        <span>•</span>
                        <span>{workout.coach}</span>
                      </div>
                    </div>

                    {/* Hover Play */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No results found</h2>
            <p className="text-gray-400">
              Try searching with different keywords or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
