import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Map, 
  SlidersHorizontal, 
  RotateCcw, 
  X, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  Bed, 
  Home, 
  Check, 
  ArrowUpDown 
} from 'lucide-react';
import { CurrencyType, FilterState, Property, UnitType } from '../types';
import { PropertyCard } from './PropertyCard';
import { InteractiveNJMap } from './InteractiveNJMap';
import { formatPrice, formatArea } from '../utils/formatters';

interface PropertyListProps {
  properties: Property[];
  allPropertiesCount: number;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  currency: CurrencyType;
  unit: UnitType;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  allPropertiesCount,
  filters,
  onFilterChange,
  onResetFilters,
  currency,
  unit,
  favorites,
  onToggleFavorite,
  onSelectProperty
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Check if any non-default filters are active
  const hasActiveFilters = 
    filters.listingType !== 'all' ||
    filters.town !== 'all' ||
    filters.propertyType !== 'all' ||
    filters.beds > 0 ||
    filters.minSchoolRating > 0 ||
    filters.openHouseOnly ||
    filters.newConstructionOnly ||
    filters.searchQuery.trim() !== '' ||
    filters.maxPrice < 5000000;

  return (
    <div id="listings-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Controls Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Result Title & Count */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {filters.listingType === 'sale' 
                  ? '뉴저지 매매 매물' 
                  : filters.listingType === 'rent' 
                  ? '뉴저지 렌트 매물' 
                  : filters.listingType === 'commercial' 
                  ? '뉴저지 상업용 매물' 
                  : '뉴저지 전체 부동산 매물'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {properties.length}개 검색됨
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              버겐카운티 및 허드슨카운티의 실시간 MLS 등록 매물 리스트입니다.
            </p>
          </div>

          {/* Controls Right */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isFilterPanelOpen || hasActiveFilters
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>상세 필터</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="newest">최신 등록순</option>
                <option value="price_asc">가격 낮은순</option>
                <option value="price_desc">가격 높은순</option>
                <option value="school_desc">학군 점수 높은순</option>
                <option value="sqft_desc">면적 넓은순</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="그리드 뷰"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="리스트 뷰"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'map' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="지도 보기"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Expandable Filter Drawer */}
        {isFilterPanelOpen && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in">
            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>최대 희망 가격:</span>
                <span className="text-blue-600">
                  {filters.maxPrice >= 5000000 ? '제한 없음' : `$${(filters.maxPrice / 1000).toLocaleString()}K`}
                </span>
              </div>
              <input
                type="range"
                min={200000}
                max={5000000}
                step={100000}
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>$200K</span>
                <span>$1.5M</span>
                <span>$3M</span>
                <span>$5M+</span>
              </div>
            </div>

            {/* School Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                최소 학군 평가 (GreatSchools)
              </label>
              <select
                value={filters.minSchoolRating}
                onChange={(e) => onFilterChange({ minSchoolRating: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium"
              >
                <option value={0}>학군 점수 무관</option>
                <option value={7}>7점 이상 (우수 학군)</option>
                <option value={8}>8점 이상 (최상위 학군)</option>
                <option value={9}>9점 이상 (명문 학군: 포트리, 클로스터)</option>
                <option value={10}>10점 만점 (테너플라이, 릿지우드)</option>
              </select>
            </div>

            {/* Quick Checkboxes */}
            <div className="flex flex-col gap-2 justify-center">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.openHouseOnly}
                  onChange={(e) => onFilterChange({ openHouseOnly: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>오픈하우스(Open House) 예정 매물만</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.newConstructionOnly}
                  onChange={(e) => onFilterChange({ newConstructionOnly: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <Home className="w-3.5 h-3.5 text-indigo-600" />
                <span>최신 신축 주택 (New Construction)</span>
              </label>
            </div>

            {/* Reset Button in Panel */}
            <div className="flex items-end">
              <button
                onClick={onResetFilters}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>모든 필터 초기화</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">적용된 조건:</span>
            {filters.town !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                지역: {filters.town}
                <X className="w-3 h-3 cursor-pointer hover:text-blue-900" onClick={() => onFilterChange({ town: 'all' })} />
              </span>
            )}
            {filters.propertyType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                유형: {filters.propertyType}
                <X className="w-3 h-3 cursor-pointer hover:text-blue-900" onClick={() => onFilterChange({ propertyType: 'all' })} />
              </span>
            )}
            {filters.beds > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                {filters.beds}베드 이상
                <X className="w-3 h-3 cursor-pointer hover:text-blue-900" onClick={() => onFilterChange({ beds: 0 })} />
              </span>
            )}
            {filters.minSchoolRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                학군 {filters.minSchoolRating}점 이상
                <X className="w-3 h-3 cursor-pointer hover:text-emerald-900" onClick={() => onFilterChange({ minSchoolRating: 0 })} />
              </span>
            )}
            {filters.openHouseOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold">
                오픈하우스 포함
                <X className="w-3 h-3 cursor-pointer hover:text-amber-900" onClick={() => onFilterChange({ openHouseOnly: false })} />
              </span>
            )}
            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                검색어: "{filters.searchQuery}"
                <X className="w-3 h-3 cursor-pointer hover:text-slate-900" onClick={() => onFilterChange({ searchQuery: '' })} />
              </span>
            )}
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold ml-1 cursor-pointer"
            >
              전체 해제
            </button>
          </div>
        )}
      </div>

      {/* Map View Mode */}
      {viewMode === 'map' && (
        <InteractiveNJMap
          properties={properties}
          currency={currency}
          unit={unit}
          onSelectProperty={onSelectProperty}
        />
      )}

      {/* Grid or List View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              currency={currency}
              unit={unit}
              isFavorite={favorites.includes(prop.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-4">
          {properties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-4 cursor-pointer"
            >
              <div className="sm:w-64 h-48 sm:h-auto shrink-0 relative rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={prop.images[0]}
                  alt={prop.titleKo}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                  {prop.listingType === 'sale' ? '매매' : prop.listingType === 'rent' ? '렌트' : '상업용'}
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-600">{prop.town}</span>
                    <span>MLS# {prop.mlsNumber}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mt-1 hover:text-blue-600 transition-colors">
                    {prop.titleKo}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{prop.address}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {prop.descriptionKo}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xl font-extrabold text-slate-900">
                      {formatPrice(prop.price, currency, prop.listingType)}
                    </span>
                    <span className="text-xs text-slate-500 ml-2">
                      ({prop.beds}베드 • {prop.baths}배스 • {formatArea(prop.sqft, unit)})
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProperty(prop);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    상세보기 및 투어 신청
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty Fallback State */}
      {properties.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs my-8 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">검색 조건에 맞는 매물이 없습니다</h3>
          <p className="text-sm text-slate-500 mt-2">
            선택하신 지역, 가격대, 또는 학군 필터를 넓혀서 다시 검색해 보세요.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            모든 필터 초기화하기
          </button>
        </div>
      )}
    </div>
  );
};
