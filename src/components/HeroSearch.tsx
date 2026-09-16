import React, { useState } from 'react';
import { FilterState, ListingType } from '../types';

interface HeroSearchProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount?: number;
  onOpenCalculator?: () => void;
  onOpenSellModal?: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ filters, setFilters, onOpenSellModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'sell'>('all');
  const [query, setQuery] = useState(filters.searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'sell') {
      onOpenSellModal?.();
      return;
    }
    setFilters(prev => ({ ...prev, listingType: activeTab === 'all' ? 'all' : (activeTab as ListingType), searchQuery: query }));
    document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabClick = (tab: 'all' | 'sale' | 'rent' | 'sell') => {
    setActiveTab(tab);
    if (tab === 'sell') {
      onOpenSellModal?.();
      return;
    }
    setFilters(prev => ({ ...prev, listingType: tab === 'all' ? 'all' : (tab as ListingType) }));
  };

  const handleQuickLocation = (loc: string) => {
    setFilters(prev => ({ ...prev, district: loc, searchQuery: '' }));
    document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#252525] text-white lg:min-h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=2400&q=88"
          alt="New Jersey residential property"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-black/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-36 lg:px-10 lg:pb-24">
        <div className="max-w-5xl">
          <p className="mb-4 text-[10px] font-medium tracking-[0.28em] text-white/80">NEW JERSEY REAL ESTATE</p>
          <h1 className="max-w-4xl text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-6xl lg:text-[76px]">
            Find your place<br className="hidden sm:block" /> in New Jersey.
          </h1>

          <div className="mt-10 max-w-[900px]">
            <div className="mb-3 flex gap-7 text-[11px] font-medium tracking-[0.18em]">
              {[
                ['all', 'ALL'], ['sale', 'BUY'], ['rent', 'RENT'], ['sell', 'SELL']
              ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => handleTabClick(value as typeof activeTab)} className={`border-b pb-2 transition ${activeTab === value ? 'border-white text-white' : 'border-transparent text-white/60 hover:text-white'}`}>
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="flex max-w-[760px] flex-col bg-white text-[#171717] sm:flex-row">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="City, neighborhood, address or property"
                className="min-h-[58px] flex-1 bg-transparent px-5 text-[15px] outline-none placeholder:text-black/38 sm:px-6"
              />
              <button type="submit" className="min-h-[58px] bg-[#171717] px-8 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-black">
                SEARCH
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/72">
              <span className="text-white/45">EXPLORE</span>
              <button onClick={() => handleQuickLocation('Bergen County')}>Bergen County</button>
              <button onClick={() => handleQuickLocation('Fort Lee')}>Fort Lee</button>
              <button onClick={() => handleQuickLocation('Edgewater')}>Edgewater</button>
              <button onClick={() => handleQuickLocation('Tenafly')}>Tenafly</button>
              <button onClick={() => handleQuickLocation('Englewood Cliffs')}>Englewood Cliffs</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
