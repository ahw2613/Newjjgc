import React, { useState } from 'react';
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
  const [showTourForm, setShowTourForm] = useState(false);
  const [tourName, setTourName] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('오후 2:00');
  const [tourNote, setTourNote] = useState('');
  const [tourSuccess, setTourSuccess] = useState(false);

  // Financial simulation state
  const [houseCount, setHouseCount] = useState<1 | 2 | 3>(1);
  const [showFinanceCalc, setShowFinanceCalc] = useState(false);

  const acquisitionTaxInfo = calculateAcquisitionTax(property.price, houseCount);
  const brokerageInfo = calculateBrokerageFee(property.price, property.listingType);
  const mortgageMonthly = calculateMortgageMonthly(property.price * 0.4, 4.0, 30);

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourName || !tourPhone) return;

    onSubmitInquiry({
      name: tourName,
      phone: tourPhone,
      type: 'tour',
      propertyId: property.id,
      propertyTitle: property.titleKo,
      preferredDate: tourDate,
      preferredTime: tourTime,
      notes: tourNote
    });

    setTourSuccess(true);
    setTimeout(() => {
      setTourSuccess(false);
      setShowTourForm(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-0 sm:p-4 md:p-8 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white text-[#111111] shadow-2xl min-h-screen sm:min-h-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Compass style minimal navigation) */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center space-x-6 text-xs uppercase tracking-widest text-neutral-500 font-medium">
            <span>{property.district}</span>
            <span>·</span>
            <span>{property.listingType === 'sale' ? 'FOR SALE' : 'FOR LEASE'}</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="text-xs uppercase tracking-widest font-medium hover:text-black transition"
            >
              {isFavorite ? 'SAVED ★' : 'SAVE PROPERTY'}
            </button>
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-widest font-semibold hover:text-black transition"
              aria-label="Close modal"
            >
              CLOSE ✕
            </button>
          </div>
        </div>

        {/* Hero Gallery (Large High-Res visual first, Sotheby's style) */}
        <div className="w-full bg-neutral-950">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.titleKo}
              className="w-full h-full object-cover object-center"
            />

            {/* Gallery Navigation Arrows if multiple */}
            {property.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                  className="pointer-events-auto p-2 bg-black/40 text-white hover:bg-black/70 transition backdrop-blur-sm text-sm"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
                  className="pointer-events-auto p-2 bg-black/40 text-white hover:bg-black/70 transition backdrop-blur-sm text-sm"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {property.images.length > 1 && (
            <div className="flex overflow-x-auto p-3 gap-2 bg-neutral-900 border-t border-neutral-800">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 flex-shrink-0 overflow-hidden transition-opacity ${
                    idx === activeImageIndex ? 'opacity-100 ring-2 ring-white' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-12 lg:p-16 max-w-4xl mx-auto w-full">
          {/* Header Block: Title, Location, Price */}
          <div className="mb-12 pb-8 border-b border-neutral-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-4xl font-light text-[#111111] tracking-tight mb-2">
                  {property.titleKo}
                </h1>
                <p className="text-sm text-neutral-500 font-light">
                  {property.roadAddress} · {property.district}
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight">
                  {currency === 'USD' 
                    ? formatManwonToUSD(property.price) 
                    : formatPropertyPrice(property.listingType, property.price, property.deposit, property.monthlyRent)
                  }
                </p>
                {currency === 'USD' && (
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    {formatPropertyPrice(property.listingType, property.price, property.deposit, property.monthlyRent)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Key Specifications (Clean Minimalist Key-Value Grid) */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-6">
              KEY SPECIFICATIONS
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-8 text-sm">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">AREA</p>
                <p className="text-base font-medium">{formatArea(property.exclusivePyeong, property.exclusiveAreaM2, unit)}</p>
                <p className="text-xs text-neutral-400">공급 {property.supplyPyeong}평</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">BEDS / BATHS</p>
                <p className="text-base font-medium">{property.rooms} Beds · {property.baths} Baths</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">FLOOR</p>
                <p className="text-base font-medium">{property.floor}F of {property.totalFloors}F</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">PARKING</p>
                <p className="text-base font-medium">{property.parking} Cars</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">DIRECTION</p>
                <p className="text-base font-medium">{property.direction}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">YEAR BUILT</p>
                <p className="text-base font-medium">{property.builtYear}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">MAINTENANCE</p>
                <p className="text-base font-medium">월 {property.maintenanceCost}만원</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">MOVE-IN DATE</p>
                <p className="text-base font-medium">{property.moveInDate}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-6">
              DESCRIPTION
            </p>
            <div className="text-neutral-700 font-light text-base leading-relaxed whitespace-pre-line">
              {property.descriptionKo}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-6">
              FEATURES & AMENITIES
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-neutral-700 font-normal">
              {property.features.map((feat, idx) => (
                <li key={idx} className="flex items-baseline space-x-3">
                  <span className="text-neutral-400">—</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Commute Section */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-6">
              LOCATION & COMMUTE
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-neutral-700">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2">TRANSIT</p>
                <p className="font-medium text-base mb-1">{property.subway.station}</p>
                <p className="text-xs text-neutral-500">도보 {property.subway.walkMinutes}분 · {property.subway.lines.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2">SCHOOL DISTRICT</p>
                <ul className="space-y-2">
                  {property.schools.map((sch, i) => (
                    <li key={i}>
                      <span className="font-medium">{sch.name}</span>
                      <span className="text-xs text-neutral-400 ml-2">({sch.distance} · {sch.ratingNote})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Financial Simulation Accordion (Zillow Mortgage & Tax calculator) */}
          <div className="mb-16 pt-8 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
                  FINANCIAL & TAX ESTIMATE
                </p>
                <h3 className="text-lg font-light mt-1">예상 취득세 및 중개보수 시뮬레이션</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFinanceCalc(!showFinanceCalc)}
                className="text-xs uppercase tracking-widest font-semibold text-neutral-600 hover:text-black transition"
              >
                {showFinanceCalc ? 'HIDE DETAILS ▲' : 'CALCULATE ▼'}
              </button>
            </div>

            {showFinanceCalc && (
              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-6 text-sm animate-in fade-in duration-200">
                <div className="flex items-center space-x-4 text-xs font-medium">
                  <span className="text-neutral-400 uppercase tracking-wider">취득 주택수:</span>
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setHouseCount(num as any)}
                      className={`px-3 py-1 transition ${
                        houseCount === num 
                          ? 'bg-[#111111] text-white' 
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {num === 1 ? '1주택 (기본)' : `${num}주택 (중과)`}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-neutral-800">
                  <div className="p-4 bg-neutral-50">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">예상 취득세액</p>
                    <p className="text-xl font-semibold">{formatManwonToKorean(acquisitionTaxInfo.totalTax)}</p>
                    <p className="text-xs text-neutral-500 mt-1">실효세율 {acquisitionTaxInfo.taxRate}%</p>
                  </div>
                  <div className="p-4 bg-neutral-50">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">법정 중개보수</p>
                    <p className="text-xl font-semibold">{formatManwonToKorean(brokerageInfo.total)}</p>
                    <p className="text-xs text-neutral-500 mt-1">상한요율 {(brokerageInfo.feeRate * 100).toFixed(2)}% (VAT별도)</p>
                  </div>
                  <div className="p-4 bg-neutral-50">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">예상 월 원리금 (LTV 40%)</p>
                    <p className="text-xl font-semibold">{mortgageMonthly.toLocaleString()}만원</p>
                    <p className="text-xs text-neutral-500 mt-1">금리 4.0% · 30년 만기 기준</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tour Booking & Agent Contact (Sotheby's style clean editorial block) */}
          <div className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row gap-12 items-start">
            {/* Agent Info */}
            <div className="w-full md:w-1/3">
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-4">
                LISTING AGENT
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-16 h-16 object-cover grayscale"
                />
                <div>
                  <h4 className="font-semibold text-base">{property.agent.name}</h4>
                  <p className="text-xs text-neutral-500">{property.agent.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">경력 {property.agent.experienceYears}년</p>
                </div>
              </div>
              <div className="text-xs text-neutral-600 space-y-1 font-light">
                <p>Tel: {property.agent.phone}</p>
                <p>Mobile: {property.agent.mobile}</p>
                <p>License: {property.agent.licenseNumber}</p>
              </div>
            </div>

            {/* Tour CTA & Form */}
            <div className="w-full md:w-2/3">
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400 mb-4">
                PRIVATE VIEWING
              </p>
              
              {!showTourForm ? (
                <div>
                  <p className="text-sm font-light text-neutral-600 mb-6 leading-relaxed">
                    프라이빗 1:1 현장 투어를 통해 공간의 건축적 디테일과 한강 조망을 직접 확인하실 수 있습니다. VIP 전담 에이전트가 고객님의 일정에 맞춰 비공개 안내를 진행합니다.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setShowTourForm(true)}
                      className="px-8 py-4 bg-[#111111] text-white text-xs font-medium tracking-widest uppercase hover:bg-neutral-800 transition"
                    >
                      REQUEST A TOUR
                    </button>
                    <a
                      href={`tel:${property.agent.mobile}`}
                      className="px-8 py-4 border border-neutral-300 text-[#111111] text-xs font-medium tracking-widest uppercase hover:border-black transition"
                    >
                      CALL DIRECT
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTourSubmit} className="space-y-4 text-xs animate-in fade-in duration-200">
                  {tourSuccess ? (
                    <div className="py-8 text-center text-sm font-medium text-emerald-800 bg-emerald-50">
                      방문 투어 예약 신청이 완료되었습니다. 담당 에이전트가 빠른 시간 내 연락드립니다.
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-400 mb-1">성함 *</label>
                          <input
                            type="text"
                            required
                            value={tourName}
                            onChange={(e) => setTourName(e.target.value)}
                            placeholder="성함을 입력하세요"
                            className="w-full p-3 border border-neutral-200 focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-400 mb-1">연락처 *</label>
                          <input
                            type="tel"
                            required
                            value={tourPhone}
                            onChange={(e) => setTourPhone(e.target.value)}
                            placeholder="010-0000-0000"
                            className="w-full p-3 border border-neutral-200 focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-400 mb-1">희망 방문일</label>
                          <input
                            type="date"
                            value={tourDate}
                            onChange={(e) => setTourDate(e.target.value)}
                            className="w-full p-3 border border-neutral-200 focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-400 mb-1">희망 시간</label>
                          <select
                            value={tourTime}
                            onChange={(e) => setTourTime(e.target.value)}
                            className="w-full p-3 border border-neutral-200 focus:outline-none focus:border-black"
                          >
                            <option value="오전 10:00">오전 10:00</option>
                            <option value="오후 1:00">오후 1:00</option>
                            <option value="오후 3:00">오후 3:00</option>
                            <option value="오후 5:00">오후 5:00</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-neutral-400 mb-1">요청 사항 (선택)</label>
                        <textarea
                          rows={2}
                          value={tourNote}
                          onChange={(e) => setTourNote(e.target.value)}
                          placeholder="원하시는 투어 조건이나 문의사항을 입력하세요"
                          className="w-full p-3 border border-neutral-200 focus:outline-none focus:border-black"
                        />
                      </div>

                      <div className="flex items-center space-x-4 pt-2">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-[#111111] text-white text-xs font-medium tracking-widest uppercase hover:bg-neutral-800 transition"
                        >
                          CONFIRM TOUR REQUEST
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTourForm(false)}
                          className="text-xs uppercase tracking-widest text-neutral-400 hover:text-black"
                        >
                          CANCEL
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
