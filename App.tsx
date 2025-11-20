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

      {/* Floating Action Button (FAB) - Solid Gradient Style */}
      <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
        <button className="group relative flex items-center gap-3 pl-3 pr-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 ring-1 ring-white/20">
            
            {/* Icon Container */}
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
               <Plus className="w-5 h-5 text-white" strokeWidth={3} />
            </div>

            {/* Text Container */}
            <div className="flex flex-col items-start gap-0.5">
                <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest leading-none">{t.fab.new}</span>
                <span className="text-sm font-black tracking-wide text-white leading-none">{t.fab.create}</span>
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/0 to-white/10 pointer-events-none" />
        </button>
      </div>
    </div>
  );
};

export default App;