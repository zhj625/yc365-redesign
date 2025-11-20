import React from 'react';
import { CATEGORIES, FILTERS } from '../constants';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  activeFilter: string;
  setActiveFilter: (id: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeCategory, 
  setActiveCategory,
  activeFilter,
  setActiveFilter 
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      
      {/* Categories - Top Level */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 border-b border-slate-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap text-sm font-semibold transition-colors relative pb-2 ${
              activeCategory === cat.id 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {cat.label}
            {activeCategory === cat.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
            )}
          </button>
        ))}
        <button className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 ml-auto pr-4">
           更多
        </button>
      </div>

      {/* Chips / Tags */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-400 shrink-0">
          <Filter className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                activeFilter === filter.id
                  ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;