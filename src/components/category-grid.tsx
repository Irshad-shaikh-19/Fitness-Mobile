interface Category {
  id: string;
  name: string;
  color?: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="px-4 md:px-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`relative aspect-[2/1] rounded-lg overflow-hidden cursor-pointer group ${
              category.color || 'bg-gray-800'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/60 group-hover:to-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
