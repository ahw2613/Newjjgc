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
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const districts = [
    { id: 'all', label: 'All Locations' },
    { id: '용산/한남', label: 'Hannam (한남)' },
    { id: '강남/청담', label: 'Cheongdam (청담)' },
    { id: '성동/성수', label: 'Seongsu (성수)' },
    { id: '서초/반포', label: 'Banpo (반포)' },
    { id: '송파/잠실', label: 'Jamsil (잠실)' },
    { id: '광주/봉선', label: 'Gwangju (광주 봉선)' },
  ];

  return (
    <section id="properties-section" className="py-20 lg:py-28 bg-white text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header (Compass / Sotheby's style - No badges, pure editorial typography) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-2">
              EXCLUSIVE COLLECTION
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#111111]">
              Featured Properties
            </h2>
          </div>

          {/* View Mode Toggle (Grid vs Split Map) */}
          <div className="flex items-center space-x-6 text-xs uppercase tracking-[0.15em] font-medium text-neutral-400">
            <button
              onClick={() => setViewMode('grid')}
              className={`pb-0.5 transition-colors ${
                viewMode === 'grid' ? 'text-[#111111] border-b border-[#111111]' : 'hover:text-[#111111]'
              }`}
            >
              GRID VIEW
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setViewMode('split')}
              className={`pb-0.5 transition-colors ${
                viewMode === 'split' ? 'text-[#111111] border-b border-[#111111]' : 'hover:text-[#111111]'
              }`}
            >
              MAP VIEW
            </button>
          </div>
        </div>

        {/* Minimalist Filter Bar (Zillow / Redfin style - clean lines, no clutter) */}
        <div className="mb-12 pb-6 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Location Links */}
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2 font-normal text-neutral-500">
            {districts.map(d => (
              <button
                key={d.id}
                onClick={() => setFilters(prev => ({ ...prev, district: d.id }))}
                className={`transition-colors whitespace-nowrap ${
                  filters.district === d.id 
                    ? 'text-[#111111] font-semibold underline underline-offset-8 decoration-1' 
                    : 'hover:text-[#111111]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Dropdown Filters (Listing Type & Sort) */}
          <div className="flex items-center space-x-6 ml-auto">
            {/* Listing type */}
            <select
              value={filters.listingType}
              onChange={(e) => setFilters(prev => ({ ...prev, listingType: e.target.value as any }))}
              className="bg-transparent text-neutral-700 font-medium cursor-pointer focus:outline-none py-1"
            >
              <option value="all">All Status</option>
              <option value="sale">For Sale (매매)</option>
              <option value="jeonse">For Lease (전세)</option>
              <option value="rent">For Rent (월세)</option>
              <option value="commercial">Commercial (빌딩)</option>
            </select>

            {/* Sort order */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent text-neutral-700 font-medium cursor-pointer focus:outline-none py-1"
            >
              <option value="newest">Latest Added</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="pyeong_desc">Area: Largest</option>
            </select>

            {(filters.district !== 'all' || filters.listingType !== 'all' || filters.searchQuery) && (
              <button
                onClick={onResetFilters}
                className="text-neutral-400 hover:text-[#111111] transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Results Counter if searched */}
        {filters.searchQuery && (
          <div className="mb-8 text-xs text-neutral-500 font-light">
            Showing results for &quot;{filters.searchQuery}&quot; ({properties.length} properties found)
          </div>
        )}

        {/* No Results Fallback */}
        {properties.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-xl font-light text-[#111111] mb-2">No matching properties found</h3>
            <p className="text-xs text-neutral-500 font-light max-w-md mx-auto mb-6">
              Please adjust your search criteria or reset filters to explore our complete collection.
            </p>
            <button
              onClick={onResetFilters}
              className="px-6 py-3 bg-[#111111] text-white text-xs font-medium tracking-widest uppercase hover:bg-neutral-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View - Sotheby's Editorial 3-Column Layout with generous spacing */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {properties.map(prop => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favorites.includes(prop.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
                unit={unit}
                currency={currency}
              />
            ))}
          </div>
        ) : (
          /* Split View - Redfin / Zillow Map Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Sticky Vector Map */}
            <div className="lg:col-span-6 lg:sticky lg:top-28 h-[500px] lg:h-[calc(100vh-160px)] bg-neutral-100 overflow-hidden">
              <InteractiveMap
                properties={properties}
                selectedProperty={selectedProperty}
                onSelectProperty={onSelectProperty}
                hoveredPropertyId={hoveredId}
                unit={unit}
                currency={currency}
              />
            </div>

            {/* Scrollable Properties (2 cols on right) */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
                {properties.map(prop => (
                  <div
                    key={prop.id}
                    onMouseEnter={() => setHoveredId(prop.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <PropertyCard
                      property={prop}
                      isFavorite={favorites.includes(prop.id)}
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
        )}
      </div>
    </section>
  );
};
