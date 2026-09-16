import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Building, 
  Car, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  GraduationCap, 
  Train, 
  Phone, 
  MessageSquare, 
  Calculator, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Property, UnitType, CurrencyType, ConsultationInquiry } from '../types';
import { 
  formatPropertyPrice, 
  formatManwonToKorean, 
  formatManwonToUSD, 
  formatArea, 
  calculateAcquisitionTax, 
  calculateBrokerageFee, 
  calculateMortgageMonthly 
} from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  unit: UnitType;
  currency: CurrencyType;
  onSubmitInquiry: (inquiry: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  unit,
  currency,
  onSubmitInquiry
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'finance' | 'tour'>('info');

  // 금융 계산기 상태
  const [houseCount, setHouseCount] = useState<1 | 2 | 3>(1);
  const [loanRatio, setLoanRatio] = useState<number>(40); // LTV 40%
  const [interestRate, setInterestRate] = useState<number>(4.1);
  const [loanYears, setLoanYears] = useState<number>(30);

  // 투어 예약 폼 상태
  const [tourName, setTourName] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('오후 2:00');
  const [tourSubmitted, setTourSubmitted] = useState(false);

  // 세금 및 대출 계산
  const basePriceForTax = property.listingType === 'sale' ? property.price : (property.deposit || property.price);
  const taxInfo = calculateAcquisitionTax(basePriceForTax, houseCount);
  const feeInfo = calculateBrokerageFee(basePriceForTax, property.listingType);
  const loanPrincipal = Math.round(basePriceForTax * (loanRatio / 100));
  const mortgageInfo = calculateMortgageMonthly(loanPrincipal, interestRate, loanYears);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('매물 링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourName || !tourPhone) {
      alert('이름과 연락처를 입력해주세요.');
      return;
    }
    onSubmitInquiry({
      name: tourName,
      phone: tourPhone,
      type: 'tour',
      propertyId: property.id,
      propertyTitle: property.titleKo,
      preferredDate: tourDate || '가장 빠른 일정',
      preferredTime: tourTime,
      notes: `매물 방문 투어 신청 [${property.titleKo}]`
    });
    setTourSubmitted(true);
  };

  const exclusiveRatio = Math.round((property.exclusivePyeong / property.supplyPyeong) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="property-detail-modal"
        className="relative w-full max-w-5xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-screen sm:max-h-[92vh] flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate pr-4">
            <span className="text-xs px-2.5 py-1 rounded bg-slate-900 text-amber-300 font-bold uppercase">
              {property.district}
            </span>
            <span className="text-sm font-bold text-slate-800 truncate hidden sm:inline">
              {property.titleKo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
              title="관심 매물 저장"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
              title="매물 공유"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
              title="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {/* Gallery Section */}
          <div className="space-y-3">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
              <img
                src={property.images[activeImageIndex]}
                alt={property.titleKo}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                  사진 {activeImageIndex + 1} / {property.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Core Price Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{property.roadAddress}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {property.titleKo}
              </h1>
              {property.subTitle && (
                <p className="text-sm text-slate-600 mt-1">{property.subTitle}</p>
              )}
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl md:text-right shadow-xl shadow-slate-900/10 min-w-[280px]">
              <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider block">
                {property.listingType === 'sale' ? '확정 매매가' : property.listingType === 'jeonse' ? '임대 전세가' : '월세 보증금/월'}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                {formatPropertyPrice(property.listingType, property.price, property.deposit, property.monthlyRent)}
              </p>
              {currency === 'USD' && (
                <p className="text-xs text-slate-400 mt-1">
                  환산: {formatManwonToUSD(property.price)} (USD)
                </p>
              )}
            </div>
          </div>

          {/* Tab Menu Navigation within Modal */}
          <div className="flex items-center gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
                activeTab === 'info' ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              매물 종합 스펙
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
                activeTab === 'finance' ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              취득세 & 대출 시뮬레이터
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
                activeTab === 'tour' ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              1:1 VIP 방문투어 신청
            </button>
          </div>

          {/* TAB 1: General Info & Specifications */}
          {activeTab === 'info' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Core 8 Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">전용 / 공급면적</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {formatArea(property.exclusivePyeong, property.exclusiveAreaM2, unit)} / {formatArea(property.supplyPyeong, property.supplyAreaM2, unit)}
                  </span>
                  <span className="text-[10px] text-amber-600 font-semibold">전용률 약 {exclusiveRatio}%</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">내부 구조</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    방 {property.rooms}개 / 욕실 {property.baths}개
                  </span>
                  <span className="text-[10px] text-slate-500">{property.direction} (거실 기준)</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">해당층 / 총 층수</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {property.floor}층 / 총 {property.totalFloors}층
                  </span>
                  <span className="text-[10px] text-slate-500">엘리베이터 단독 연계</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">주차 가능 대수</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    세대당 {property.parking}대 (지정)
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">광폭 주차공간</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">월 평균 관리비</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    약 {property.maintenanceCost}만원
                  </span>
                  <span className="text-[10px] text-slate-500">실비 정산 방식</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">입주 가능 시기</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {property.moveInDate}
                  </span>
                  <span className="text-[10px] text-slate-500">협의 가능</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">준공 인가년도</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {property.builtYear}년도
                  </span>
                  <span className="text-[10px] text-slate-500">상태 최상급</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] text-slate-400 block font-medium">매물 등록번호</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {property.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">실매물 검증완료</span>
                </div>
              </div>

              {/* Agent Real Evaluation Description */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span>디 어드레스 전속 공인중개사 실사 브리핑</span>
                </h3>
                <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/60 text-sm text-slate-700 leading-relaxed">
                  {property.descriptionKo}
                </div>
              </div>

              {/* Features & Amenities List */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">단지 특장점 및 프리미엄 옵션</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location: Subway & Schools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {/* Subway Transit */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Train className="w-4 h-4 text-amber-600" />
                    <span>대중교통 및 지하철 연계</span>
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <p className="text-sm font-bold text-slate-800">{property.subway.station}</p>
                    <p className="text-xs text-slate-600">도보 {property.subway.walkMinutes}분 소요</p>
                    <div className="flex gap-1.5 pt-1">
                      {property.subway.lines.map((line, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Schools & Education */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>배정 학군 및 교육 환경</span>
                  </h3>
                  <div className="space-y-2">
                    {property.schools.length > 0 ? (
                      property.schools.map((school, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-800">{school.name}</span>
                            <span className="text-[11px] text-slate-500 block">{school.ratingNote}</span>
                          </div>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                            {school.distance}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-xl">
                        상업용 빌딩 또는 업무 권역 매물로 별도 주거 학군 배정이 적용되지 않습니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Financial Simulator (Taxes, Brokerage Fee, Mortgage) */}
          {activeTab === 'finance' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>안내:</strong> 본 계산 결과는 국토교통부 법정 중개보수 상한요율 및 현행 지방세법 취득세 표준세율을 기준으로 산출한 예상치이며, 개별 자산 상황 및 다주택 여부에 따라 실제 납부액과 차이가 있을 수 있습니다.
              </div>

              {/* 1. Acquisition Tax */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-600" />
                    <span>예상 취득세 및 부가세율</span>
                  </h3>
                  {/* House count toggle */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setHouseCount(1)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                        houseCount === 1 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                      }`}
                    >
                      1주택(기본)
                    </button>
                    <button
                      onClick={() => setHouseCount(2)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                        houseCount === 2 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                      }`}
                    >
                      2주택
                    </button>
                    <button
                      onClick={() => setHouseCount(3)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                        houseCount === 3 ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                      }`}
                    >
                      3주택 이상
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400">적용 세율</span>
                    <span className="text-base font-bold text-slate-900 block">{taxInfo.taxRate}%</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400">순수 취득세</span>
                    <span className="text-base font-bold text-slate-900 block">{formatManwonToKorean(taxInfo.acquisitionTax)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400">지방교육세+농특세</span>
                    <span className="text-base font-bold text-slate-900 block">{formatManwonToKorean(taxInfo.localEduTax + taxInfo.ruralSpecialTax)}</span>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <span className="text-[10px] text-amber-800 font-bold">총 예상 세액</span>
                    <span className="text-base font-black text-amber-900 block">{formatManwonToKorean(taxInfo.totalTax)}</span>
                  </div>
                </div>
              </div>

              {/* 2. Brokerage Fee */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-slate-900">공인중개사 법정 중개보수 한도</h3>
                <div className="flex items-center justify-between text-sm bg-white p-4 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800">상한 요율: {feeInfo.feeRate}% (VAT 별도)</p>
                    <p className="text-xs text-slate-500 mt-0.5">중개보수 {formatManwonToKorean(feeInfo.maxFee)} + 부가세 10%</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">최종 합계</span>
                    <span className="text-lg font-bold text-slate-900">{formatManwonToKorean(feeInfo.total)}</span>
                  </div>
                </div>
              </div>

              {/* 3. Mortgage Estimator */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-base font-bold text-slate-900">주택담보대출 원리금 균등상환 예상</h3>
                
                {/* Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      대출 비율 (LTV): {loanRatio}% ({formatManwonToKorean(loanPrincipal)})
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={70}
                      step={5}
                      value={loanRatio}
                      onChange={(e) => setLoanRatio(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      금리: 연 {interestRate}%
                    </label>
                    <input
                      type="range"
                      min={2.5}
                      max={7.0}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      상환 기간: {loanYears}년
                    </label>
                    <select
                      value={loanYears}
                      onChange={(e) => setLoanYears(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-medium"
                    >
                      <option value={10}>10년 상환</option>
                      <option value={20}>20년 상환</option>
                      <option value={30}>30년 상환</option>
                      <option value={40}>40년 상환</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-400 font-semibold block">예상 월 원리금 납입액</span>
                    <span className="text-xl font-black text-white">
                      월 약 {formatManwonToKorean(mortgageInfo.monthlyPayment)}
                    </span>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <p>총 이자: {formatManwonToKorean(mortgageInfo.totalInterest)}</p>
                    <p>총 상환액: {formatManwonToKorean(mortgageInfo.totalPayment)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Tour Booking Form */}
          {activeTab === 'tour' && (
            <div className="max-w-xl mx-auto space-y-6 py-2 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-slate-900">VIP 전속 프라이빗 방문투어 예약</h3>
                <p className="text-xs text-slate-500">
                  입주민의 사생활 보호를 위해 모든 투어는 100% 사전 예약제로 운영됩니다.
                </p>
              </div>

              {tourSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-950">투어 예약이 접수되었습니다</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    담당 공인중개사가 1시간 이내에 기재해주신 연락처로 일정 확인 및 사전 보안 체크인을 위한 안내 연락을 드립니다.
                  </p>
                  <button
                    onClick={() => setTourSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
                  >
                    추가 신청하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTourSubmit} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">고객명 (성함)</label>
                    <input
                      type="text"
                      required
                      placeholder="성함을 입력해주세요"
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">연락처</label>
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={tourPhone}
                      onChange={(e) => setTourPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">희망 방문일</label>
                      <input
                        type="date"
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">희망 시간대</label>
                      <select
                        value={tourTime}
                        onChange={(e) => setTourTime(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="오전 10:30">오전 10:30</option>
                        <option value="오후 2:00">오후 2:00</option>
                        <option value="오후 4:30">오후 4:30</option>
                        <option value="오후 6:00">오후 6:00 (야경투어)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition active:scale-95"
                  >
                    1:1 방문 투어 예약 완료
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Assigned Agent Profile Card */}
          <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={property.agent.avatar}
                alt={property.agent.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400"
              />
              <div>
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  담당 전속 공인중개사
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">{property.agent.name}</h4>
                <p className="text-xs text-slate-400">{property.agent.title} · 경력 {property.agent.experienceYears}년</p>
                <p className="text-[11px] text-slate-500 mt-1">등록번호: {property.agent.licenseNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${property.agent.mobile}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>전화 상담</span>
              </a>
              <button
                onClick={() => {
                  alert(`카카오톡 플러스친구 [${property.agent.kakaoId}] 연결 준비 중입니다. 직통 번호 ${property.agent.mobile}로 연락주시면 즉시 연결됩니다.`);
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 text-xs font-bold transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>카카오톡 1:1</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Bottom Action Bar */}
        <div className="sm:hidden sticky bottom-0 bg-slate-950 border-t border-slate-800 p-3 flex items-center gap-2 z-40">
          <a
            href={`tel:${property.agent.mobile}`}
            className="flex-1 py-3 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>전화상담</span>
          </a>
          <button
            onClick={() => setActiveTab('tour')}
            className="flex-1 py-3 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>투어신청</span>
          </button>
        </div>
      </div>
    </div>
  );
};
