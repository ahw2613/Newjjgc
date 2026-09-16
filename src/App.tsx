import React, { useState, useEffect, useMemo } from 'react';
import { 
  Property, 
  FilterState, 
  UnitType, 
  CurrencyType, 
  ConsultationInquiry 
} from './types';
import { INITIAL_PROPERTIES, INITIAL_INQUIRIES } from './data/propertiesData';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { PropertyList } from './components/PropertyList';
import { LocationsSection } from './components/LocationsSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { FavoritesModal } from './components/FavoritesModal';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { SellPropertyModal } from './components/SellPropertyModal';
import { AdminCmsModal } from './components/AdminCmsModal';

export const initialFilters: FilterState = {
  searchQuery: '',
  district: 'all',
  listingType: 'all',
  propertyType: 'all',
  minPrice: 0,
  maxPrice: 0,
  minPyeong: 0,
  maxPyeong: 0,
  rooms: 0,
  baths: 0,
  subwayWithin10Min: false,
  vipOnly: false,
  sortBy: 'newest',
};

export default function App() {
  // 메인 데이터 상태
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('the_address_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROPERTIES;
      }
    }
    return INITIAL_PROPERTIES;
  });

  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>(() => {
    const saved = localStorage.getItem('the_address_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_INQUIRIES;
      }
    }
    return INITIAL_INQUIRIES;
  });

  // 필터 및 뷰 상태
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [unit, setUnit] = useState<UnitType>('pyeong');
  const [currency, setCurrency] = useState<CurrencyType>('KRW');

  // 관심 매물 (즐겨찾기)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('the_address_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['prop-hannam-hill', 'prop-acro-forest'];
      }
    }
    return ['prop-hannam-hill', 'prop-acro-forest'];
  });

  // 모달 상태
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // 로컬 스토리지 동기화
  useEffect(() => {
    localStorage.setItem('the_address_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('the_address_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('the_address_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // 관심 매물 토글
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 필터 리셋
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // 신규 문의 / 투어 신청 추가
  const handleSubmitInquiry = (newInquiryData: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const item: ConsultationInquiry = {
      ...newInquiryData,
      id: `inq-${Date.now()}`,
      createdAt: dateStr,
      status: 'pending'
    };

    setInquiries(prev => [item, ...prev]);
  };

  // 관리자 기능
  const handleAddProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    if (selectedProperty?.id === id) {
      setSelectedProperty(null);
    }
  };

  const handleTogglePropertyFlag = (id: string, flag: 'isHot' | 'isFeatured' | 'isVipExclusive') => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, [flag]: !p[flag] };
      }
      return p;
    }));
  };

  const handleUpdateInquiryStatus = (id: string, status: 'pending' | 'in_progress' | 'completed') => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return { ...inq, status };
      }
      return inq;
    }));
  };

  // 매물 필터링 및 정렬 연산
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // 1. 텍스트 검색
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchTitle = prop.titleKo.toLowerCase().includes(query);
        const matchSubTitle = prop.subTitle?.toLowerCase().includes(query);
        const matchDistrict = prop.district.toLowerCase().includes(query);
        const matchAddress = prop.roadAddress.toLowerCase().includes(query) || prop.addressShort.toLowerCase().includes(query);
        const matchFeatures = prop.features.some(f => f.toLowerCase().includes(query));
        const matchStation = prop.subway.station.toLowerCase().includes(query);

        if (!matchTitle && !matchSubTitle && !matchDistrict && !matchAddress && !matchFeatures && !matchStation) {
          return false;
        }
      }

      // 2. 권역 필터
      if (filters.district !== 'all' && prop.district !== filters.district) {
        return false;
      }

      // 3. 거래 형태
      if (filters.listingType !== 'all' && prop.listingType !== filters.listingType) {
        return false;
      }

      // 4. 매물 유형
      if (filters.propertyType !== 'all' && prop.propertyType !== filters.propertyType) {
        return false;
      }

      // 5. 가격 범위 (만원 단위)
      if (filters.minPrice > 0 && prop.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice > 0 && prop.price > filters.maxPrice) {
        return false;
      }

      // 6. 최소 전용면적 (평)
      if (filters.minPyeong > 0 && prop.exclusivePyeong < filters.minPyeong) {
        return false;
      }

      // 7. 방 개수
      if (filters.rooms > 0 && prop.rooms < filters.rooms) {
        return false;
      }

      // 8. 역세권 10분내
      if (filters.subwayWithin10Min && prop.subway.walkMinutes > 10) {
        return false;
      }

      // 9. VIP 전속만
      if (filters.vipOnly && !prop.isVipExclusive) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'pyeong_desc') {
        return b.exclusivePyeong - a.exclusivePyeong;
      }
      if (filters.sortBy === 'floor_desc') {
        return b.floor - a.floor;
      }
      // 'newest' default
      return b.builtYear - a.builtYear;
    });
  }, [properties, filters]);

  // 권역 가이드에서 특정 지역 선택 시 해당 권역으로 필터 걸고 매물 영역으로 스크롤
  const handleSelectDistrictFromGuide = (districtName: string) => {
    setFilters(prev => ({
      ...prev,
      district: districtName
    }));
    const targetElement = document.getElementById('properties-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectNav = (type: 'buy' | 'rent' | 'sell' | 'properties' | 'about' | 'contact') => {
    if (type === 'buy') {
      setFilters(prev => ({ ...prev, listingType: 'sale', searchQuery: '' }));
    } else if (type === 'rent') {
      setFilters(prev => ({ ...prev, listingType: 'rent', searchQuery: '' }));
    } else if (type === 'properties') {
      setFilters(prev => ({ ...prev, listingType: 'all' }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* 1. Global Navigation Bar (Minimalist Luxury Brokerage Header) */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        unit={unit}
        setUnit={setUnit}
        currency={currency}
        setCurrency={setCurrency}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenAdminModal={() => setIsAdminOpen(true)}
        onSelectNav={handleSelectNav}
      />

      {/* 2. Zillow + Compass Full-Bleed Hero Search */}
      <HeroSearch
        filters={filters}
        setFilters={setFilters}
        totalCount={filteredProperties.length}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
      />

      {/* 3. Core Property Listings (Grid & Map Split View) */}
      <PropertyList
        properties={filteredProperties}
        filters={filters}
        setFilters={setFilters}
        selectedProperty={selectedProperty}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        unit={unit}
        currency={currency}
        onResetFilters={handleResetFilters}
      />

      {/* 4. Luxury District Editorial Gallery */}
      <LocationsSection
        onSelectDistrictFilter={handleSelectDistrictFromGuide}
      />

      {/* 5. 3 Pillar Architectural Practices (Buy, Sell, Lease) */}
      <ServicesSection
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onSelectBuy={() => handleSelectNav('buy')}
        onOpenVipConsultModal={() => {
          const contactElement = document.getElementById('contact-section');
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 6. Brand Heritage & 50/50 Editorial Architecture */}
      <AboutSection />

      {/* 7. Private Advisory Inquiry Form */}
      <ContactSection
        onSubmitInquiry={handleSubmitInquiry}
      />

      {/* 8. Sotheby's Style Legal Footer */}
      <Footer
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* --- MODALS --- */}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          unit={unit}
          currency={currency}
          onSubmitInquiry={handleSubmitInquiry}
        />
      )}

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        properties={properties}
        onToggleFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        unit={unit}
        currency={currency}
      />

      {/* Acquisition Tax & Mortgage Calculator Modal */}
      <MortgageCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Sell / Consign Property Modal */}
      <SellPropertyModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onSubmitInquiry={handleSubmitInquiry}
      />

      {/* Admin CMS Management Modal */}
      <AdminCmsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        properties={properties}
        onAddProperty={handleAddProperty}
        onDeleteProperty={handleDeleteProperty}
        onTogglePropertyFlag={handleTogglePropertyFlag}
        inquiries={inquiries}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
      />
    </div>
  );
}
