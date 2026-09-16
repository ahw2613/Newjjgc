import React, { useState } from 'react';
import { Search, MapPin, Building, ChevronDown, Sparkles, SlidersHorizontal } from 'lucide-react';
import { FilterState, ListingType } from '../types';

interface HeroSearchProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearchSubmit: () => void;
  onSelectTag: (keyword: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  setFilters,
  onSearchSubmit,
  onSelectTag
}) => {
  const [activeTab, setActiveTab] = useState<'all' | ListingType>('all');
  const [keyword, setKeyword] = useState(filters.searchQuery);

  const tabs: { id: 'all' | ListingType; label: string }[] = [
    { id: 'all', label: '전체 매물' },
    { id: 'sale', label: '매매' },
    { id: 'jeonse', label: '전세' },
    { id: 'rent', label: '월세' },
    { id: 'commercial', label: '상업용 · 빌딩' }
  ];

  const popularTags = [
    '나인원 한남',
    '아크로 서울포레스트',
    'PH129 청담',
    '래미안 원베일리',
    '압구정 현대 재건축',
    '테헤란로 신축빌딩',
    '광주 봉선동 펜트'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      listingType: activeTab,
      searchQuery: keyword
    }));
    onSearchSubmit();
  };

  const handleTabSelect = (tabId: 'all' | ListingType) => {
    setActiveTab(tabId);
    setFilters(prev => ({
      ...prev,
      listingType: tabId
    }));
  };

  return (
    <section id="hero-section" className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Media with Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Architecture"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform animate-pulse duration-10000"
        />
        {/* Multilayered Luxury Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Eyebrow / Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Prestige Living · Verified Value</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.2] mb-4">
          대한민국 하이엔드 주거와 <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
            프라이빗 자산관리의 기준
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light mb-10 leading-relaxed">
          한남·청담·성수·반포의 최상위 랜드마크 펜트하우스부터 테헤란로 상업용 사옥까지, 
          엄선된 검증 매물과 1:1 VIP 전속 공인중개 서비스를 제공합니다.
        </p>

        {/* Search Box Container */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-2xl shadow-black/50 text-left">
          {/* Tab Selector */}
          <div className="flex items-center gap-1 sm:gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800/80">
            {tabs.map(tab => (
              <button
                key={tab.id}
                id={`hero-tab-${tab.id}`}
                onClick={() => handleTabSelect(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Controls */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
            {/* Main Keyword Input */}
            <div className="md:col-span-6 relative">
              <label className="block text-[11px] font-medium text-slate-400 mb-1 ml-1">지역 / 단지명 / 매물명</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="hero-search-input"
                  type="text"
                  placeholder="예: 나인원한남, 성수, 청담, 압구정 현대..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                />
              </div>
            </div>

            {/* Region Select */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-medium text-slate-400 mb-1 ml-1">주요 권역 선택</label>
              <div className="relative">
                <select
                  id="hero-district-select"
                  value={filters.district}
                  onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition appearance-none cursor-pointer"
                >
                  <option value="all">권역 전체 (서울·수도권·광주)</option>
                  <option value="용산/한남">용산 / 한남동 권역</option>
                  <option value="강남/청담">강남 / 청담·압구정</option>
                  <option value="성동/성수">성동 / 성수동 서울숲</option>
                  <option value="서초/반포">서초 / 반포 한강변</option>
                  <option value="송파/잠실">송파 / 잠실 롯데월드타워</option>
                  <option value="여의도/마포">여의도 / 마포 한강</option>
                  <option value="광주/봉선">광주 / 봉선동 명문학군</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-3 pt-1 md:pt-4">
              <button
                id="btn-hero-submit"
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 px-5 rounded-xl shadow-lg shadow-amber-500/20 transition active:scale-95"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>매물 검색하기</span>
              </button>
            </div>
          </form>

          {/* Quick Tag Pills */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              인기 추천:
            </span>
            {popularTags.map(tag => (
              <button
                key={tag}
                id={`quick-tag-${tag.replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => {
                  setKeyword(tag);
                  onSelectTag(tag);
                }}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Real Estate Credibility Metrics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80 pt-8 text-slate-300">
          <div>
            <p className="text-2xl lg:text-3xl font-bold font-['Cinzel',serif] text-amber-400">1조 8,500억+</p>
            <p className="text-xs text-slate-400 mt-1">누적 하이엔드 중개 실적</p>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-bold font-['Cinzel',serif] text-amber-400">99.4%</p>
            <p className="text-xs text-slate-400 mt-1">VIP 고객 전속 재계약률</p>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-bold font-['Cinzel',serif] text-amber-400">20억원</p>
            <p className="text-xs text-slate-400 mt-1">공제증서 보증보험 가입</p>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-bold font-['Cinzel',serif] text-amber-400">1:1 Private</p>
            <p className="text-xs text-slate-400 mt-1">변호사·세무사 제휴 자산관리</p>
          </div>
        </div>
      </div>
    </section>
  );
};
