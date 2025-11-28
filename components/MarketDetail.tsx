import React, { useState } from 'react';
import { Market, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Star, 
  TrendingUp, 
  MessageSquare,
  Info,
  Wallet,
  TrendingDown
} from 'lucide-react';

interface MarketDetailProps {
  market: Market;
  lang: Language;
  onBack: () => void;
  onAddToast: (msg: string, type?: 'success' | 'error') => void;
}

const MarketDetail: React.FC<MarketDetailProps> = ({ market, lang, onBack, onAddToast }) => {
  const t = TRANSLATIONS[lang];
  const tDetail = t.detail || {
    back: "Back",
    outcome: "Outcome",
    price: "Price",
    buy: "Buy",
    sell: "Sell",
    amount: "Amount",
    shares: "Shares",
    potentialReturn: "Potential Return",
    placeOrder: "Place Order",
    rules: "Rules",
    rulesDesc: "Market rules will be displayed here.",
    comments: "Comments"
  };
  
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [outcome, setOutcome] = useState<'yes' | 'no'>('yes');
  const [amount, setAmount] = useState('');
  
  const priceYes = market.percentage / 100;
  const priceNo = (100 - market.percentage) / 100;
  const currentPrice = outcome === 'yes' ? priceYes : priceNo;
  const shares = amount ? (parseFloat(amount) / currentPrice).toFixed(2) : '0.00';
  const potentialReturn = amount ? (parseFloat(shares) * 1).toFixed(2) : '0.00';
  const returnPercentage = amount ? (((parseFloat(potentialReturn) - parseFloat(amount)) / parseFloat(amount)) * 100).toFixed(0) : '0';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Header Area */}
            <div className="flex flex-col gap-3 mb-2">
                 <button 
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 w-fit transition-colors mb-1"
                >
                    <ArrowLeft className="w-3 h-3" />
                    {tDetail.back}
                </button>

                <div className="flex gap-4 items-start">
                    <img 
                        src={market.iconUrl} 
                        alt={market.title} 
                        className="w-16 h-16 rounded-xl object-cover shadow-sm border border-slate-200 dark:border-slate-700 mt-1"
                    />
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                            {market.title}
                        </h1>
                         <div className="flex items-center flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{market.endDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Vol: <span className="text-slate-900 dark:text-slate-200 font-bold">$12.5K</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[300px] flex flex-col">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                   <span className="text-3xl font-black text-emerald-500">{market.percentage}%</span>
                   <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Probability</span>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                   {['1H', '1D', '1W', '1M', 'ALL'].map((period) => (
                      <button key={period} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${period === '1D' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                         {period}
                      </button>
                   ))}
                </div>
             </div>
             
             {/* Chart SVG */}
             <div className="flex-1 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                   <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                         <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                         <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                   </defs>
                   <path 
                     d="M0,250 C100,240 200,280 300,200 C400,120 500,180 600,100 C700,50 800,80 800,80" 
                     fill="url(#gradient)" 
                     stroke="none" 
                   />
                   <path 
                     d="M0,250 C100,240 200,280 300,200 C400,120 500,180 600,100 C700,50 800,80 800,80" 
                     fill="none" 
                     stroke="#10b981" 
                     strokeWidth="3" 
                     strokeLinecap="round"
                   />
                </svg>
                <div className="absolute right-0 top-[26%] w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg"></div>
             </div>
          </div>

          {/* Outcomes / Order Book */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white">{tDetail.outcome}</h3>
                <span className="text-xs font-bold text-slate-400 uppercase">{tDetail.price}</span>
             </div>
             <div className="p-4 space-y-3">
                <div 
                   onClick={() => { setOutcome('yes'); setTradeType('buy'); }}
                   className={`group relative p-3 rounded-xl border-2 transition-all cursor-pointer ${outcome === 'yes' ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800'}`}
                >
                   <div className="absolute top-0 left-0 bottom-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-l-lg transition-all" style={{ width: `${market.percentage}%` }}></div>
                   <div className="relative flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">YES</div>
                         <span className="font-bold text-slate-700 dark:text-slate-200">Yes</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{market.percentage}%</span>
                         <span className="text-xs text-slate-400">{priceYes.toFixed(2)}¢</span>
                      </div>
                   </div>
                </div>

                <div 
                   onClick={() => { setOutcome('no'); setTradeType('buy'); }}
                   className={`group relative p-3 rounded-xl border-2 transition-all cursor-pointer ${outcome === 'no' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:border-orange-200 dark:hover:border-orange-800'}`}
                >
                   <div className="absolute top-0 left-0 bottom-0 bg-orange-100 dark:bg-orange-900/20 rounded-l-lg transition-all" style={{ width: `${100 - market.percentage}%` }}></div>
                   <div className="relative flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">NO</div>
                         <span className="font-bold text-slate-700 dark:text-slate-200">No</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{100 - market.percentage}%</span>
                         <span className="text-xs text-slate-400">{priceNo.toFixed(2)}¢</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Rules & Comments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                   <Info className="w-4 h-4 text-blue-500" /> {tDetail.rules}
                </h3>
                <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                   {market.rules || tDetail.rulesDesc}
                </div>
             </div>

             <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                   <MessageSquare className="w-4 h-4 text-purple-500" /> {tDetail.comments} ({market.commentCount})
                </h3>
                <div className="flex-1 space-y-4 mb-4">
                   <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-600 dark:text-slate-300">
                         This is going to be close! But I think Yes has the edge.
                      </div>
                   </div>
                </div>
                <div className="mt-auto">
                   <input 
                     type="text" 
                     placeholder="Add a comment..." 
                     className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Trading Panel */}
        <div className="lg:col-span-4">
           <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden">
                 <div className="flex border-b border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={() => setTradeType('buy')}
                      className={`flex-1 py-4 text-sm font-bold transition-colors ${tradeType === 'buy' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                    >
                       {tDetail.buy}
                    </button>
                    <button 
                      onClick={() => setTradeType('sell')}
                      className={`flex-1 py-4 text-sm font-bold transition-colors ${tradeType === 'sell' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                    >
                       {tDetail.sell}
                    </button>
                 </div>

                 <div className="p-6 space-y-6">
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                       <button 
                         onClick={() => setOutcome('yes')}
                         className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${outcome === 'yes' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-500'}`}
                       >
                          Yes {priceYes.toFixed(2)}
                       </button>
                       <button 
                         onClick={() => setOutcome('no')}
                         className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${outcome === 'no' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'}`}
                       >
                          No {priceNo.toFixed(2)}
                       </button>
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                          <span>{tDetail.amount}</span>
                          <span className="flex items-center gap-1"><Wallet className="w-3 h-3" /> $2,450.00</span>
                       </div>
                       <div className="relative">
                          <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-4 pr-16 text-2xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs font-bold text-slate-500 dark:text-slate-300 shadow-sm">
                             USDC
                          </div>
                       </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3 border border-slate-100 dark:border-slate-800">
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">{tDetail.price}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{currentPrice.toFixed(2)} USDC</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">{tDetail.shares}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{shares}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">{tDetail.potentialReturn}</span>
                          <span className="font-bold text-emerald-500 flex items-center gap-1">
                             <TrendingUp className="w-3 h-3" />
                             ${potentialReturn} ({returnPercentage}%)
                          </span>
                       </div>
                    </div>
                    
                    <button 
                       onClick={() => onAddToast("Order Placed Successfully!", "success")}
                       className={`w-full py-4 rounded-xl font-black text-lg text-white shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 ${
                          outcome === 'yes' 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/20' 
                            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-orange-500/20'
                       }`}
                    >
                       {tDetail.placeOrder} {outcome.toUpperCase()}
                    </button>
                    
                    <p className="text-center text-[10px] text-slate-400">
                       By trading, you agree to the Terms of Use.
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MarketDetail;