import React, { useState } from 'react';
import { 
  Property, 
  FilterState, 
  UnitType, 
  CurrencyType, 
  ListingType, 
  PropertyType 
} from '../types';
import { PropertyCard } from './PropertyCard';
import { InteractiveMap } from './InteractiveMap';
import { 
  SlidersHorizontal, 
  Map, 
  LayoutGrid, 
  RotateCcw, 
  Check, 
  ChevronDown, 
  Filter,
  Sparkles
} from 'lucide-react';

interface PropertyListProps {
  properties: Property[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  unit: UnitType;
  currency: CurrencyType;
  onResetFilters: () => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  filters,
  setFilters,
  selectedProperty,
  onSelectProperty,
  favorites,
  onToggleFavorite,
  unit,
  currency,
  onResetFilters
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const districts = [
    { id: 'all', label: '전체 권역' },
    { id: '용산/한남', label: '용산 · 한남' },
    { id: '강남/청담', label: '강남 · 청담 · 압구정' },
    { id: '성동/성수', label: '성동 · 성수 (서울숲)' },
    { id: '서초/반포', label: '서초 · 반포 한강' },
    { id: '송파/잠실', label: '송파 · 잠실 (롯데타워)' },
    { id: '여의도/마포', label: '여의도 · 마포' },
    { id: '광주/봉선', label: '광주 · 봉선 명문학군' },
  ];

  const listingTypes: { id: 'all' | ListingType; label: string }[] = [
    { id: 'all', label: '전체' },
    { id: 'sale', label: '매매' },
    { id: 'jeonse', label: '전세' },
    { id: 'rent', label: '월세' },
    { id: 'commercial', label: '빌딩·상업용' },
  ];

  const propertyTypes: { id: 'all' | PropertyType; label: string }[] = [
    { id: 'all', label: '모든 유형' },
    { id: 'apartment', label: '아파트' },
    { id: 'luxury_villa', label: '고급빌라·펜트' },
    { id: 'officetel', label: '오피스텔·주상복합' },
    { id: 'house', label: '단독주택·타운' },
    { id: 'commercial', label: '빌딩·사옥' },
  ];

  return (
    <section id="properties-section" className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Subtitle */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Verified High-End Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              실시간 프리미엄 매물 컬렉션
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              철저한 권리분석과 실사를 마친 정직하고 투명한 전속 중개 매물입니다.
            </p>
          </div>

          {/* View Toggle (Split Map vs Grid) */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 shadow-sm">
              <button
                id="btn-view-split"
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'split'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">지도 분할뷰</span>
                <span className="sm:hidden">지도</span>
              </button>
              <button
                id="btn-view-grid"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>그리드뷰</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 space-y-4">
          {/* Row 1: District Chips & Listing Type */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Districts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {districts.map(d => (
                <button
                  key={d.id}
                  id={`filter-district-${d.id.replace(/\//g, '-')}`}
                  onClick={() => setFilters(prev => ({ ...prev, district: d.id }))}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition ${
                    filters.district === d.id
                      ? 'bg-slate-900 text-amber-300 font-bold shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            <button
              id="btn-reset-filters"
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-medium py-1 px-2 rounded-lg hover:bg-slate-100 transition whitespace-nowrap ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>필터 초기화</span>
            </button>
          </div>

          {/* Row 2: Secondary Dropdowns & Quick Toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 pt-2 border-t border-slate-100">
            {/* Listing Type Select */}
            <div>
              <label className="block text-[10px] text-slate-400 font-medium mb-1">거래 형태</label>
              <select
                id="select-listing-type"
                value={filters.listingType}
                onChange={(e) => setFilters(prev => ({ ...prev, listingType: e.target.value as any }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500 transition"
              >
                {listingTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Property Type Select */}
            <div>
              <label className="block text-[10px] text-slate-400 font-medium mb-1">매물 유형</label>
              <select
                id="select-property-type"
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as any }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500 transition"
              >
                {propertyTypes.map(pt => (
                  <option key={pt.id} value={pt.id}>{pt.label}</option>
                ))}
              </select>
            </div>

            {/* Rooms Select */}
            <div>
              <label className="block text-[10px] text-slate-400 font-medium mb-1">방 개수</label>
              <select
                id="select-rooms"
                value={filters.rooms}
                onChange={(e) => setFilters(prev => ({ ...prev, rooms: Number(e.target.value) }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500 transition"
              >
                <option value={0}>방 개수 전체</option>
                <option value={3}>3룸 이상</option>
                <option value={4}>4룸 이상</option>
                <option value={5}>5룸 이상 (대형)</option>
              </select>
            </div>

            {/* Min Pyeong Select */}
            <div>
              <label className="block text-[10px] text-slate-400 font-medium mb-1">최소 전용면적</label>
              <select
                id="select-min-pyeong"
                value={filters.minPyeong}
                onChange={(e) => setFilters(prev => ({ ...prev, minPyeong: Number(e.target.value) }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500 transition"
              >
                <option value={0}>면적 무관</option>
                <option value={30}>30평 이상 (99㎡+)</option>
                <option value={40}>40평 이상 (132㎡+)</option>
                <option value={50}>50평 이상 (165㎡+)</option>
                <option value={70}>70평 이상 펜트하우스</option>
              </select>
            </div>

            {/* Sort Select */}
            <div>
              <label className="block text-[10px] text-slate-400 font-medium mb-1">정렬 기준</label>
              <select
                id="select-sort-by"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-500 transition"
              >
                <option value="newest">최신 등록순</option>
                <option value="price_desc">가격 높은순</option>
                <option value="price_asc">가격 낮은순</option>
                <option value="pyeong_desc">전용면적 넓은순</option>
                <option value="floor_desc">고층 우선</option>
              </select>
            </div>

            {/* Toggle VIP / Subway Checkboxes */}
            <div className="flex flex-col justify-end gap-1.5 pb-1">
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.subwayWithin10Min}
                  onChange={(e) => setFilters(prev => ({ ...prev, subwayWithin10Min: e.target.checked }))}
                  className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                />
                <span>역세권 10분내</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.vipOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, vipOnly: e.target.checked }))}
                  className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                />
                <span className="font-semibold text-amber-700">VIP 전속만</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Query Status */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <p>
            총 <strong className="text-slate-900 font-bold text-sm">{properties.length}개</strong>의 
            하이엔드 매물이 검색되었습니다.
          </p>
          {filters.searchQuery && (
            <p className="text-amber-700 font-medium">
              &quot;{filters.searchQuery}&quot; 검색 결과
            </p>
          )}
        </div>

        {/* No Results Fallback */}
        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">일치하는 매물이 없습니다</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              설정하신 필터 조건에 부합하는 매물이 현재 등록되어 있지 않습니다. 
              필터를 초기화하거나 1:1 VIP 전속 매칭 서비스를 통해 비공개 오프마켓 매물을 의뢰해보세요.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-semibold"
            >
              필터 전체 초기화
            </button>
          </div>
        ) : viewMode === 'split' ? (
          /* Split View: Left Map (Fixed/Sticky) + Right Scrollable Properties */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Interactive Map Column */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 h-[460px] lg:h-[calc(100vh-140px)]">
              <InteractiveMap
                properties={properties}
                selectedProperty={selectedProperty}
                onSelectProperty={onSelectProperty}
                hoveredPropertyId={hoveredPropertyId}
                unit={unit}
                currency={currency}
              />
            </div>

            {/* Right Property Cards Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {properties.map(property => (
                  <div
                    key={property.id}
                    onMouseEnter={() => setHoveredPropertyId(property.id)}
                    onMouseLeave={() => setHoveredPropertyId(null)}
                  >
                    <PropertyCard
                      property={property}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={onToggleFavorite}
                      onSelectProperty={onSelectProperty}
                      unit={unit}
                      currency={currency}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Grid View: Full 3-Column Responsive Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
                unit={unit}
                currency={currency}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
