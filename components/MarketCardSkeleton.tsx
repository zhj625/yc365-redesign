import React from 'react';

const MarketCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 h-full flex flex-col gap-3 animate-pulse">
      {/* Top Row */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-11 h-11 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0"></div>
        
        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
          <div className="flex gap-2 mt-1">
            <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded"></div>
            <div className="h-5 w-20 bg-slate-100 dark:bg-slate-800 rounded"></div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-[54px] h-[54px] rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 shrink-0"></div>
      </div>

      {/* Buttons */}
      <div className="mt-auto pt-2 grid grid-cols-2 gap-2.5">
        <div className="h-9 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-9 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MarketCardSkeleton;