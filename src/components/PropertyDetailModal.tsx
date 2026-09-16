import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  GraduationCap, 
  Bus, 
  Car, 
  CheckCircle2, 
  Calculator, 
  Phone, 
  Mail, 
  MessageSquareText, 
  Send, 
  Check, 
  Share2, 
  Heart, 
  Building2, 
  DollarSign, 
  ShieldCheck 
} from 'lucide-react';
import { CurrencyType, Property, UnitType } from '../types';
import { formatPrice, formatArea, calculateMortgage } from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  currency: CurrencyType;
  unit: UnitType;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  currency,
  unit,
  isFavorite,
  onToggleFavorite
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tourType, setTourType] = useState<'in_person' | 'video'>('in_person');
  const [selectedDate, setSelectedDate] = useState('2026-09-20');
  const [selectedTime, setSelectedTime] = useState('오후 2:00');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userKakao, setUserKakao] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNote, setUserNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mortgage Calculator state inside modal
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState<15 | 30>(30);

  const mortgage = calculateMortgage(
    property.price,
    downPaymentPercent,
    interestRate,
    loanTerm,
    property.propertyTaxAnnual,
    property.hoaFeeMonthly
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl my-auto border border-slate-200 relative flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">
              {property.listingType === 'sale' ? '매매' : property.listingType === 'rent' ? '렌트' : '상업용'}
            </span>
            <h2 className="font-bold text-sm sm:text-base text-slate-900 truncate">
              {property.titleKo}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="매물 링크 공유"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="관심 매물 저장"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Photo Gallery with Hero and Thumbnails */}
          <div>
            <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-900 relative shadow-inner">
              <img
                src={property.images[activeImageIndex]}
                alt={property.titleKo}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-full">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-400/40' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`사진 ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Key Specifications Banner */}
          <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {formatPrice(property.price, currency, property.listingType)}
                </span>
                <span className="text-xs text-slate-500 block sm:inline sm:ml-2">
                  {currency === 'USD' 
                    ? `(원화 환산: ${formatPrice(property.price, 'KRW', property.listingType)})` 
                    : `(USD: $${property.price.toLocaleString()})`}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                <span>MLS# <strong className="text-slate-800">{property.mlsNumber}</strong></span>
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-700 mt-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.address}, {property.town}, {property.county} {property.zipCode}</span>
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 font-semibold block">침실 / 욕실</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {property.beds} Beds • {property.baths} Baths
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 font-semibold block">실내 전용 면적</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block truncate">
                  {formatArea(property.sqft, unit)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 font-semibold block">연간 재산세 (Tax)</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {property.propertyTaxAnnual > 0 ? `$${property.propertyTaxAnnual.toLocaleString()}/년` : '해당 없음'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 font-semibold block">월 관리비 (HOA)</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {property.hoaFeeMonthly > 0 ? `$${property.hoaFeeMonthly.toLocaleString()}/월` : '$0 (없음)'}
                </span>
              </div>
            </div>
          </div>

          {/* Two Columns: Left Details, Right Tour & Mortgage */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Detailed Description */}
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  매물 상세 설명 (Korean & English)
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {property.descriptionKo}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 italic leading-relaxed">
                  {property.descriptionEn}
                </div>
              </div>

              {/* Special Features Checklist */}
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  매물 주요 특징 및 시설
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-[10px]">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* School District Information */}
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    배정 학군 및 공립학교 평가
                  </span>
                  <span className="text-xs font-semibold text-slate-400">GreatSchools Rating 기준</span>
                </h3>
                <div className="space-y-2.5">
                  {property.schools.map((school, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{school.name}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            {school.type}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">거리: {school.distance}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-emerald-700">
                          {school.rating}
                          <span className="text-xs font-semibold text-slate-400">/10</span>
                        </span>
                        <span className="block text-[10px] font-bold text-emerald-600">
                          {school.rating >= 9 ? '최우수' : school.rating >= 7 ? '우수' : '양호'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manhattan / NYC Commute analysis */}
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  맨해튼 (NYC) 출퇴근 교통 분석
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100">
                    <span className="font-bold text-blue-900 block">조지워싱턴브릿지 (GWB) 차량 진입</span>
                    <span className="text-lg font-extrabold text-blue-700 mt-1 block">
                      약 {property.commute.gwbDriveMinutes}분 소요
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-100">
                    <span className="font-bold text-indigo-900 block">포트아서리티(PABT) 직통 버스</span>
                    <span className="text-lg font-extrabold text-indigo-700 mt-1 block">
                      약 {property.commute.busToPortAuthorityMinutes}분 소요
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-600 space-y-1">
                  <p>• <strong>경유 버스 노선:</strong> {property.commute.busLines.join(', ')}</p>
                  {property.commute.ferryOrTrain && (
                    <p>• <strong>페리/기차 안내:</strong> {property.commute.ferryOrTrain}</p>
                  )}
                </div>
              </div>

              {/* Built-in Mortgage Calculator for this house */}
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  이 매물의 월 예상 주거 비용 계산기 (Mortgage & Taxes)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      다운페이먼트 (Down Payment): <strong className="text-blue-600">{downPaymentPercent}% (${mortgage.downPaymentAmount.toLocaleString()})</strong>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={50}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      예상 모기지 이자율: <strong className="text-blue-600">{interestRate}%</strong>
                    </label>
                    <input
                      type="range"
                      min={4.0}
                      max={9.0}
                      step={0.25}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">상환 기간 (Loan Term)</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setLoanTerm(30)}
                        className={`flex-1 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
                          loanTerm === 30 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        30년 고정
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoanTerm(15)}
                        className={`flex-1 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
                          loanTerm === 15 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        15년 고정
                      </button>
                    </div>
                  </div>
                </div>

                {/* Monthly cost breakdown */}
                <div className="bg-slate-900 text-white p-4 rounded-xl">
                  <div className="flex items-baseline justify-between mb-3 border-b border-slate-800 pb-2">
                    <span className="text-xs text-slate-300 font-semibold">총 월 예상 주거 비용</span>
                    <span className="text-2xl font-black text-blue-400">
                      ${mortgage.monthlyTotal.toLocaleString()}
                      <span className="text-xs font-normal text-slate-400"> /월</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">원금 & 이자</span>
                      <span className="font-bold text-white">${mortgage.monthlyPrincipalInterest.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">재산세 (월환산)</span>
                      <span className="font-bold text-white">${mortgage.monthlyPropertyTax.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">주택보험 (추정)</span>
                      <span className="font-bold text-white">${mortgage.monthlyInsurance.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">HOA 관리비</span>
                      <span className="font-bold text-white">${mortgage.monthlyHoa.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Tour Booking Form & Agent Profile */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                      담당 중개사
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base">{property.agent.name}</h4>
                    <p className="text-xs text-slate-500">{property.agent.title}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <a
                    href={`tel:${property.agent.phone.replace(/[^0-9]/g, '')}`}
                    className="w-full py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>전화 직통: {property.agent.phone}</span>
                  </a>
                  <div className="w-full py-2 px-3 rounded-lg bg-amber-50 text-amber-900 font-bold flex items-center justify-center gap-2">
                    <MessageSquareText className="w-3.5 h-3.5 text-amber-600" />
                    <span>카톡 상담: {property.agent.kakaoId}</span>
                  </div>
                </div>
              </div>

              {/* Schedule a Tour & Inquiry Form */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  현장 투어 신청 및 매물 문의
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  원하시는 날짜를 선택하시면 담당 에이전트가 1시간 내로 확인 연락을 드립니다.
                </p>

                {isSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2">
                      <Check className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-emerald-900 text-sm">투어 신청이 완료되었습니다!</h5>
                    <p className="text-xs text-emerald-700 mt-1">
                      {userName} 고객님께 {userPhone} 번호로 담당 에이전트가 신속히 안내해 드리겠습니다.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-3 text-xs font-bold text-emerald-800 underline cursor-pointer"
                    >
                      다시 문의하기
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleTourSubmit} className="space-y-3 text-xs">
                    {/* Tour Type Selector */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTourType('in_person')}
                        className={`py-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                          tourType === 'in_person'
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-slate-300 text-slate-700'
                        }`}
                      >
                        현장 방문 투어
                      </button>
                      <button
                        type="button"
                        onClick={() => setTourType('video')}
                        className={`py-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                          tourType === 'video'
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-slate-300 text-slate-700'
                        }`}
                      >
                        실시간 영상 투어
                      </button>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">희망 날짜</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">희망 시간</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 font-medium"
                        >
                          <option>오전 10:00</option>
                          <option>오전 11:30</option>
                          <option>오후 1:00</option>
                          <option>오후 2:00</option>
                          <option>오후 3:30</option>
                          <option>오후 5:00</option>
                        </select>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">성함 *</label>
                      <input
                        type="text"
                        placeholder="예: 홍길동"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">연락처 (미국/한국 전화번호) *</label>
                      <input
                        type="tel"
                        placeholder="예: 201-123-4567 또는 010-XXXX-XXXX"
                        required
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                      />
                    </div>

                    {/* Kakao & Email */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">카카오톡 ID (선택)</label>
                        <input
                          type="text"
                          placeholder="카톡 ID"
                          value={userKakao}
                          onChange={(e) => setUserKakao(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">이메일 (선택)</label>
                        <input
                          type="email"
                          placeholder="email@domain.com"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Additional Note */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">추가 문의 사항</label>
                      <textarea
                        rows={2}
                        placeholder="궁금하신 점이나 선호 조건을 자유롭게 적어주세요."
                        value={userNote}
                        onChange={(e) => setUserNote(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>무료 투어 및 상담 예약하기</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
