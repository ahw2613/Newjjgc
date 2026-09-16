import React, { useState, useEffect } from 'react';
import { UnitType, CurrencyType } from '../types';

interface NavbarProps { favoritesCount: number; onOpenFavorites: () => void; unit: UnitType; setUnit: (unit: UnitType) => void; currency: CurrencyType; setCurrency: (currency: CurrencyType) => void; onOpenCalculator?: () => void; onOpenSellModal: () => void; onOpenAdminModal?: () => void; onSelectNav?: (type: 'buy' | 'rent' | 'sell' | 'properties' | 'about' | 'contact') => void; }

export const Navbar: React.FC<NavbarProps> = ({ favoritesCount, onOpenFavorites, currency, setCurrency, onOpenSellModal, onSelectNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 30); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

  const en = language === 'en';
  const labels = en
    ? { buy: 'BUY', rent: 'RENT', sell: 'SELL', listings: 'LISTINGS', areas: 'COMMUNITIES', about: 'ABOUT', contact: 'CONTACT', saved: 'SAVED', menu: 'MENU', close: 'CLOSE', realEstate: 'NEW JERSEY REAL ESTATE', area: 'BERGEN COUNTY · NORTH JERSEY' }
    : { buy: '구매', rent: '렌트', sell: '매도', listings: '매물', areas: '지역', about: '소개', contact: '상담', saved: '관심매물', menu: '메뉴', close: '닫기', realEstate: '뉴저지 부동산', area: '버겐카운티 · 뉴저지' };

  const handleNavClick = (sectionId: string, filterType?: 'buy' | 'rent' | 'sell') => { setMobileMenuOpen(false); if (filterType === 'sell') { onOpenSellModal(); return; } if (filterType && onSelectNav) onSelectNav(filterType); document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }); };
  const navClass = isScrolled ? 'text-[#171717]' : 'text-white';

  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/96 text-[#171717] shadow-[0_1px_0_rgba(0,0,0,.08)]' : 'bg-black/15 text-white'}`}>
      <div className="mx-auto flex h-[32px] max-w-[1440px] items-center justify-between px-6 text-[9px] tracking-[0.08em] lg:px-10">
        <div className="flex items-center gap-5"><span>{labels.area}</span><span className="hidden sm:inline opacity-60">Licensed Real Estate Brokerage</span></div>
        <div className="flex items-center gap-4"><button onClick={() => setLanguage('ko')} className={en ? 'opacity-55' : 'font-semibold'}>한국어</button><button onClick={() => setLanguage('en')} className={en ? 'font-semibold' : 'opacity-55'}>English</button><span className="hidden sm:inline opacity-60">(201) 000-0000</span></div>
      </div>
      <header className={`mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-6 lg:px-10 ${isScrolled ? 'border-t border-black/8' : 'border-t border-white/10'}`}>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="shrink-0 text-left">
          <span className="block text-[18px] font-semibold tracking-[0.14em]">THE ADDRESS</span>
          <span className={`mt-0.5 block text-[8px] tracking-[0.24em] ${isScrolled ? 'text-black/45' : 'text-white/65'}`}>{labels.realEstate}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-7 text-[10px] font-medium tracking-[0.13em]">
          <button onClick={() => handleNavClick('properties-section', 'buy')} className="nav-link">{labels.buy}</button><button onClick={() => handleNavClick('properties-section', 'rent')} className="nav-link">{labels.rent}</button><button onClick={onOpenSellModal} className="nav-link">{labels.sell}</button><button onClick={() => handleNavClick('properties-section')} className="nav-link">{labels.listings}</button><button onClick={() => handleNavClick('locations-section')} className="nav-link">{labels.areas}</button><button onClick={() => handleNavClick('about-section')} className="nav-link">{labels.about}</button><button onClick={() => handleNavClick('contact-section')} className="nav-link">{labels.contact}</button>
        </nav>
        <div className="hidden md:flex items-center gap-4 text-[9px] tracking-[0.1em]"><button onClick={onOpenFavorites} className="nav-link">{labels.saved}{favoritesCount > 0 ? ` ${favoritesCount}` : ''}</button><button onClick={() => setCurrency(currency === 'USD' ? 'KRW' : 'USD')} className="nav-link">{currency}</button></div>
        <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[10px] font-medium tracking-[0.14em]" aria-label={mobileMenuOpen ? labels.close : labels.menu}>{mobileMenuOpen ? labels.close : labels.menu}</button>
      </header>
      {mobileMenuOpen && <div className="absolute inset-x-0 top-[106px] min-h-[calc(100vh-106px)] bg-white px-7 py-10 text-[#171717]"><nav className="flex flex-col gap-6 text-[21px] font-light tracking-[0.05em]"><button className="text-left" onClick={() => handleNavClick('properties-section', 'buy')}>{labels.buy}</button><button className="text-left" onClick={() => handleNavClick('properties-section', 'rent')}>{labels.rent}</button><button className="text-left" onClick={() => { setMobileMenuOpen(false); onOpenSellModal(); }}>{labels.sell}</button><button className="text-left" onClick={() => handleNavClick('properties-section')}>{labels.listings}</button><button className="text-left" onClick={() => handleNavClick('locations-section')}>{labels.areas}</button><button className="text-left" onClick={() => handleNavClick('about-section')}>{labels.about}</button><button className="text-left" onClick={() => handleNavClick('contact-section')}>{labels.contact}</button></nav><div className="mt-12 border-t border-black/10 pt-5 text-[10px] tracking-[0.12em] text-black/55"><button onClick={() => setLanguage('ko')}>한국어</button><span className="mx-3">/</span><button onClick={() => setLanguage('en')}>English</button><span className="mx-3">/</span><button onClick={onOpenFavorites}>{labels.saved}</button></div></div>}
    </div>
  );
};
