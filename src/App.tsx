import React, { useEffect, useMemo, useState } from 'react';
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
import { FavoritesModal } from './components/FavoritesModal';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { SellPropertyModal } from './components/SellPropertyModal';
import { AdminCmsModal } from './components/AdminCmsModal';
import { ListingsPage, BuyPage, RentPage, SellPage, CommunitiesPage, AboutPage, ContactPage, PropertyDetailPage } from './pages/SitePages';

export const initialFilters: FilterState = { searchQuery:'', district:'all', listingType:'all', propertyType:'all', minPrice:0, maxPrice:0, minPyeong:0, maxPyeong:0, rooms:0, baths:0, subwayWithin10Min:false, vipOnly:false, sortBy:'newest' };

export default function App(){
  const [properties,setProperties]=useState<Property[]>(()=>{const saved=localStorage.getItem('the_address_nj_properties_v2');if(saved){try{return JSON.parse(saved)}catch{}}return INITIAL_PROPERTIES});
  const [inquiries,setInquiries]=useState<ConsultationInquiry[]>(()=>{const saved=localStorage.getItem('the_address_nj_inquiries_v2');if(saved){try{return JSON.parse(saved)}catch{}}return INITIAL_INQUIRIES});
  const [filters,setFilters]=useState<FilterState>(initialFilters); const [unit,setUnit]=useState<UnitType>('sqft'); const [currency,setCurrency]=useState<CurrencyType>('USD'); const [favorites,setFavorites]=useState<string[]>(()=>{try{return JSON.parse(localStorage.getItem('the_address_nj_favorites')||'[]')}catch{return[]}}); const [favOpen,setFavOpen]=useState(false); const [calcOpen,setCalcOpen]=useState(false); const [sellOpen,setSellOpen]=useState(false); const [adminOpen,setAdminOpen]=useState(false);
  useEffect(()=>{localStorage.setItem('the_address_nj_properties_v2',JSON.stringify(properties))},[properties]); useEffect(()=>{localStorage.setItem('the_address_nj_inquiries_v2',JSON.stringify(inquiries))},[inquiries]); useEffect(()=>{localStorage.setItem('the_address_nj_favorites',JSON.stringify(favorites))},[favorites]);
  const submitInquiry=(data:Omit<ConsultationInquiry,'id'|'createdAt'|'status'>)=>setInquiries(p=>[{...data,id:`inq-${Date.now()}`,createdAt:new Date().toISOString(),status:'pending'},...p]);
  const toggleFavorite=(id:string)=>setFavorites(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const common={favoritesCount:favorites.length,onOpenFavorites:()=>setFavOpen(true),unit,setUnit,currency,setCurrency,onOpenCalculator:()=>setCalcOpen(true),onOpenSellModal:()=>setSellOpen(true),onOpenAdminModal:()=>setAdminOpen(true)};
  const path=window.location.pathname.replace(/\/$/,'')||'/';
  const query=new URLSearchParams(window.location.search); const area=query.get('area'); const pageProperties=area?properties.filter(p=>p.district.toLowerCase()===area.toLowerCase()):properties;
  if(path==='/listings') return <><ListingsPage properties={pageProperties} {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>;
  if(path==='/buy') return <><BuyPage properties={properties} {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>;
  if(path==='/rent') return <><RentPage properties={properties} {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>;
  if(path==='/sell') return <><SellPage {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>;
  if(path==='/communities') return <><CommunitiesPage properties={properties} {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>;
  if(path==='/about') return <><AboutPage {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>;
  if(path==='/contact') return <><ContactPage onSubmitInquiry={submitInquiry} {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>;
  if(path.startsWith('/property/')){const id=path.split('/')[2];const property=properties.find(p=>p.id===id)||properties[0];return <><PropertyDetailPage property={property} {...common}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></>}

  const filtered=useMemo(()=>properties.filter(p=>{if(filters.searchQuery&&!`${p.titleKo} ${p.roadAddress} ${p.district}`.toLowerCase().includes(filters.searchQuery.toLowerCase()))return false;if(filters.listingType!=='all'&&p.listingType!==filters.listingType)return false;if(filters.district!=='all'&&p.district!==filters.district)return false;return true}),[properties,filters]);
  const reset=()=>setFilters(initialFilters);
  return <div className="min-h-screen bg-white text-[#111] flex flex-col"><Navbar {...common}/><HeroSearch filters={filters} setFilters={setFilters} totalCount={filtered.length} onOpenCalculator={()=>setCalcOpen(true)} onOpenSellModal={()=>setSellOpen(true)}/><PropertyList properties={filtered.slice(0,6)} filters={filters} setFilters={setFilters} selectedProperty={null} onSelectProperty={p=>window.location.href=`/property/${p.id}`} favorites={favorites} onToggleFavorite={toggleFavorite} unit={unit} currency={currency} onResetFilters={reset}/><LocationsSection onSelectDistrictFilter={d=>window.location.href=`/listings?area=${encodeURIComponent(d)}`}/><ServicesSection onOpenSellModal={()=>setSellOpen(true)} onSelectBuy={()=>window.location.href='/buy'} onOpenVipConsultModal={()=>window.location.href='/contact'}/><AboutSection/><ContactSection onSubmitInquiry={submitInquiry}/><Footer onOpenCalculator={()=>setCalcOpen(true)} onOpenSellModal={()=>setSellOpen(true)} onOpenAdminModal={()=>setAdminOpen(true)}/><Modals {...{favOpen,setFavOpen,calcOpen,setCalcOpen,sellOpen,setSellOpen,adminOpen,setAdminOpen,favorites,properties,toggleFavorite,submitInquiry,setProperties,inquiries,setInquiries}}/></div>;
}

function Modals(p:any){return <><FavoritesModal isOpen={p.favOpen} onClose={()=>p.setFavOpen(false)} favorites={p.favorites} properties={p.properties} onToggleFavorite={p.toggleFavorite} onSelectProperty={(x:Property)=>window.location.href=`/property/${x.id}`} unit="sqft" currency="USD"/><MortgageCalculatorModal isOpen={p.calcOpen} onClose={()=>p.setCalcOpen(false)}/><SellPropertyModal isOpen={p.sellOpen} onClose={()=>p.setSellOpen(false)} onSubmitInquiry={p.submitInquiry}/><AdminCmsModal isOpen={p.adminOpen} onClose={()=>p.setAdminOpen(false)} properties={p.properties} onAddProperty={(x:Property)=>p.setProperties((v:Property[])=>[x,...v])} onDeleteProperty={(id:string)=>p.setProperties((v:Property[])=>v.filter(x=>x.id!==id))} onTogglePropertyFlag={(id:string,flag:any)=>p.setProperties((v:Property[])=>v.map(x=>x.id===id?{...x,[flag]:!x[flag]}:x))} inquiries={p.inquiries} onUpdateInquiryStatus={(id:string,status:any)=>p.setInquiries((v:ConsultationInquiry[])=>v.map(x=>x.id===id?{...x,status}:x))}/></>}
