import React from 'react';
import { Search, Droplets, Plus, Wallet, Menu, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 md:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Desktop Search */}
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic text-lg shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
              Y
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-slate-800">
              YC<span className="text-blue-600">365</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center bg-slate-50 hover:bg-slate-100 rounded-full px-4 py-2.5 w-full max-w-sm transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:shadow-sm border border-slate-200/50 focus-within:border-blue-200">
            <Search className="w-4 h-4 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search markets..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Faucet - Subtle Glass Style */}
          <button className="hidden xl:flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
            <Droplets className="w-4 h-4" />
            <span>Faucet</span>
          </button>

          {/* Balance - Premium Pill Style (Lighter Theme) */}
          <div className="hidden md:flex items-center p-1 pl-1.5 pr-4 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 shadow-sm mr-3 group-hover:scale-105 transition-transform ring-1 ring-blue-100">
               <Wallet className="w-4 h-4" />
            </div>
            <div className="flex flex-col justify-center h-full">
               <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-0.5 tracking-wider">Total Balance</span>
               <span className="text-sm font-bold text-slate-800 font-mono leading-none tracking-tight">$2,450.00</span>
            </div>
          </div>

          {/* Deposit - Vibrant Gradient Action */}
          <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none">
            <Plus className="w-4 h-4" strokeWidth={3} />
            <span>Deposit</span>
          </button>

          {/* Notifications */}
           <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors relative group text-slate-500 hover:text-slate-800">
             <Bell className="w-5 h-5" />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
           </button>

          {/* Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 ml-1">
             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 p-0.5 cursor-pointer ring-2 ring-transparent hover:ring-blue-200 transition-all">
                <img 
                    src="https://picsum.photos/id/64/100/100" 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover" 
                />
             </div>
          </div>
          
          {/* Mobile Menu */}
          <button className="lg:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Search & Balance Row */}
      <div className="lg:hidden px-4 pb-3 space-y-3 border-t border-slate-100 bg-white/50">
         <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2.5 mt-3 w-full">
            <Search className="w-4 h-4 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search markets..." 
              className="bg-transparent border-none outline-none text-sm w-full font-medium"
            />
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 ring-1 ring-blue-100">
                    <Wallet className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-500">Total Balance</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">$ 2,450.00</span>
                </div>
             </div>
             <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-blue-200">
                Deposit
             </button>
          </div>
      </div>
    </header>
  );
};

export default Header;