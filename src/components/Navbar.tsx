import React, { useState, useEffect } from 'react';
import { UnitType, CurrencyType } from '../types';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  onOpenCalculator?: () => void;
  onOpenSellModal: () => void;
  onOpenAdminModal?: () => void;
  onSelectNav?: (type: 'buy' | 'rent' | 'sell' | 'properties' | 'about' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  unit,
  setUnit,
  currency,
  setCurrency,
  onOpenSellModal,
  onSelectNav
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, filterType?: 'buy' | 'rent' | 'sell') => {
    setMobileMenuOpen(false);
    if (filterType === 'sell') {
      onOpenSellModal();
      return;
    }
    if (filterType && onSelectNav) onSelectNav(filterType);
    const elem = document.getElementById(sectionId);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const navClass = isScrolled ? 'text-[#171717]' : 'text-white';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/96 backdrop-blur-md border-b border-black/8' : 'bg-transparent'} ${navClass}`}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="shrink-0 text-left"
        >
          <span className="block text-[18px] font-medium tracking-[0.16em]">THE ADDRESS</span>
          <span className={`mt-0.5 block text-[8px] tracking-[0.28em] ${isScrolled ? 'text-black/45' : 'text-white/65'}`}>NEW JERSEY REAL ESTATE</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium tracking-[0.16em]">
          <button onClick={() => handleNavClick('properties-section', 'buy')} className="nav-link">BUY</button>
          <button onClick={() => handleNavClick('properties-section', 'rent')} className="nav-link">RENT</button>
          <button onClick={() => onOpenSellModal()} className="nav-link">SELL</button>
          <button onClick={() => handleNavClick('properties-section')} className="nav-link">LISTINGS</button>
          <button onClick={() => handleNavClick('locations-section')} className="nav-link">AREAS</button>
          <button onClick={() => handleNavClick('about-section')} className="nav-link">ABOUT</button>
          <button onClick={() => handleNavClick('contact-section')} className="nav-link">CONTACT</button>
        </nav>

        <div className="hidden md:flex items-center gap-5 text-[10px] tracking-[0.13em]">
          <button onClick={onOpenFavorites} className="nav-link">SAVED{favoritesCount > 0 ? ` ${favoritesCount}` : ''}</button>
          <button onClick={() => setCurrency(currency === 'USD' ? 'KRW' : 'USD')} className="nav-link">{currency}</button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[11px] font-medium tracking-[0.16em]"
          aria-label="Open navigation"
        >
          {mobileMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-[76px] min-h-[calc(100vh-76px)] bg-white px-7 py-10 text-[#171717]">
          <nav className="flex flex-col gap-7 text-[22px] font-light tracking-[0.08em]">
            <button className="text-left" onClick={() => handleNavClick('properties-section', 'buy')}>BUY</button>
            <button className="text-left" onClick={() => handleNavClick('properties-section', 'rent')}>RENT</button>
            <button className="text-left" onClick={() => { setMobileMenuOpen(false); onOpenSellModal(); }}>SELL</button>
            <button className="text-left" onClick={() => handleNavClick('properties-section')}>LISTINGS</button>
            <button className="text-left" onClick={() => handleNavClick('locations-section')}>AREAS</button>
            <button className="text-left" onClick={() => handleNavClick('about-section')}>ABOUT</button>
            <button className="text-left" onClick={() => handleNavClick('contact-section')}>CONTACT</button>
          </nav>
          <div className="mt-14 border-t border-black/10 pt-5 text-[10px] tracking-[0.14em] text-black/50">
            <button onClick={onOpenFavorites}>SAVED{favoritesCount > 0 ? ` ${favoritesCount}` : ''}</button>
            <span className="mx-4">/</span>
            <button onClick={() => setCurrency(currency === 'USD' ? 'KRW' : 'USD')}>{currency}</button>
          </div>
        </div>
      )}
    </header>
  );
};
