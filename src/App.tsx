import React, { useState, useMemo, useEffect } from 'react';
import { CurrencyType, FilterState, Property, UnitType } from './types';
import { PROPERTIES_DATA } from './data/propertiesData';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { PropertyList } from './components/PropertyList';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { TownsGuideSection } from './components/TownsGuideSection';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { SellPropertyModal } from './components/SellPropertyModal';
import { MarketInsightsSection } from './components/MarketInsightsSection';
import { ContactBanner } from './components/ContactBanner';
import { Footer } from './components/Footer';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  listingType: 'all',
  town: 'all',
  propertyType: 'all',
  minPrice: 0,
  maxPrice: 5000000,
  beds: 0,
  baths: 0,
  minSchoolRating: 0,
  openHouseOnly: false,
  newConstructionOnly: false,
  sortBy: 'newest'
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [unit, setUnit] = useState<UnitType>('sqft');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Favorites with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('njstreet_favs');
      return saved ? JSON.parse(saved) : ['nj-prop-01', 'nj-prop-03'];
    } catch {
      return ['nj-prop-01', 'nj-prop-03'];
    }
  });

  // Modal controls
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isMortgageModalOpen, setIsMortgageModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('njstreet_favs', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick tag click handler
  const handleQuickTag = (tag: {
    town?: string;
    propertyType?: any;
    openHouse?: boolean;
    schoolMin?: number;
  }) => {
    const updated: Partial<FilterState> = {};
    if (tag.town) updated.town = tag.town;
    if (tag.propertyType) updated.propertyType = tag.propertyType;
    if (tag.openHouse !== undefined) updated.openHouseOnly = tag.openHouse;
    if (tag.schoolMin) updated.minSchoolRating = tag.schoolMin;

    setFilters((prev) => ({ ...prev, ...updated }));
    handleScrollToSection('listings-section');
  };

  // Town guide click handler
  const handleSelectTownFromGuide = (townNameKo: string) => {
    // Map town Korean name to dropdown value
    const match = PROPERTIES_DATA.find((p) => p.town.includes(townNameKo));
    if (match) {
      setFilters((prev) => ({ ...prev, town: match.town }));
    } else {
      setFilters((prev) => ({ ...prev, town: 'all', searchQuery: townNameKo }));
    }
    handleScrollToSection('listings-section');
  };

  // Filtered & Sorted properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      // Listing type (all, sale, rent, commercial)
      if (filters.listingType !== 'all' && p.listingType !== filters.listingType) {
        return false;
      }

      // Town
      if (filters.town !== 'all' && !p.town.includes(filters.town) && !filters.town.includes(p.town)) {
        return false;
      }

      // Property type
      if (filters.propertyType !== 'all' && p.propertyType !== filters.propertyType) {
        return false;
      }

      // Price
      if (p.price > filters.maxPrice) {
        return false;
      }

      // Beds
      if (filters.beds > 0 && p.beds < filters.beds) {
        return false;
      }

      // Min school rating
      if (filters.minSchoolRating > 0) {
        const hasGoodSchool = p.schools.some((s) => s.rating >= filters.minSchoolRating);
        if (!hasGoodSchool) return false;
      }

      // Open house only
      if (filters.openHouseOnly && !p.openHouse) {
        return false;
      }

      // New construction only
      if (filters.newConstructionOnly && !p.isNew && p.yearBuilt < 2024) {
        return false;
      }

      // Keyword query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesQuery =
          p.titleKo.toLowerCase().includes(query) ||
          p.titleEn.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.town.toLowerCase().includes(query) ||
          p.descriptionKo.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query)) ||
          p.schools.some((s) => s.name.toLowerCase().includes(query));

        if (!matchesQuery) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'sqft_desc') return b.sqft - a.sqft;
      if (filters.sortBy === 'school_desc') {
        const maxA = Math.max(...a.schools.map((s) => s.rating));
        const maxB = Math.max(...b.schools.map((s) => s.rating));
        return maxB - maxA;
      }
      // 'newest' default
      return b.yearBuilt - a.yearBuilt;
    });
  }, [filters]);

  const favoriteObjects = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => favorites.includes(p.id));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currency={currency}
        onToggleCurrency={() => setCurrency((prev) => (prev === 'USD' ? 'KRW' : 'USD'))}
        unit={unit}
        onToggleUnit={() => setUnit((prev) => (prev === 'sqft' ? 'pyeong' : 'sqft'))}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        onOpenMortgageModal={() => setIsMortgageModalOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onSelectListingType={(type) => setFilters((prev) => ({ ...prev, listingType: type }))}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Hero Search Section */}
      <main className="flex-1">
        <HeroSearch
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={() => handleScrollToSection('listings-section')}
          matchingCount={filteredProperties.length}
          onSelectQuickTag={handleQuickTag}
        />

        {/* Real Estate Listings & Interactive Map Section */}
        <PropertyList
          properties={filteredProperties}
          allPropertiesCount={PROPERTIES_DATA.length}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          currency={currency}
          unit={unit}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
        />

        {/* Town & School District Guide */}
        <TownsGuideSection onSelectTown={handleSelectTownFromGuide} />

        {/* Real Estate Columns & Guides */}
        <MarketInsightsSection />

        {/* Consultation & Booking Banner */}
        <ContactBanner />
      </main>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          currency={currency}
          unit={unit}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Mortgage Calculator Modal */}
      <MortgageCalculatorModal
        isOpen={isMortgageModalOpen}
        onClose={() => setIsMortgageModalOpen(false)}
      />

      {/* Sell Property Request Modal */}
      <SellPropertyModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />

      {/* Favorites Modal */}
      {isFavoritesModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto border border-slate-200 relative">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">
                내가 찜한 관심 매물 ({favoriteObjects.length}개)
              </h3>
              <button
                onClick={() => setIsFavoritesModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {favoriteObjects.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p className="font-bold text-slate-700">아직 저장된 관심 매물이 없습니다.</p>
                  <p className="text-xs text-slate-400 mt-1">
                    매물 카드 상단의 하트(♥) 아이콘을 눌러 관심 있는 집을 담아보세요.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteObjects.map((prop) => (
                    <div
                      key={prop.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-400 transition-all gap-3 bg-slate-50/50"
                    >
                      <img
                        src={prop.images[0]}
                        alt={prop.titleKo}
                        className="w-20 h-16 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-blue-600 block">
                          {prop.town} • MLS# {prop.mlsNumber}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {prop.titleKo}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mt-1">
                          <span className="text-blue-700">${prop.price.toLocaleString()}</span>
                          <span className="text-[11px] font-normal text-slate-500">
                            {prop.beds}베드 • {prop.baths}배스 • {prop.sqft} sqft
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setIsFavoritesModalOpen(false);
                            setSelectedProperty(prop);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          상세보기
                        </button>
                        <button
                          onClick={() => handleToggleFavorite(prop.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsFavoritesModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenMortgageModal={() => setIsMortgageModalOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onSelectListingType={(type) => setFilters((prev) => ({ ...prev, listingType: type }))}
      />
    </div>
  );
}
