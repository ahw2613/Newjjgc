import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  Calculator, 
  Menu, 
  X, 
  Phone, 
  MessageSquareText, 
  Home, 
  Search, 
  PlusCircle, 
  GraduationCap, 
  Globe
} from 'lucide-react';
import { CurrencyType, UnitType } from '../types';

interface NavbarProps {
  currency: CurrencyType;
  onToggleCurrency: () => void;
  unit: UnitType;
  onToggleUnit: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenMortgageModal: () => void;
  onOpenSellModal: () => void;
  onSelectListingType: (type: 'all' | 'sale' | 'rent' | 'commercial') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  unit,
  onToggleUnit,
  favoritesCount,
  onOpenFavorites,
  onOpenMortgageModal,
  onOpenSellModal,
  onSelectListingType,
  onScrollToSection
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top emergency & agent info bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-100">뉴저지 버겐카운티 전문 부동산 포털 (NJ MLS 연동)</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-400">포트리 · 팰팍 · 테너플라이 · 클로스터 · 에지워터</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href="tel:2015550199" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="대표 전화 상담"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-slate-100">201-555-0199</span>
            </a>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-amber-300">
              <MessageSquareText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">카카오톡 ID:</span>
              <span className="font-medium">njstreet_realestate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => {
              onSelectListingType('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
            id="nav-brand-logo"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">NJ STREET</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800 uppercase tracking-wider">
                  REALTY
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 tracking-tight">
                뉴저지 스트리트 부동산
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => {
                onSelectListingType('sale');
                onScrollToSection('listings-section');
              }}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              매매 (Buy)
            </button>
            <button
              onClick={() => {
                onSelectListingType('rent');
                onScrollToSection('listings-section');
              }}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              렌트 (Rent)
            </button>
            <button
              onClick={() => {
                onSelectListingType('commercial');
                onScrollToSection('listings-section');
              }}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              상업용 (Commercial)
            </button>
            <button
              onClick={() => onScrollToSection('towns-section')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              지역·학군 가이드
            </button>
            <button
              onClick={onOpenMortgageModal}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              모기지 계산기
            </button>
            <button
              onClick={() => onScrollToSection('insights-section')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              부동산 가이드
            </button>
          </nav>

          {/* Controls & Quick Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Currency & Unit switches */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={onToggleCurrency}
                className="px-2 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1 hover:bg-white text-slate-700"
                title="통화 변환 (달러 / 원화)"
              >
                <Globe className="w-3 h-3 text-slate-500" />
                <span className={currency === 'USD' ? 'text-blue-600 font-bold' : 'text-slate-600'}>
                  {currency === 'USD' ? '$ USD' : '₩ 원화'}
                </span>
              </button>
              <div className="h-3 w-[1px] bg-slate-300 mx-0.5"></div>
              <button
                onClick={onToggleUnit}
                className="px-2 py-1 rounded font-semibold transition-all cursor-pointer hover:bg-white text-slate-700"
                title="면적 단위 변환 (SqFt / 평)"
              >
                <span className={unit === 'sqft' ? 'text-blue-600 font-bold' : 'text-slate-600'}>
                  {unit === 'sqft' ? 'SqFt' : '평 (Pyeong)'}
                </span>
              </button>
            </div>

            {/* Favorites button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              title="관심 매물 보기"
              id="btn-nav-favorites"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Sell/Rent out Property request */}
            <button
              onClick={onOpenSellModal}
              className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-600" />
              내 집 팔기/렌트
            </button>

            {/* CTA Contact Button */}
            <button
              onClick={() => onScrollToSection('contact-banner')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
              id="btn-nav-consult"
            >
              상담 문의 & 투어
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-700 hover:text-rose-600 rounded-lg border border-slate-200"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 rounded-lg border border-slate-200 focus:outline-hidden"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                onToggleCurrency();
              }}
              className="py-2 px-3 text-xs font-semibold bg-slate-100 rounded-lg text-center"
            >
              통화: <span className="font-bold text-blue-600">{currency}</span>
            </button>
            <button
              onClick={() => {
                onToggleUnit();
              }}
              className="py-2 px-3 text-xs font-semibold bg-slate-100 rounded-lg text-center"
            >
              단위: <span className="font-bold text-blue-600">{unit === 'sqft' ? 'SqFt' : '평'}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                onSelectListingType('all');
                onScrollToSection('listings-section');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Home className="w-4 h-4 text-blue-600" />
              전체 매물 보기
            </button>
            <button
              onClick={() => {
                onSelectListingType('sale');
                onScrollToSection('listings-section');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Search className="w-4 h-4 text-blue-600" />
              매매 (Buy)
            </button>
            <button
              onClick={() => {
                onSelectListingType('rent');
                onScrollToSection('listings-section');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              렌트 (Rent)
            </button>
            <button
              onClick={() => {
                onSelectListingType('commercial');
                onScrollToSection('listings-section');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              상업용 매물 (Commercial)
            </button>
            <button
              onClick={() => {
                onScrollToSection('towns-section');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              지역 & 학군 정보 가이드
            </button>
            <button
              onClick={() => {
                onOpenMortgageModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              모기지 월납입금 계산기
            </button>
            <button
              onClick={() => {
                onOpenSellModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <PlusCircle className="w-4 h-4 text-purple-600" />
              내 집 팔기/렌트 무료 의뢰
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:2015550199"
              className="w-full py-2.5 text-center text-xs font-bold text-slate-800 bg-slate-100 rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              전화 상담 201-555-0199
            </a>
            <button
              onClick={() => {
                onScrollToSection('contact-banner');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              온라인 상담 및 투어 예약
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
