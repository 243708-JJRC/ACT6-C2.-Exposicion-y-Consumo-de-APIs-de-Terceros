// src/components/FilterBar.tsx

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string; // El signo de interrogación significa que es opcional
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  placeholder = "Buscar...",
  categories,
  selectedCategory,
  onCategoryChange
}: FilterBarProps) {
  return (
    <div className="mb-10">
      <div className="bg-[#1f2933] p-4 rounded-lg flex items-center border border-gray-700 focus-within:border-[#ff4655] transition-colors">
        <input 
          type="text" 
          placeholder={placeholder} 
          className="bg-transparent w-full outline-none text-white placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {categories && onCategoryChange && selectedCategory && (
        <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-[#ff4655] text-white' 
                  : 'bg-[#1f2933] text-gray-300 hover:bg-[#2b3945] border border-transparent hover:border-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}