import React, { useState } from 'react';
import { Market } from '../types';
import { TrendingUp, TrendingDown, BrainCircuit, X } from 'lucide-react';
import { analyzeMarket } from '../services/geminiService';

interface MarketCardProps {
  market: Market;
}

const DonutChart: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on percentage
  const colorClass = percentage >= 50 ? 'text-emerald-500' : 'text-orange-500';

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-sm font-bold ${colorClass}`}>{percentage}%</span>
        <span className="text-[8px] uppercase text-slate-400 font-medium leading-none mt-0.5">chance</span>
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
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Section: Image + Title + Chart */}
      <div className="p-5 flex gap-4">
        <img 
          src={market.iconUrl} 
          alt={market.title}
          className="w-14 h-14 rounded-xl object-cover shadow-sm shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-800 font-bold leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors">
            {market.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
             <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{market.volume} Vol.</span>
             <span>•</span>
             <span>Ends {market.endDate}</span>
          </div>
        </div>

        <div className="shrink-0">
          <DonutChart percentage={market.percentage} />
        </div>
      </div>

      {/* AI Analysis Overlay */}
      {aiAnalysis && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm p-6 flex flex-col items-start animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="flex items-center justify-between w-full mb-3">
             <div className="flex items-center gap-2 text-purple-600 font-bold">
               <BrainCircuit className="w-5 h-5" />
               <span>Gemini Analysis</span>
             </div>
             <button onClick={() => setAiAnalysis(null)} className="p-1 hover:bg-slate-100 rounded-full">
               <X className="w-4 h-4 text-slate-500" />
             </button>
           </div>
           <p className="text-sm text-slate-700 leading-relaxed italic">
             "{aiAnalysis}"
           </p>
        </div>
      )}

      {/* Actions */}
      <div className="px-5 pb-5 mt-auto">
        <div className="grid grid-cols-2 gap-3">
          <button className="relative overflow-hidden flex items-center justify-center gap-2 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 hover:border-emerald-300 transition-all active:scale-95">
            <span className="relative z-10 flex items-center gap-1">
              Buy Yes <TrendingUp className="w-3 h-3" />
            </span>
          </button>
          
          <button className="relative overflow-hidden flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 font-bold text-sm hover:bg-red-100 hover:border-red-300 transition-all active:scale-95">
            <span className="relative z-10 flex items-center gap-1">
              Buy No <TrendingDown className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>

      {/* AI Button (Floating or Integrated) */}
      <button 
        onClick={handleAiAnalyze}
        disabled={isAnalyzing}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 hover:bg-purple-50 text-slate-300 hover:text-purple-500 transition-colors opacity-0 group-hover:opacity-100"
        title="Ask AI"
      >
        <BrainCircuit className={`w-4 h-4 ${isAnalyzing ? 'animate-pulse text-purple-500' : ''}`} />
      </button>

    </div>
  );
};

export default MarketCard;