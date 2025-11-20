import React, { useState } from 'react';
import { Market } from '../types';
import { TrendingUp, TrendingDown, BrainCircuit, X } from 'lucide-react';
import { analyzeMarket } from '../services/geminiService';

interface MarketCardProps {
  market: Market;
}

const DonutChart: React.FC<{ percentage: number }> = ({ percentage }) => {
  const size = 54; // Reduced size to be more coordinated
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on percentage
  const colorClass = percentage >= 50 ? 'text-emerald-500' : 'text-orange-500';

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
          className="text-slate-100"
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
        <span className="text-[9px] text-slate-400 font-medium leading-none mt-0.5">chance</span>
      </div>
    </div>
  );
};

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const handleAiAnalyze = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (aiAnalysis) {
      setAiAnalysis(null); // Toggle off
      return;
    }

    setIsAnalyzing(true);
    const result = await analyzeMarket(market.title);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full">
      
      {/* Top Section: Image + Title + Chart */}
      <div className="p-4 flex items-start gap-3 grow">
        <img 
          src={market.iconUrl} 
          alt={market.title}
          className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0 border border-slate-100 mt-0.5"
        />
        
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          {/* Title - Truncated with ellipsis */}
          <h3 className="text-slate-800 font-bold leading-snug group-hover:text-blue-700 transition-colors text-[15px] line-clamp-2 overflow-hidden text-ellipsis" title={market.title}>
            {market.title}
          </h3>
          
          {/* Metadata - Compact */}
          <div className="flex items-center flex-wrap gap-2 text-[11px] text-slate-400 font-medium mt-1">
             <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 whitespace-nowrap">
                {market.volume} Vol.
             </span>
             <span className="whitespace-nowrap">Ends {market.endDate}</span>
          </div>
        </div>

        <div className="shrink-0 pt-1">
          <DonutChart percentage={market.percentage} />
        </div>
      </div>

      {/* AI Analysis Overlay */}
      {aiAnalysis && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm p-6 flex flex-col items-start animate-in fade-in slide-in-from-bottom-4 duration-300 border-b border-purple-100">
           <div className="flex items-center justify-between w-full mb-3">
             <div className="flex items-center gap-2 text-purple-600 font-bold">
               <BrainCircuit className="w-5 h-5" />
               <span>Gemini Analysis</span>
             </div>
             <button onClick={() => setAiAnalysis(null)} className="p-1 hover:bg-slate-100 rounded-full">
               <X className="w-4 h-4 text-slate-500" />
             </button>
           </div>
           <p className="text-sm text-slate-700 leading-relaxed italic overflow-y-auto custom-scrollbar">
             "{aiAnalysis}"
           </p>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 pb-4 mt-auto">
        <div className="grid grid-cols-2 gap-2.5">
          <button className="relative overflow-hidden flex items-center justify-center gap-1.5 py-2 rounded-lg border border-emerald-200 bg-emerald-50/50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 hover:border-emerald-300 transition-all active:scale-95">
            <span className="relative z-10 flex items-center gap-1">
              Buy Yes <TrendingUp className="w-3 h-3" />
            </span>
          </button>
          
          <button className="relative overflow-hidden flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-200 bg-red-50/50 text-red-700 font-bold text-xs hover:bg-red-100 hover:border-red-300 transition-all active:scale-95">
            <span className="relative z-10 flex items-center gap-1">
              Buy No <TrendingDown className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>

      {/* AI Button (Floating) */}
      <button 
        onClick={handleAiAnalyze}
        disabled={isAnalyzing}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-purple-600 hover:border-purple-200 transition-all opacity-0 group-hover:opacity-100 z-10"
        title="Ask AI"
      >
        <BrainCircuit className={`w-4 h-4 ${isAnalyzing ? 'animate-pulse text-purple-500' : ''}`} />
      </button>

    </div>
  );
};

export default MarketCard;
