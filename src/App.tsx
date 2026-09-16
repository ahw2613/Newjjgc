import React, { useState, useEffect, useMemo } from 'react';
import { Property, FilterState, UnitType, CurrencyType, ConsultationInquiry } from './types';
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

export const initialFilters: FilterState = { searchQuery: '', district: 'all', listingType: 'all', propertyType: 'all', minPrice: 0, maxPrice: 0, minPyeong: 0, maxPyeong: 0, rooms: 0, baths: 0, subwayWithin10Min: false, vipOnly: false, sortBy: 'newest' };

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => { const saved = localStorage.getItem('the_address_properties'); if (saved) { try { return JSON.parse(saved); } catch { return INITIAL_PROPERTIES; } } return INITIAL_PROPERTIES; });
  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>(() => { const saved = localStorage.getItem('the_address_inquiries'); if (saved) { try { return JSON.parse(saved); } catch { return INITIAL_INQUIRIES; } } return INITIAL_INQUIRIES; });
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [unit, setUnit] = useState<UnitType>('sqft');
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [favorites, setFavorites] = useState<string[]>(() => { const saved = localStorage.getItem('the_address_favorites'); if (saved) { try { return JSON.parse(saved); } catch { return []; } } return []; });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => { localStorage.setItem('the_address_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('the_address_properties', JSON.stringify(properties)); }, [properties]);
  useEffect(() => { localStorage.setItem('the_address_inquiries', JSON.stringify(inquiries)); }, [inquiries]);
  const handleToggleFavorite = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  const handleResetFilters = () => setFilters(initialFilters);
  const handleSubmitInquiry = (data: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => { const now = new Date(); const item: ConsultationInquiry = { ...data, id: `inq-${Date.now()}`, createdAt: now.toISOString(), status: 'pending' }; setInquiries(prev => [item, ...prev]); };
  const handleAddProperty = (newProp: Property) => setProperties(prev => [newProp, ...prev]);
  const handleDeleteProperty = (id: string) => { setProperties(prev => prev.filter(p => p.id !== id)); if (selectedProperty?.id === id) setSelectedProperty(null); };
  const handleTogglePropertyFlag = (id: string, flag: 'isHot' | 'isFeatured' | 'isVipExclusive') => setProperties(prev => prev.map(p => p.id === id ? { ...p, [flag]: !p[flag] } : p));
  const handleUpdateInquiryStatus = (id: string, status: 'pending' | 'in_progress' | 'completed') => setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  const filteredProperties = useMemo(() => properties.filter(prop => { if (filters.searchQuery.trim()) { const q = filters.searchQuery.toLowerCase().trim(); if (![prop.titleKo, prop.subTitle, prop.district, prop.roadAddress, prop.addressShort, ...prop.features, prop.subway.station].filter(Boolean).some(v => v!.toLowerCase().includes(q))) return false; } if (filters.district !== 'all' && prop.district !== filters.district) return false; if (filters.listingType !== 'all' && prop.listingType !== filters.listingType) return false; if (filters.propertyType !== 'all' && prop.propertyType !== filters.propertyType) return false; if (filters.minPrice > 0 && prop.price < filters.minPrice) return false; if (filters.maxPrice > 0 && prop.price > filters.maxPrice) return false; if (filters.minPyeong > 0 && prop.exclusivePyeong < filters.minPyeong) return false; if (filters.rooms > 0 && prop.rooms < filters.rooms) return false; if (filters.subwayWithin10Min && prop.subway.walkMinutes > 10) return false; if (filters.vipOnly && !prop.isVipExclusive) return false; return true; }).sort((a,b) => filters.sortBy === 'price_desc' ? b.price-a.price : filters.sortBy === 'price_asc' ? a.price-b.price : filters.sortBy === 'pyeong_desc' ? b.exclusivePyeong-a.exclusivePyeong : filters.sortBy === 'floor_desc' ? b.floor-a.floor : b.builtYear-a.builtYear), [properties, filters]);
  const handleSelectDistrictFromGuide = (districtName: string) => { setFilters(prev => ({ ...prev, district: districtName })); document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' }); };
  const handleSelectNav = (type: 'buy' | 'rent' | 'sell' | 'properties' | 'about' | 'contact') => { if (type === 'buy') setFilters(prev => ({ ...prev, listingType: 'sale', searchQuery: '' })); else if (type === 'rent') setFilters(prev => ({ ...prev, listingType: 'rent', searchQuery: '' })); else if (type === 'properties') setFilters(prev => ({ ...prev, listingType: 'all' })); };

  return <div className="min-h-screen bg-white text-[#111] flex flex-col font-sans selection:bg-black selection:text-white">
    <Navbar favoritesCount={favorites.length} onOpenFavorites={() => setIsFavoritesOpen(true)} unit={unit} setUnit={setUnit} currency={currency} setCurrency={setCurrency} onOpenCalculator={() => setIsCalculatorOpen(true)} onOpenSellModal={() => setIsSellModalOpen(true)} onOpenAdminModal={() => setIsAdminOpen(true)} onSelectNav={handleSelectNav} />
    <HeroSearch filters={filters} setFilters={setFilters} totalCount={filteredProperties.length} onOpenCalculator={() => setIsCalculatorOpen(true)} onOpenSellModal={() => setIsSellModalOpen(true)} />
    <PropertyList properties={filteredProperties} filters={filters} setFilters={setFilters} selectedProperty={selectedProperty} onSelectProperty={setSelectedProperty} favorites={favorites} onToggleFavorite={handleToggleFavorite} unit={unit} currency={currency} onResetFilters={handleResetFilters} />
    <LocationsSection onSelectDistrictFilter={handleSelectDistrictFromGuide} />
    <ServicesSection onOpenSellModal={() => setIsSellModalOpen(true)} onSelectBuy={() => handleSelectNav('buy')} onOpenVipConsultModal={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })} />
    <AboutSection />
    <ContactSection onSubmitInquiry={handleSubmitInquiry} />
    <Footer onOpenCalculator={() => setIsCalculatorOpen(true)} onOpenSellModal={() => setIsSellModalOpen(true)} onOpenAdminModal={() => setIsAdminOpen(true)} />
    {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} isFavorite={favorites.includes(selectedProperty.id)} onToggleFavorite={handleToggleFavorite} unit={unit} currency={currency} onSubmitInquiry={handleSubmitInquiry} />}
    <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} favorites={favorites} properties={properties} onToggleFavorite={handleToggleFavorite} onSelectProperty={setSelectedProperty} unit={unit} currency={currency} />
    <MortgageCalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    <SellPropertyModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} onSubmitInquiry={handleSubmitInquiry} />
    <AdminCmsModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} properties={properties} onAddProperty={handleAddProperty} onDeleteProperty={handleDeleteProperty} onTogglePropertyFlag={handleTogglePropertyFlag} inquiries={inquiries} onUpdateInquiryStatus={handleUpdateInquiryStatus} />
  </div>;
}
