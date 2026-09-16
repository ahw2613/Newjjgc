import React, { useState } from 'react';
import { X, Home, Send, Check, ShieldCheck, Building2, Phone, Calendar } from 'lucide-react';

interface SellPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellPropertyModal: React.FC<SellPropertyModalProps> = ({
  isOpen,
  onClose
}) => {
  const [address, setAddress] = useState('');
  const [town, setTown] = useState('포트리 (Fort Lee)');
  const [propertyType, setPropertyType] = useState('single_family');
  const [intention, setIntention] = useState<'sell' | 'rent'>('sell');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2.5');
  const [timeline, setTimeline] = useState('1~3개월 이내');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerKakao, setOwnerKakao] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !ownerName.trim() || !ownerPhone.trim()) {
      alert('주소, 성함, 연락처를 입력해 주세요.');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-auto border border-slate-200 relative">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">내 집 팔기 / 렌트 놓기 무료 가치평가 의뢰</h3>
              <p className="text-xs text-slate-400">버겐카운티 전문 중개사의 실거래가 기반 무료 시세 감정</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-slate-900">매물 무료 감정 신청이 접수되었습니다!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {ownerName} 님의 주택({address})에 대한 최근 인근 실거래 분석 보고서(CMA)를 준비하여
                입력해주신 연락처({ownerPhone})로 24시간 내 연락드리겠습니다.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                확인 및 닫기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Intention Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIntention('sell')}
                  className={`py-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                    intention === 'sell'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-300 text-slate-700'
                  }`}
                >
                  🏡 주택 매매 (집 팔기)
                </button>
                <button
                  type="button"
                  onClick={() => setIntention('rent')}
                  className={`py-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                    intention === 'rent'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-300 text-slate-700'
                  }`}
                >
                  🔑 세입자 구하기 (렌트 놓기)
                </button>
              </div>

              {/* Property Address & Town */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">매물 도로명 주소 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 123 Main St, Apt 4B"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">소재 타운 (City/Town) *</label>
                  <select
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
                  >
                    <option value="포트리 (Fort Lee)">포트리 (Fort Lee)</option>
                    <option value="팰리세이즈 파크 (Palisades Park)">팰리세이즈 파크 (Palisades Park)</option>
                    <option value="테너플라이 (Tenafly)">테너플라이 (Tenafly)</option>
                    <option value="클로스터 (Closter)">클로스터 (Closter)</option>
                    <option value="크레스킬 (Cresskill)">크레스킬 (Cresskill)</option>
                    <option value="에지워터 (Edgewater)">에지워터 (Edgewater)</option>
                    <option value="릿지우드 (Ridgewood)">릿지우드 (Ridgewood)</option>
                    <option value="잉글우드 클리프 (Englewood Cliffs)">잉글우드 클리프 (Englewood Cliffs)</option>
                    <option value="기타 버겐/허드슨 카운티">기타 뉴저지 지역</option>
                  </select>
                </div>
              </div>

              {/* Specs & Timeline */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">주택 유형</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  >
                    <option value="single_family">단독주택 (Single Family)</option>
                    <option value="condo_townhouse">콘도 / 타운하우스</option>
                    <option value="multi_family">다가구 (2-Family)</option>
                    <option value="commercial">상업용 건물/점포</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">침실 / 욕실</label>
                  <input
                    type="text"
                    placeholder="3 beds / 2 baths"
                    value={`${beds} 베드 / ${baths} 배스`}
                    onChange={(e) => {}}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">희망 진행 시기</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  >
                    <option value="즉시 진행 가능">즉시 진행 희망</option>
                    <option value="1~3개월 이내">1~3개월 이내</option>
                    <option value="3~6개월 후">3~6개월 후</option>
                    <option value="시세 파악 목적">단순 시세 파악</option>
                  </select>
                </div>
              </div>

              {/* Owner Contact */}
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-900 text-xs block mb-2">소유주 연락처 정보</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">성함 *</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 김철수"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">전화번호 *</label>
                    <input
                      type="tel"
                      required
                      placeholder="201-123-4567"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">카카오톡 ID (선택)</label>
                    <input
                      type="text"
                      placeholder="카톡 ID"
                      value={ownerKakao}
                      onChange={(e) => setOwnerKakao(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">이메일 (선택)</label>
                    <input
                      type="email"
                      placeholder="email@address.com"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>무료 실거래가 시세 감정 신청하기</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>개인정보는 엄격히 보호되며, 일체의 강요나 수수료 없이 무료로 제공됩니다.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
