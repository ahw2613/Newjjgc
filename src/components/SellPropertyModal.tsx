import React, { useState } from 'react';
import { ConsultationInquiry, ListingType, PropertyType } from '../types';

interface SellPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiry: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const SellPropertyModal: React.FC<SellPropertyModalProps> = ({
  isOpen,
  onClose,
  onSubmitInquiry
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [region, setRegion] = useState('용산/한남');
  const [listingType, setListingType] = useState<ListingType>('sale');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [pyeong, setPyeong] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !propertyTitle) return;

    onSubmitInquiry({
      name,
      phone,
      type: 'sell_request',
      propertyTitle,
      targetRegion: region,
      budget: desiredPrice,
      notes: `[매도/임대의뢰] 단지명: ${propertyTitle}, 거래형태: ${listingType}, 유형: ${propertyType}, 면적: ${pyeong}평, 희망가: ${desiredPrice}, 비고: ${notes}`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="sell-property-modal"
        className="relative w-full max-w-xl bg-white text-[#111111] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-light tracking-wide uppercase">
              REPRESENT YOUR PROPERTY
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              소유 부동산 전속 매도 및 임대 가치평가 의뢰
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest font-semibold hover:opacity-60 transition"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs">
          {submitted ? (
            <div className="py-16 text-center text-sm font-medium text-emerald-800 bg-emerald-50">
              매도 의뢰가 정상 접수되었습니다. 전담 시니어 에이전트가 24시간 내 연락드립니다.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1 font-medium">성함 *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="소유주 성함"
                    className="w-full p-3 border border-neutral-200 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1 font-medium">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full p-3 border border-neutral-200 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-400 mb-1 font-medium">단지명 또는 부동산 주소 *</label>
                <input
                  type="text"
                  required
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  placeholder="예: 한남더힐 85평형, 청담 PH129 등"
                  className="w-full p-3 border border-neutral-200 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1 font-medium">거래 형태</label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value as any)}
                    className="w-full p-3 border border-neutral-200 text-sm bg-white focus:outline-none focus:border-black"
                  >
                    <option value="sale">매매 의뢰</option>
                    <option value="jeonse">전세 의뢰</option>
                    <option value="rent">월세 임대</option>
                    <option value="commercial">상업용 빌딩 매각</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1 font-medium">희망 가격 (억 원)</label>
                  <input
                    type="text"
                    value={desiredPrice}
                    onChange={(e) => setDesiredPrice(e.target.value)}
                    placeholder="예: 75억, 보증금 30억 등"
                    className="w-full p-3 border border-neutral-200 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-400 mb-1 font-medium">비고 및 요청사항</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="현재 점유 상태, 희망 매도 시기, 비공개 진행 여부 등을 적어주세요."
                  className="w-full p-3 border border-neutral-200 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#111111] text-white text-xs font-medium tracking-widest uppercase hover:bg-neutral-800 transition"
                >
                  SUBMIT VALUATION REQUEST
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
