import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES_DATA, FILTERS_DATA, MORE_CATEGORIES_DATA, TRANSLATIONS } from '../constants';
import { 
  Filter, 
  ChevronDown, 
  Clock, 
  Calendar, 
  BarChart3, 
  Activity, 
  Droplets, 
  Trophy, 
  Zap,
  Flame
} from 'lucide-react';
import { Language } from '../types';

interface FilterBarProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  lang: Language;
  currentSort: string;
  setCurrentSort: (sort: string) => void;
  hideFilters?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeCategory, 
  setActiveCategory,
  activeFilter,
  setActiveFilter,
  lang,
  currentSort,
  setCurrentSort,
  hideFilters = false
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang].filter;

  const categories = CATEGORIES_DATA[lang];
  const moreCategories = MORE_CATEGORIES_DATA[lang].map(cat => {
    let icon = null;
    if (cat.id === 'activity') icon = <Zap className="w-4 h-4 text-purple-500" />;
    else if (cat.id === 'leaderboard') icon = <Trophy className="w-4 h-4 text-yellow-500" />;
    else if (cat.id === 'hot') icon = <Flame className="w-4 h-4 text-orange-500" />;
    return { ...cat, icon };
  });

  const filters = FILTERS_DATA[lang];

  const SORT_OPTIONS = [
    { id: 'created_at', label: t.sortOptions.created, icon: <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" /> },
    { id: 'expires_at', label: t.sortOptions.expiry, icon: <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" /> },
    { id: 'total_volume', label: t.sortOptions.totalVol, icon: <BarChart3 className="w-4 h-4 text-slate-400 dark:text-slate-500" /> },
    { id: '24h_volume', label: t.sortOptions.vol24h, icon: <Activity className="w-4 h-4 text-slate-400 dark:text-slate-500" /> },
    { id: 'liquidity', label: t.sortOptions.liquidity, icon: <Droplets className="w-4 h-4 text-slate-400 dark:text-slate-500" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col gap-4 ${hideFilters ? 'mb-0' : 'mb-6'}`}>
      
      {/* Categories - Top Level */}
      <div className="flex items-center border-b border-slate-100 dark:border-slate-800 relative transition-colors duration-300">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap text-sm font-semibold transition-colors relative pb-2 px-1 ${
                activeCategory === cat.id 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* "More" Dropdown */}
        <div className="relative ml-2 pl-4 border-l border-slate-100 dark:border-slate-800 bg-gradient-to-r from-transparent to-[#f8fafc] dark:to-slate-950" ref={moreMenuRef}>
          <button 
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`text-sm font-semibold flex items-center gap-1 py-2 transition-colors ${
              showMoreMenu || moreCategories.some(c => c.id === activeCategory) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            {t.more}
            <ChevronDown className={`w-3 h-3 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
          </button>

          {showMoreMenu && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              {moreCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowMoreMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 ${
                    activeCategory === cat.id ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Only render the second row (Sort + Tags) if hideFilters is FALSE */}
      {!hideFilters && (
        <div className="flex items-center gap-3">
            <div className="relative" ref={sortMenuRef}>
                <button 
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className={`flex items-center justify-center w-9 h-9 rounded-xl border shadow-sm transition-all ${
                        showSortMenu 
                        ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-700 dark:border-slate-700' 
                        : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    title={t.sortBy}
                >
                <Filter className="w-4 h-4" />
                </button>
                
                {showSortMenu && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                        <div className="px-4 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-50 dark:border-slate-800 mb-1">{t.select}</div>
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => {
                                    setCurrentSort(opt.id);
                                    setShowSortMenu(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 ${
                                    currentSort === opt.id ? 'text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 font-medium' : 'text-slate-600 dark:text-slate-400'
                                }`}
                            >
                                {opt.icon}
                                {opt.label}
                                {currentSort === opt.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            {filters.map((filter) => (
                <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                    activeFilter === filter.id
                    ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200 shadow-md shadow-slate-800/20 dark:shadow-slate-200/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                >
                {filter.label}
                </button>
            ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;