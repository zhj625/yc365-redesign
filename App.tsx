import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import MarketCard from './components/MarketCard';
import Footer from './components/Footer';
import { MARKETS } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');

  // Simple filtering logic for demonstration
  const filteredMarkets = MARKETS.filter(market => {
    if (activeCategory === 'all') return true;
    return market.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 dark:text-slate-100 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Hero />
        
        <div className="mt-8">
          <FilterBar 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>

          {filteredMarkets.length === 0 && (
             <div className="py-20 text-center text-slate-400 dark:text-slate-600">
               <p>No markets found in this category.</p>
             </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;