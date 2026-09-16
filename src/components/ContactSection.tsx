import React, { useState } from 'react';
import { ConsultationInquiry } from '../types';

interface ContactSectionProps {
  onSubmitInquiry: (inquiry: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSubmitInquiry }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'consultation' | 'tour' | 'sell_request' | 'vip_matching'>('consultation');
  const [targetRegion, setTargetRegion] = useState('용산/한남');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onSubmitInquiry({
      name,
      phone,
      email,
      type,
      targetRegion,
      notes: notes || '1:1 VIP 상담 요청'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-24 lg:py-36 bg-white text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Direct Contact & Lounge */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-3">
                GET IN TOUCH
              </p>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight mb-6">
                Connect with an Advisor.
              </h2>
              <p className="text-sm font-light text-neutral-600 leading-relaxed mb-12">
                모든 상담은 비공개 원칙으로 진행되며, 부동산 매입·매각·임대차 및 세무 법률 자문 등 원하시는 분야의 전담 파트너가 24시간 내 직접 연락드립니다.
              </p>

              <div className="space-y-6 text-xs text-neutral-600 font-light">
                <div>
                  <p className="uppercase tracking-widest text-neutral-400 font-semibold mb-1">MAIN LOUNGE</p>
                  <p className="text-sm font-normal text-neutral-900">서울특별시 강남구 압구정로 421 디 어드레스 라운지 4F</p>
                </div>
                <div>
                  <p className="uppercase tracking-widest text-neutral-400 font-semibold mb-1">HANNAM PRIVATE OFFICE</p>
                  <p className="text-sm font-normal text-neutral-900">서울특별시 용산구 한남대로 91 한남더힐 단지상가 2F</p>
                </div>
                <div>
                  <p className="uppercase tracking-widest text-neutral-400 font-semibold mb-1">DIRECT INQUIRIES</p>
                  <p className="text-sm font-normal text-neutral-900">02-588-7740 · contact@theaddress.co.kr</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-100 text-[11px] text-neutral-400">
              평일 09:00 - 18:00 (사전 예약 시 주말 및 야간 프라이빗 브리핑 가능)
            </div>
          </div>

          {/* Right Column: Clean Architectural Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-neutral-50 text-center animate-in fade-in duration-300">
                <h3 className="text-2xl font-light mb-3">Inquiry Received.</h3>
                <p className="text-sm font-light text-neutral-600 max-w-md leading-relaxed">
                  상담 신청이 정상 접수되었습니다. 고객님의 담당 시니어 에이전트가 빠른 시간 내 직접 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2 font-medium">성함 *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="성함을 입력하세요"
                      className="w-full px-4 py-3.5 border border-neutral-200 focus:outline-none focus:border-black text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2 font-medium">연락처 *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3.5 border border-neutral-200 focus:outline-none focus:border-black text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2 font-medium">이메일 (선택)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3.5 border border-neutral-200 focus:outline-none focus:border-black text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-2 font-medium">상담 유형</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full px-4 py-3.5 border border-neutral-200 focus:outline-none focus:border-black text-sm transition-colors bg-white cursor-pointer"
                    >
                      <option value="consultation">매수 및 매칭 상담</option>
                      <option value="sell_request">소유 매물 매도/임대 의뢰</option>
                      <option value="tour">특정 매물 방문 투어</option>
                      <option value="vip_matching">VIP 비공개 오프마켓 상담</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-2 font-medium">관심 권역</label>
                  <select
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    className="w-full px-4 py-3.5 border border-neutral-200 focus:outline-none focus:border-black text-sm transition-colors bg-white cursor-pointer"
                  >
                    <option value="용산/한남">용산 · 한남동</option>
                    <option value="강남/청담">강남 · 청담 · 압구정</option>
                    <option value="성동/성수">성동 · 성수 (서울숲)</option>
                    <option value="서초/반포">서초 · 반포 한강</option>
                    <option value="송파/잠실">송파 · 잠실</option>
                    <option value="광주/봉선">광주 · 봉선동</option>
                    <option value="전체">기타 및 전국 상담</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-2 font-medium">상담 요청 내용 (선택)</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="희망하시는 평형, 예산 범위, 입주 시기 등 세부 조건을 기재해주시면 더욱 정확한 브리핑이 가능합니다."
                    className="w-full px-4 py-3.5 border border-neutral-200 focus:outline-none focus:border-black text-sm transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-[#111111] text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors"
                  >
                    SUBMIT INQUIRY
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
