import React from 'react';
import { Search, MapPin, Home, DollarSign, Bed, Sparkles, Filter } from 'lucide-react';
import { FilterState, ListingType, PropertyType } from '../types';

interface HeroSearchProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onSearchSubmit: () => void;
  matchingCount: number;
  onSelectQuickTag: (tag: { town?: string; propertyType?: PropertyType; openHouse?: boolean; schoolMin?: number }) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  matchingCount,
  onSelectQuickTag
}) => {
  const towns = [
    { label: '전체 뉴저지 지역 (All Areas)', value: 'all' },
    { label: '포트리 (Fort Lee)', value: '포트리 (Fort Lee)' },
    { label: '팰리세이즈 파크 (Palisades Park)', value: '팰리세이즈 파크 (Palisades Park)' },
    { label: '테너플라이 (Tenafly)', value: '테너플라이 (Tenafly)' },
    { label: '클로스터 (Closter)', value: '클로스터 (Closter)' },
    { label: '크레스킬 (Cresskill)', value: '크레스킬 (Cresskill)' },
    { label: '에지워터 (Edgewater)', value: '에지워터 (Edgewater)' },
    { label: '릿지우드 (Ridgewood)', value: '릿지우드 (Ridgewood)' },
    { label: '잉글우드 클리프 (Englewood Cliffs)', value: '잉글우드 클리프 (Englewood Cliffs)' },
    { label: '저지시티 (Jersey City)', value: '저지시티 (Jersey City)' }
  ];

  const propertyTypes = [
    { label: '모든 주택 유형', value: 'all' },
    { label: '단독주택 (Single Family)', value: 'single_family' },
    { label: '콘도 / 타운하우스 (Condo)', value: 'condo_townhouse' },
    { label: '다가구 (2-Family / Multi)', value: 'multi_family' },
    { label: '상업용 / 오피스 (Commercial)', value: 'commercial' }
  ];

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-12 md:py-20">
      {/* Background with layered gradient and high-end architectural photo */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="New Jersey Real Estate"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/80 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>2026 뉴저지 최신 실시간 매물 & 학군 데이터베이스</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            뉴저지 내 집 마련부터 명문 학군까지,<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              한인 맞춤 부동산 원스톱 솔루션
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            포트리, 팰팍, 버겐카운티 전 지역 매매 · 렌트 · 상업용 매물 검색과 실시간 학군 및 NYC 통근 분석
          </p>
        </div>

        {/* Search Card Container */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-900 border border-slate-100 max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-3 mb-4 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: '전체 매물 (All)' },
                { id: 'sale', label: '매매 (Buy)' },
                { id: 'rent', label: '렌트 (Rent)' },
                { id: 'commercial', label: '상업용 (Commercial)' }
              ] as { id: 'all' | ListingType; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => onFilterChange({ listingType: tab.id })}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filters.listingType === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Town / Region */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                희망 지역 (Town)
              </label>
              <select
                value={filters.town}
                onChange={(e) => onFilterChange({ town: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
              >
                {towns.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-blue-600" />
                주택 유형 (Property Type)
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange({ propertyType: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
              >
                {propertyTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-blue-600" />
                최소 침실 수 (Beds)
              </label>
              <select
                value={filters.beds}
                onChange={(e) => onFilterChange({ beds: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
              >
                <option value={0}>침실 수 무관 (Any Beds)</option>
                <option value={1}>1베드 이상</option>
                <option value={2}>2베드 이상</option>
                <option value={3}>3베드 이상</option>
                <option value={4}>4베드 이상</option>
                <option value={5}>5베드 이상</option>
              </select>
            </div>

            {/* Keyword / Address search & Submit */}
            <div className="flex flex-col justify-end">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                키워드 / 도로명 검색
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="예: 리버뷰, 수영장, 신축..."
                  value={filters.searchQuery}
                  onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-8 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
                />
              </div>
            </div>
          </div>

          {/* Quick Search Action Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" />
                인기 태그:
              </span>
              <button
                type="button"
                onClick={() => onSelectQuickTag({ town: '포트리 (Fort Lee)' })}
                className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors cursor-pointer"
              >
                📍 포트리 (GWB 5분)
              </button>
              <button
                type="button"
                onClick={() => onSelectQuickTag({ town: '팰리세이즈 파크 (Palisades Park)' })}
                className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors cursor-pointer"
              >
                🏘️ 팰팍 브로드애비뉴
              </button>
              <button
                type="button"
                onClick={() => onSelectQuickTag({ town: '테너플라이 (Tenafly)', schoolMin: 9 })}
                className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-colors cursor-pointer"
              >
                🎓 테너플라이 10점 학군
              </button>
              <button
                type="button"
                onClick={() => onSelectQuickTag({ propertyType: 'multi_family' })}
                className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 transition-colors cursor-pointer"
              >
                💰 2-Family 임대수익형
              </button>
              <button
                type="button"
                onClick={() => onSelectQuickTag({ openHouse: true })}
                className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 transition-colors cursor-pointer"
              >
                📅 이번 주말 오픈하우스
              </button>
            </div>

            <button
              onClick={onSearchSubmit}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="btn-hero-search-submit"
            >
              <Search className="w-4 h-4" />
              <span>매물 검색하기 ({matchingCount}개 발견)</span>
            </button>
          </div>
        </div>

        {/* Highlight trust stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto text-center border-t border-slate-800/80 pt-6">
          <div>
            <p className="text-xl sm:text-2xl font-black text-white">100%</p>
            <p className="text-xs text-slate-400 mt-0.5">NJ MLS 실시간 검증 매물</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-blue-400">1:1 맞춤</p>
            <p className="text-xs text-slate-400 mt-0.5">한국어 전문 공인중개사 상담</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-emerald-400">학군 & 통근</p>
            <p className="text-xs text-slate-400 mt-0.5">학교 평가 & 맨해튼 교통 분석</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-amber-400">원스톱</p>
            <p className="text-xs text-slate-400 mt-0.5">변호사·모기지·인스펙션 연계</p>
          </div>
        </div>
      </div>
    </section>
  );
};
