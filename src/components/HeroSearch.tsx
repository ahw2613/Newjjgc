import React, { useState } from 'react';
import { FilterState, ListingType } from '../types';

interface HeroSearchProps { filters: FilterState; setFilters: React.Dispatch<React.SetStateAction<FilterState>>; totalCount?: number; onOpenCalculator?: () => void; onOpenSellModal?: () => void; }

export const HeroSearch: React.FC<HeroSearchProps> = ({ filters, setFilters, onOpenSellModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'sell'>('sale');
  const [query, setQuery] = useState(filters.searchQuery);
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (activeTab === 'sell') { onOpenSellModal?.(); return; } setFilters(prev => ({ ...prev, listingType: activeTab === 'all' ? 'all' : (activeTab as ListingType), searchQuery: query })); document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' }); };
  const handleTabClick = (tab: 'all' | 'sale' | 'rent' | 'sell') => { setActiveTab(tab); if (tab === 'sell') { onOpenSellModal?.(); return; } setFilters(prev => ({ ...prev, listingType: tab === 'all' ? 'all' : (tab as ListingType) })); };
  const handleQuickLocation = (loc: string) => { setFilters(prev => ({ ...prev, district: loc, searchQuery: '' })); document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <section className="relative flex min-h-[680px] items-end overflow-hidden bg-[#333] text-white lg:min-h-[760px]">
      <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=2400&q=88" alt="New Jersey homes" className="h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-black/35" /><div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" /></div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-14 pt-36 lg:px-10 lg:pb-20">
        <div className="max-w-4xl">
          <p className="mb-4 text-[10px] font-medium tracking-[0.24em] text-white/80">NEW JERSEY · BERGEN COUNTY · HUDSON COUNTY</p>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-[-0.025em] sm:text-6xl lg:text-[68px]">New Jersey Real Estate<span className="block mt-3 text-[20px] font-normal tracking-[-0.01em] text-white/80 sm:text-[25px] lg:text-[28px]">뉴저지 부동산 · 매매 · 렌트 · 투자</span></h1>
          <p className="mt-5 max-w-2xl text-[13px] leading-6 text-white/78">Local market knowledge for buyers, sellers and renters across Northern New Jersey. 한국어와 영어로 상담해드립니다.</p>
          <div className="mt-8 max-w-[920px]">
            <div className="mb-3 flex gap-7 text-[11px] font-medium tracking-[0.16em]">{[['sale','BUY · 구매'],['rent','RENT · 렌트'],['sell','SELL · 매도'],['all','ALL · 전체']].map(([value,label]) => <button key={value} type="button" onClick={() => handleTabClick(value as typeof activeTab)} className={`border-b pb-2 transition ${activeTab === value ? 'border-white text-white' : 'border-transparent text-white/60 hover:text-white'}`}>{label}</button>)}</div>
            <form onSubmit={handleSearch} className="flex max-w-[820px] flex-col bg-white text-[#171717] shadow-[0_8px_30px_rgba(0,0,0,.18)] sm:flex-row"><input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by city, neighborhood, address or ZIP code / 도시, 지역, 주소, ZIP 코드" className="min-h-[62px] flex-1 bg-transparent px-5 text-[14px] outline-none placeholder:text-black/40 sm:px-6" /><button type="submit" className="min-h-[62px] bg-[#1b1b1b] px-9 text-[10px] font-semibold tracking-[0.18em] text-white hover:bg-black">SEARCH · 검색</button></form>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/78"><span className="text-white/45">POPULAR AREAS</span><button onClick={() => handleQuickLocation('Fort Lee')}>Fort Lee</button><button onClick={() => handleQuickLocation('Palisades Park')}>Palisades Park</button><button onClick={() => handleQuickLocation('Edgewater')}>Edgewater</button><button onClick={() => handleQuickLocation('Tenafly')}>Tenafly</button><button onClick={() => handleQuickLocation('Closter')}>Closter</button></div>
          </div>
        </div>
      </div>
    </section>
  );
};
