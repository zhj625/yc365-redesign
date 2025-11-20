import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES, FILTERS } from '../constants';
import { 
  Filter, 
  ChevronDown, 
  Clock, 
  Calendar, 
  BarChart3, 
  Activity, 
  Droplets, 
  Trophy, 
  Zap 
} from 'lucide-react';

interface FilterBarProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  activeFilter: string;
  setActiveFilter: (id: string) => void;
}

const MORE_CATEGORIES = [
  { id: 'activity', label: '活动', icon: <Zap className="w-4 h-4 text-purple-500" /> },
  { id: 'leaderboard', label: '排行榜', icon: <Trophy className="w-4 h-4 text-yellow-500" /> },
];

const SORT_OPTIONS = [
  { id: 'created_at', label: '创建时间', icon: <Clock className="w-4 h-4 text-slate-400" /> },
  { id: 'expires_at', label: '到期时间', icon: <Calendar className="w-4 h-4 text-slate-400" /> },
  { id: 'total_volume', label: '总交易量', icon: <BarChart3 className="w-4 h-4 text-slate-400" /> },
  { id: '24h_volume', label: '24小时交易量', icon: <Activity className="w-4 h-4 text-slate-400" /> },
  { id: 'liquidity', label: '流动性', icon: <Droplets className="w-4 h-4 text-slate-400" /> },
];

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeCategory, 
  setActiveCategory,
  activeFilter,
  setActiveFilter 
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentSort, setCurrentSort] = useState('created_at');
  
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col gap-4 mb-6">
      
      {/* Categories - Top Level */}
      <div className="flex items-center border-b border-slate-100 relative">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 flex-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap text-sm font-semibold transition-colors relative pb-2 px-1 ${
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
        </div>

        {/* "More" Dropdown */}
        <div className="relative ml-2 pl-4 border-l border-slate-100 bg-gradient-to-r from-transparent to-[#f8fafc]" ref={moreMenuRef}>
          <button 
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`text-sm font-semibold flex items-center gap-1 py-2 transition-colors ${
              showMoreMenu || MORE_CATEGORIES.some(c => c.id === activeCategory) ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            更多
            <ChevronDown className={`w-3 h-3 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
          </button>

          {showMoreMenu && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              {MORE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowMoreMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors flex items-center gap-2.5 ${
                    activeCategory === cat.id ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-600'
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

      {/* Chips / Tags & Sort Button */}
      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <div className="relative" ref={sortMenuRef}>
            <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className={`flex items-center justify-center w-9 h-9 rounded-xl border shadow-sm transition-all ${
                    showSortMenu ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 hover:text-blue-600'
                }`}
                title="排序方式"
            >
              <Filter className="w-4 h-4" />
            </button>
            
            {showSortMenu && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 mb-1">请选择</div>
                    {SORT_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => {
                                setCurrentSort(opt.id);
                                setShowSortMenu(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 ${
                                currentSort === opt.id ? 'text-slate-900 bg-slate-50 font-medium' : 'text-slate-600'
                            }`}
                        >
                            {opt.icon}
                            {opt.label}
                            {currentSort === opt.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                activeFilter === filter.id
                  ? 'bg-slate-800 text-white border-slate-800 shadow-md shadow-slate-800/20'
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