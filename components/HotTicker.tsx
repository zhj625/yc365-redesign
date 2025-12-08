import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Market, Language } from '../types';
import { MARKETS_DATA } from '../constants';
import { Flame, TrendingUp, ArrowRight } from 'lucide-react';

interface HotTickerProps {
  lang: Language;
  onMarketClick: (market: Market) => void;
}

const HotTicker: React.FC<HotTickerProps> = ({ lang, onMarketClick }) => {
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const allMarkets = MARKETS_DATA[lang];
  // Filter hot markets, fallback to top 5 if no hot markets defined
  const hotMarkets = allMarkets.filter(m => m.isHot).length > 0 
    ? allMarkets.filter(m => m.isHot) 
    : allMarkets.slice(0, 5);

  // Duplicate the list to ensure smooth infinite scrolling
  const tickerItems = [...hotMarkets, ...hotMarkets, ...hotMarkets];

  const handleMouseEnter = (e: React.MouseEvent, title: string) => {
    setHoveredMarket(title);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredMarket(null);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 group">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm h-12">
        
        {/* Fixed Label */}
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-2 px-4 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 animate-pulse">
            <Flame className="w-3.5 h-3.5" fill="currentColor" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 hidden sm:block">
            Trending
          </span>
        </div>

        {/* Scrolling Content */}
        <div className="flex items-center overflow-hidden w-full mask-gradient pl-28 sm:pl-32">
           <div className="flex items-center gap-8 animate-scroll whitespace-nowrap">
              {tickerItems.map((market, index) => (
                <button 
                  key={`${market.id}-${index}`}
                  onClick={() => onMarketClick(market)}
                  onMouseEnter={(e) => handleMouseEnter(e, market.title)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="group/item flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-white max-w-[200px] truncate">
                    {market.title}
                  </span>
                  <span className={`flex items-center gap-1 font-bold ${market.percentage >= 50 ? 'text-emerald-500' : 'text-orange-500'}`}>
                    {market.percentage}%
                    {market.change24h && market.change24h > 0 && <TrendingUp className="w-3 h-3" />}
                  </span>
                  {/* Scoped Hover Arrow */}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-50 transition-opacity" />
                </button>
              ))}
           </div>
        </div>

        {/* Right Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* CUSTOM TOOLTIP PORTAL */}
      {hoveredMarket && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-none px-4 py-2.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-medium rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 dark:border-slate-200/50 max-w-sm leading-relaxed animate-in fade-in zoom-in-95 duration-150"
          style={{ 
            top: tooltipPos.y + 16,
            left: Math.min(tooltipPos.x + 10, window.innerWidth - 300), // Prevent going off-screen right
          }}
        >
          {hoveredMarket}
        </div>,
        document.body
      )}
    </div>
  );
};

export default HotTicker;