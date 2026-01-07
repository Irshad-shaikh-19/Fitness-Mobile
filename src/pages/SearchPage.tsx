import { useState } from "react";
import { Search as SearchIcon, X, Play, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";

const mockWorkouts = [
  {
    id: 1,
    title: "30-MIN HIIT BURN",
    thumbnailUrl: "",
    category: "Cardio",
    duration: "30 min",
    coach: "Mike T.",
  },
  {
    id: 2,
    title: "Core Blast",
    thumbnailUrl: "",
    category: "Core",
    duration: "15 min",
    coach: "Sarah M.",
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    thumbnailUrl: "",
    category: "Yoga",
    duration: "25 min",
    coach: "Emily R.",
  },
  {
    id: 4,
    title: "Upper Body Strength",
    thumbnailUrl: "",
    category: "Strength",
    duration: "45 min",
    coach: "James K.",
  },
];

const mockCategories = [
  { id: "cardio", name: "Cardio" },
  { id: "strength", name: "Strength" },
  { id: "yoga", name: "Yoga" },
  { id: "core", name: "Core" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredWorkouts = mockWorkouts.filter((workout) => {
    const matchesQuery =
      !query ||
      workout.title.toLowerCase().includes(query.toLowerCase()) ||
      workout.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      workout.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <Navbar /> */}

      <main className="px-6 md:px-12 py-8 pt-24">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by title, coach, genre, or category..."
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

          <div className="flex items-center gap-4 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-700 text-gray-300"
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>

            {selectedCategory && (
              <div className="flex items-center gap-2 bg-[#F97316]/20 text-[#F97316] px-3 py-1 rounded-full text-sm">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("")}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(
                        cat.name === selectedCategory ? "" : cat.name
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-[#F97316] text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {filteredWorkouts.length > 0 ? (
          <>
            <p className="text-gray-400 mb-6">
              {filteredWorkouts.length} results found
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredWorkouts.map((workout) => (
                <div key={workout.id} className="group cursor-pointer">
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-800">
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs">
                      {workout.duration}
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mt-2 truncate">
                    {workout.title}
                  </h3>
                  <p className="text-xs text-gray-400">{workout.category}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No results found</h2>
            <p className="text-gray-400">Try different keywords</p>
          </div>
        )}
      </main>
    </div>
  );
}
