import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import MarketCard from './components/MarketCard';
import Footer from './components/Footer';
import { MARKETS_DATA, TRANSLATIONS } from './constants';
import { Plus } from 'lucide-react';
import { Language } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [lang, setLang] = useState<Language>('en');

  const markets = MARKETS_DATA[lang];
  const t = TRANSLATIONS[lang];

  // Simple filtering logic for demonstration
  const filteredMarkets = markets.filter(market => {
    if (activeCategory === 'all') return true;
    return market.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 dark:text-slate-100 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300 relative">
      <Header lang={lang} setLang={setLang} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Hero lang={lang} />
        
        <div className="mt-8">
          <FilterBar 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            lang={lang}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} lang={lang} />
            ))}
          </div>

          {filteredMarkets.length === 0 && (
             <div className="py-20 text-center text-slate-400 dark:text-slate-600">
               <p>{t.common.noMarkets}</p>
             </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Floating Action Button (FAB) - Refined Color Scheme */}
      <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
        <button className="group relative flex items-center gap-3 pl-2 pr-6 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.2)] transition-all duration-300 hover:-translate-y-1.5 active:scale-95">
            
            {/* Icon Container - Brand Blue Gradient */}
            <div className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 ease-out">
               <Plus className="w-6 h-6" strokeWidth={3} />
            </div>

            {/* Text Container */}
            <div className="flex flex-col items-start gap-0.5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{t.fab.new}</span>
                <span className="text-base font-black tracking-wide text-slate-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-300 transition-all">{t.fab.create}</span>
            </div>
            
            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/0 to-white/20 dark:to-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
};

export default App;