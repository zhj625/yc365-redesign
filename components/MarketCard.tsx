import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Market, Language } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  BrainCircuit, 
  X, 
  MessageSquare, 
  Calendar,
  Users,
  BarChart3
} from 'lucide-react';
import { analyzeMarket } from '../services/geminiService';
import { TRANSLATIONS, CATEGORIES_DATA } from '../constants';

interface MarketCardProps {
  market: Market;
  lang: Language;
}

const DonutChart: React.FC<{ percentage: number, lang: Language }> = ({ percentage, lang }) => {
  const size = 54; 
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const colorClass = percentage >= 50 ? 'text-emerald-500 dark:text-emerald-400' : 'text-orange-500 dark:text-orange-400';
  const t = TRANSLATIONS[lang].market;

  return (
    <div style={{ width: size, height: size }} className="relative flex items-center justify-center shrink-0">
      <svg width={size} height={size} className="transform -rotate-90 transition-all duration-500">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100 dark:text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-sm font-bold ${colorClass} leading-none`}>{percentage}%</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium leading-none mt-0.5">{t.chance}</span>
      </div>
    </div>
  );
};

const getCategoryStyle = (categoryId: string, isDark: boolean) => {
    switch(categoryId) {
        case 'crypto': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
        case 'politics': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
        case 'sports': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
        case 'tech': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
        default: return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
};

const MarketCard: React.FC<MarketCardProps> = ({ market, lang }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  
  // Tooltip State
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const t = TRANSLATIONS[lang].market;
  const categoryLabel = CATEGORIES_DATA[lang].find(c => c.id === market.category)?.label || market.category;

  const handleAiAnalyze = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (aiAnalysis) {
      setAiAnalysis(null); 
      return;
    }

    setIsAnalyzing(true);
    const result = await analyzeMarket(market.title);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setShowTooltip(true);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-100 dark:hover:border-blue-900/50 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full">
      
      {/* Top Section: Image + Title + Chart */}
      <div className="p-4 flex items-start gap-3 grow">
        <img 
          src={market.iconUrl} 
          alt={market.title}
          className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0 border border-slate-100 dark:border-slate-800 mt-0.5"
        />
        
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          {/* Title with Custom Tooltip Handlers */}
          <h3 
            className="text-slate-800 dark:text-slate-100 font-bold leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors text-[15px] line-clamp-2 overflow-hidden text-ellipsis cursor-help"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {market.title}
          </h3>
          
          {/* Metadata */}
          <div className="flex items-center flex-wrap gap-2 text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">
             <span className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {market.volume} {t.vol}
             </span>
             <span className="whitespace-nowrap">{t.ends} {market.endDate}</span>
          </div>
        </div>

        <div className="shrink-0 pt-1">
          <DonutChart percentage={market.percentage} lang={lang} />
        </div>
      </div>

      {/* AI Analysis Overlay */}
      {aiAnalysis && (
        <div className="absolute inset-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-6 flex flex-col items-start animate-in fade-in slide-in-from-bottom-4 duration-300 border-b border-purple-100 dark:border-purple-900/30">
           <div className="flex items-center justify-between w-full mb-3">
             <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
               <BrainCircuit className="w-5 h-5" />
               <span>{t.aiAnalysis}</span>
             </div>
             <button onClick={() => setAiAnalysis(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
               <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
             </button>
           </div>
           <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic overflow-y-auto no-scrollbar">
             "{aiAnalysis}"
           </p>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 pb-4 mt-auto">
        <div className="grid grid-cols-2 gap-2.5">
          <button className="relative overflow-hidden flex items-center justify-center gap-1.5 py-2 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all active:scale-95">
            <span className="relative z-10 flex items-center gap-1">
              {t.buyYes} <TrendingUp className="w-3 h-3" />
            </span>
          </button>
          
          <button className="relative overflow-hidden flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold text-xs hover:bg-red-100 dark:hover:bg-red-900/40 hover:border-red-300 dark:hover:border-red-700 transition-all active:scale-95">
            <span className="relative z-10 flex items-center gap-1">
              {t.buyNo} <TrendingDown className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>

      {/* AI Button (Floating) */}
      <button 
        onClick={handleAiAnalyze}
        disabled={isAnalyzing}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-800 transition-all opacity-0 group-hover:opacity-100 z-10"
        title={t.askAi}
      >
        <BrainCircuit className={`w-4 h-4 ${isAnalyzing ? 'animate-pulse text-purple-500' : ''}`} />
      </button>

      {/* RICH HOVER CARD TOOLTIP */}
      {showTooltip && createPortal(
        <div 
            className="fixed z-[9999] w-80 p-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700 overflow-hidden pointer-events-none animate-in fade-in zoom-in-95 duration-200"
            style={{ 
                top: tooltipPos.y + 20,
                left: Math.min(tooltipPos.x, window.innerWidth - 340), 
            }}
        >
             {/* Color bar based on sentiment/percentage */}
            <div className={`h-1.5 w-full ${market.percentage >= 50 ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>

            <div className="p-4 flex flex-col gap-3">
                {/* Header Info */}
                <div className="flex items-center justify-between">
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryStyle(market.category, false)}`}>
                        {categoryLabel}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {market.endDate}
                    </span>
                </div>

                {/* Full Title */}
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                    {market.title}
                </h4>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{t.chance}</div>
                        <div className="flex items-center gap-2">
                            <span className={`text-lg font-black ${market.percentage >= 50 ? 'text-emerald-500' : 'text-orange-500'}`}>
                                {market.percentage}%
                            </span>
                            {/* Mini Progress Bar */}
                            <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full ${market.percentage >= 50 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{width: `${market.percentage}%`}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{t.vol}</div>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <BarChart3 className="w-4 h-4 text-slate-400" />
                            <span className="text-lg font-black font-mono">{market.volume}</span>
                        </div>
                    </div>
                </div>
                
                {/* Footer Social Stats */}
                <div className="flex items-center gap-4 pt-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        <span>{market.traders?.length || 0} {t.participants}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3" />
                        <span>{market.commentCount || 0} {t.comments}</span>
                    </div>
                    {market.change24h && (
                        <div className={`ml-auto flex items-center gap-0.5 ${market.change24h > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {market.change24h > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(market.change24h)}%
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default MarketCard;