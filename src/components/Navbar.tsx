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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, filterType?: 'buy' | 'rent' | 'sell') => {
    setMobileMenuOpen(false);
    if (filterType === 'sell') {
      onOpenSellModal();
      return;
    }
    if (filterType && onSelectNav) {
      onSelectNav(filterType);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md text-[#111111] shadow-[0_1px_0_0_rgba(0,0,0,0.05)]' 
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo - Minimalist Luxury Typography */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg lg:text-xl font-semibold tracking-[0.25em] uppercase hover:opacity-80 transition-opacity"
        >
          THE ADDRESS
        </a>

        {/* Center Navigation Links (Compass / Sotheby's style - No icons, pure typography) */}
        <nav className="hidden md:flex items-center space-x-9 text-[13px] font-medium tracking-[0.15em] uppercase">
          <button
            onClick={() => handleNavClick('properties-section', 'buy')}
            className="hover:opacity-60 transition-opacity"
          >
            BUY
          </button>
          <button
            onClick={() => handleNavClick('properties-section', 'rent')}
            className="hover:opacity-60 transition-opacity"
          >
            RENT
          </button>
          <button
            onClick={() => onOpenSellModal()}
            className="hover:opacity-60 transition-opacity"
          >
            SELL
          </button>
          <button
            onClick={() => handleNavClick('properties-section')}
            className="hover:opacity-60 transition-opacity"
          >
            PROPERTIES
          </button>
          <button
            onClick={() => handleNavClick('about-section')}
            className="hover:opacity-60 transition-opacity"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavClick('contact-section')}
            className="hover:opacity-60 transition-opacity"
          >
            CONTACT
          </button>
        </nav>

        {/* Right Controls: Unit/Currency & Saved */}
        <div className="hidden md:flex items-center space-x-6 text-[12px] tracking-wider uppercase font-medium">
          {/* Unit Switcher */}
          <button
            onClick={() => setUnit(unit === 'pyeong' ? 'm2' : 'pyeong')}
            className="hover:opacity-60 transition-opacity"
            title="면적 단위 전환"
          >
            {unit === 'pyeong' ? '평' : '㎡'}
          </button>

          <span className="opacity-30">/</span>

          {/* Currency Switcher */}
          <button
            onClick={() => setCurrency(currency === 'KRW' ? 'USD' : 'KRW')}
            className="hover:opacity-60 transition-opacity"
            title="통화 단위 전환"
          >
            {currency}
          </button>

          {/* Saved count */}
          <button
            onClick={onOpenFavorites}
            className="hover:opacity-60 transition-opacity"
          >
            SAVED {favoritesCount > 0 && `(${favoritesCount})`}
          </button>
        </div>

        {/* Mobile Menu Button (Minimal text button) */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={onOpenFavorites}
            className="text-[12px] uppercase font-medium tracking-wider"
          >
            SAVED {favoritesCount > 0 && `(${favoritesCount})`}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[13px] uppercase font-semibold tracking-widest px-2 py-1"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean Fullscreen Minimalist) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white text-[#111111] z-50 flex flex-col justify-between px-8 py-10 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-7 text-xl font-light tracking-[0.2em] uppercase">
            <button
              onClick={() => handleNavClick('properties-section', 'buy')}
              className="text-left hover:opacity-60 transition-opacity"
            >
              BUY
            </button>
            <button
              onClick={() => handleNavClick('properties-section', 'rent')}
              className="text-left hover:opacity-60 transition-opacity"
            >
              RENT
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSellModal();
              }}
              className="text-left hover:opacity-60 transition-opacity"
            >
              SELL
            </button>
            <button
              onClick={() => handleNavClick('properties-section')}
              className="text-left hover:opacity-60 transition-opacity"
            >
              PROPERTIES
            </button>
            <button
              onClick={() => handleNavClick('about-section')}
              className="text-left hover:opacity-60 transition-opacity"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick('contact-section')}
              className="text-left hover:opacity-60 transition-opacity"
            >
              CONTACT
            </button>
          </div>

          <div className="pt-8 border-t border-neutral-100 flex items-center justify-between text-xs tracking-widest text-neutral-500 uppercase">
            <div className="flex items-center space-x-4">
              <button onClick={() => setUnit(unit === 'pyeong' ? 'm2' : 'pyeong')}>
                단위: {unit === 'pyeong' ? '평' : '㎡'}
              </button>
              <span>·</span>
              <button onClick={() => setCurrency(currency === 'KRW' ? 'USD' : 'KRW')}>
                통화: {currency}
              </button>
            </div>
            <span>THE ADDRESS</span>
          </div>
        </div>
      )}
    </header>
  );
};
