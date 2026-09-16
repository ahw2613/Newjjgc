import React, { useState } from 'react';
import { FilterState, ListingType } from '../types';

interface HeroSearchProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount?: number;
  onOpenCalculator?: () => void;
  onOpenSellModal?: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  setFilters,
  onOpenSellModal
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'sell'>('all');
  const [query, setQuery] = useState(filters.searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'sell') {
      if (onOpenSellModal) onOpenSellModal();
      return;
    }

    setFilters(prev => ({
      ...prev,
      listingType: activeTab === 'all' ? 'all' : (activeTab as ListingType),
      searchQuery: query
    }));

    const elem = document.getElementById('properties-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (tab: 'all' | 'sale' | 'rent' | 'sell') => {
    setActiveTab(tab);
    if (tab === 'sell') {
      if (onOpenSellModal) onOpenSellModal();
      return;
    }
    setFilters(prev => ({
      ...prev,
      listingType: tab === 'all' ? 'all' : (tab as ListingType)
    }));
  };

  const handleQuickLocation = (loc: string) => {
    setFilters(prev => ({
      ...prev,
      district: loc,
      searchQuery: ''
    }));
    const elem = document.getElementById('properties-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white overflow-hidden px-6">
      {/* Full-bleed high resolution architectural visual (Sotheby's / Compass style) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="The Address Luxury Residence"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-[10000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
      </div>

      {/* Hero Content - Restrained typography and deliberate white space */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center pt-20 pb-12">
        <p className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase opacity-80 mb-4">
          THE ADDRESS
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-10 leading-[1.1]">
          Find Your Place.
        </h1>

        {/* Search Architecture (Zillow + Compass style) */}
        <div className="w-full max-w-2xl">
          {/* Tab Selector */}
          <div className="flex items-center justify-center space-x-8 mb-4 text-[13px] font-medium tracking-[0.2em] uppercase">
            <button
              type="button"
              onClick={() => handleTabClick('all')}
              className={`pb-1 transition-all ${
                activeTab === 'all'
                  ? 'text-white border-b border-white'
                  : 'text-white/60 hover:text-white border-b border-transparent'
              }`}
            >
              ALL
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('sale')}
              className={`pb-1 transition-all ${
                activeTab === 'sale'
                  ? 'text-white border-b border-white'
                  : 'text-white/60 hover:text-white border-b border-transparent'
              }`}
            >
              BUY
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('rent')}
              className={`pb-1 transition-all ${
                activeTab === 'rent'
                  ? 'text-white border-b border-white'
                  : 'text-white/60 hover:text-white border-b border-transparent'
              }`}
            >
              RENT
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('sell')}
              className={`pb-1 transition-all ${
                activeTab === 'sell'
                  ? 'text-white border-b border-white'
                  : 'text-white/60 hover:text-white border-b border-transparent'
              }`}
            >
              SELL
            </button>
          </div>

          {/* Search Box - Crisp, clean, uncluttered */}
          <form 
            onSubmit={handleSearch}
            className="w-full bg-white rounded-none sm:rounded-sm shadow-2xl flex flex-col sm:flex-row items-stretch overflow-hidden text-[#111111]"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by location, property or address..."
              className="flex-1 px-6 py-4 sm:py-5 text-sm sm:text-base font-normal bg-transparent focus:outline-none placeholder-neutral-400"
            />
            <button
              type="submit"
              className="bg-[#111111] hover:bg-neutral-800 text-white px-8 py-4 sm:py-5 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase transition-colors"
            >
              SEARCH
            </button>
          </form>

          {/* Subtle Location Quicklinks */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/70 font-light tracking-wide">
            <span className="text-white/40 uppercase tracking-widest text-[11px]">Popular:</span>
            <button onClick={() => handleQuickLocation('용산/한남')} className="hover:text-white hover:underline underline-offset-4 transition">한남</button>
            <button onClick={() => handleQuickLocation('강남/청담')} className="hover:text-white hover:underline underline-offset-4 transition">청담</button>
            <button onClick={() => handleQuickLocation('성동/성수')} className="hover:text-white hover:underline underline-offset-4 transition">성수</button>
            <button onClick={() => handleQuickLocation('서초/반포')} className="hover:text-white hover:underline underline-offset-4 transition">반포</button>
            <button onClick={() => handleQuickLocation('송파/잠실')} className="hover:text-white hover:underline underline-offset-4 transition">잠실</button>
            <button onClick={() => handleQuickLocation('광주/봉선')} className="hover:text-white hover:underline underline-offset-4 transition">광주 봉선</button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition cursor-pointer"
        onClick={() => {
          const elem = document.getElementById('properties-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-light mb-1">EXPLORE</span>
        <div className="w-[1px] h-6 bg-white/40" />
      </div>
    </section>
  );
};
