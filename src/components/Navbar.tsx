import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Heart, 
  Phone, 
  Menu, 
  X, 
  Settings, 
  Calculator, 
  Sparkles,
  Send
} from 'lucide-react';
import { UnitType, CurrencyType } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenMortgageCalc: () => void;
  onOpenSellModal: () => void;
  onOpenAdminCms: () => void;
  unit: UnitType;
  onToggleUnit: () => void;
  currency: CurrencyType;
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenFavorites,
  onOpenMortgageCalc,
  onOpenSellModal,
  onOpenAdminCms,
  unit,
  onToggleUnit,
  currency,
  onToggleCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'properties', label: '매물 검색' },
    { id: 'locations', label: '지역 가이드' },
    { id: 'services', label: '전문 서비스' },
    { id: 'about', label: '회사 소개' },
    { id: 'contact', label: '1:1 상담문의' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg text-slate-100 py-3' 
          : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/40 text-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-slate-950 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Cinzel',serif] tracking-wider text-xl font-bold bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-transparent">
                THE ADDRESS
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                PRESTIGE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              디 어드레스 부동산 중개법인
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden md:flex items-center gap-2 xl:gap-3">
          {/* Unit Toggle (평 / ㎡) */}
          <button
            id="btn-unit-toggle"
            onClick={onToggleUnit}
            title="면적 단위 변경 (평형 / ㎡)"
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-amber-300 hover:border-slate-700 transition"
          >
            <span className={unit === 'pyeong' ? 'text-amber-400 font-bold' : 'text-slate-400'}>평</span>
            <span className="text-slate-600">/</span>
            <span className={unit === 'm2' ? 'text-amber-400 font-bold' : 'text-slate-400'}>㎡</span>
          </button>

          {/* Currency Toggle (KRW / USD) */}
          <button
            id="btn-currency-toggle"
            onClick={onToggleCurrency}
            title="통화 표시 변경 (원화 / USD)"
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-amber-300 hover:border-slate-700 transition"
          >
            <span className={currency === 'KRW' ? 'text-amber-400 font-bold' : 'text-slate-400'}>₩</span>
            <span className="text-slate-600">/</span>
            <span className={currency === 'USD' ? 'text-amber-400 font-bold' : 'text-slate-400'}>$</span>
          </button>

          {/* Mortgage / Tax Calculator */}
          <button
            id="btn-open-calc"
            onClick={onOpenMortgageCalc}
            title="취득세 및 주택담보대출 계산기"
            className="p-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 border border-slate-800/80 transition"
          >
            <Calculator className="w-4 h-4" />
          </button>

          {/* Favorites Wishlist */}
          <button
            id="btn-open-favorites"
            onClick={onOpenFavorites}
            className="relative p-2 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-slate-800/80 border border-slate-800/80 transition"
            title="관심 매물 목록"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Admin CMS Button */}
          <button
            id="btn-open-admin-cms"
            onClick={onOpenAdminCms}
            title="관리자 CMS 데모 (매물 등록/수정/문의관리)"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition font-medium"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span>관리자</span>
          </button>

          {/* Sell Property CTA */}
          <button
            id="btn-open-sell-cta"
            onClick={onOpenSellModal}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/10 transition active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>내 집 내놓기</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
          
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={onToggleUnit}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
            >
              면적단위: <span className="text-amber-400 font-bold">{unit === 'pyeong' ? '평(Pyeong)' : '㎡'}</span>
            </button>
            <button
              onClick={onToggleCurrency}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
            >
              통화: <span className="text-amber-400 font-bold">{currency === 'KRW' ? '원화(KRW)' : '달러(USD)'}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === item.id
                    ? 'text-amber-400 bg-amber-500/10 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                onOpenMortgageCalc();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              취득세·대출계산기
            </button>
            <button
              onClick={() => {
                onOpenAdminCms();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
            >
              <Settings className="w-4 h-4 text-amber-400" />
              관리자 CMS
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenSellModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md"
            >
              <Send className="w-4 h-4" />
              내 집 내놓기 (무료 가치평가 의뢰)
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>대표전화: 02-588-7740</span>
            </div>
            <span className="text-amber-500 font-medium">연중무휴 VIP 상담</span>
          </div>
        </div>
      )}
    </header>
  );
};
