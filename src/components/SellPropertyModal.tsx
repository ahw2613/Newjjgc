import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building, ShieldCheck, Sparkles } from 'lucide-react';
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
    if (!name || !phone || !propertyTitle) {
      alert('필수 입력 항목(성함, 연락처, 매물명)을 기재해 주세요.');
      return;
    }

    onSubmitInquiry({
      name,
      phone,
      type: 'sell_request',
      propertyTitle,
      targetRegion: region,
      budget: desiredPrice,
      notes: `[매도/임대의뢰] 단지명/소재지: ${propertyTitle}, 거래형태: ${listingType}, 유형: ${propertyType}, 면적: ${pyeong}평, 희망가: ${desiredPrice}, 비고: ${notes}`
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="sell-property-modal"
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">내 집 내놓기 (전속 매도·임대 의뢰)</h3>
              <p className="text-[11px] text-slate-400">전문 공간 사진 무료 촬영 & KB 빅데이터 기반 정밀 CMA 시세 감정</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-slate-800">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950">매도 의뢰가 성공적으로 접수되었습니다</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                소유자님의 소중한 자산 정보를 확인하여 전담 수석 공인중개사가 1시간 이내에 직접 유선으로 정밀 시세 분석 보고서와 향후 마케팅 플랜을 안내해 드립니다.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-3 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
              >
                확인 및 닫기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>소유자님의 개인정보 및 매물 주소는 철저히 보안 암호화 관리됩니다.</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">소유자 성함 *</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">연락처 *</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">매물 소재지 (단지명 및 동호수) *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 한남더힐 105동 로열층, 아크로서울포레스트 B동"
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">소재 권역</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs"
                  >
                    <option value="용산/한남">용산/한남</option>
                    <option value="강남/청담">강남/청담</option>
                    <option value="성동/성수">성동/성수</option>
                    <option value="서초/반포">서초/반포</option>
                    <option value="송파/잠실">송파/잠실</option>
                    <option value="광주/봉선">광주/봉선</option>
                    <option value="기타/상업용">기타/상업용</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">거래 형태</label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs"
                  >
                    <option value="sale">매매</option>
                    <option value="jeonse">전세</option>
                    <option value="rent">월세</option>
                    <option value="commercial">상업용빌딩</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">매물 유형</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs"
                  >
                    <option value="apartment">아파트</option>
                    <option value="luxury_villa">고급빌라</option>
                    <option value="officetel">오피스텔</option>
                    <option value="house">단독주택</option>
                    <option value="commercial">상업용빌딩</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">희망 거래가 (만원 or 억)</label>
                  <input
                    type="text"
                    placeholder="예: 65억원 or 협의"
                    value={desiredPrice}
                    onChange={(e) => setDesiredPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">전용 면적 (평형)</label>
                  <input
                    type="text"
                    placeholder="예: 60평 (200㎡)"
                    value={pyeong}
                    onChange={(e) => setPyeong(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">매도 사유 및 요청사항 (선택)</label>
                <textarea
                  rows={3}
                  placeholder="대외 비공개 매칭 희망 여부, 세안고 매매, 명도 일정 등을 기재해 주세요."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>무료 감정 & 매도 의뢰 접수</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
