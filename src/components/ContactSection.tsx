import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ChevronDown, MessageSquare, Sparkles } from 'lucide-react';
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
  const [budget, setBudget] = useState('50억~100억');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('성함과 연락처를 입력해주세요.');
      return;
    }

    onSubmitInquiry({
      name,
      phone,
      email,
      type,
      targetRegion,
      budget,
      notes: notes || '1:1 VIP 상담 신청'
    });

    setSubmitted(true);
  };

  const faqs = [
    {
      q: '자금조달계획서 및 입증 증빙 자료 작성을 지원해주시나요?',
      a: '네, 디 어드레스는 규제지역 및 고가주택 거래 시 필수적인 자금조달계획서 작성 및 금융 거래내역 소명 준비를 전담 세무 자문단과 함께 1:1로 밀착 작성 지원해 드립니다.'
    },
    {
      q: '대외적으로 비공개된 오프마켓 매물도 매수 의뢰가 가능한가요?',
      a: '네, 입주민의 프라이버시를 위해 인터넷에 노출되지 않는 한남·청담 펜트하우스 및 테헤란로 사옥 매물을 다수 보유하고 있습니다. 비밀유지협약(NDA) 체결 후 단독 브리핑을 진행합니다.'
    },
    {
      q: '보유 중인 주택의 매도 의뢰 시 어떤 프리미엄 혜택이 제공되나요?',
      a: '하이엔드 전문 건축 사진작가의 세대 내부 촬영, KB부동산 및 국토부 빅데이터 기반 CMA 정밀 시세 보고서 제공, 그리고 VIP 자산가 매수자 풀에 최우선 비공개 매칭을 지원합니다.'
    },
    {
      q: '법인 명의로 고가 주택 또는 상업용 빌딩 매입 시 세무 컨설팅이 가능한가요?',
      a: '법인 취득세율(12%) 적용 여부, 임대수익 배당 플랜, 법인세 및 향후 매각 차익에 대한 출구 전략을 제휴 회계법인과 연계하여 사전 검토해 드립니다.'
    }
  ];

  return (
    <section id="contact-section" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Private VIP Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            1:1 프라이빗 자산 상담 예약
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            고객님의 자산 가치와 프라이버시를 최우선으로 생각합니다. 편안하신 시간과 방식으로 상담을 예약해 주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Consultation Booking Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              <span>상담 신청서 작성</span>
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">상담 예약이 접수되었습니다</h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  고객님의 상담 내용이 안전하게 암호화되어 전담 파트너에게 전달되었습니다. 
                  남겨주신 연락처로 1시간 이내에 전담 공인중개사가 직접 정중히 연락드리겠습니다.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
                >
                  추가 문의 접수하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">고객명 (성함) *</label>
                    <input
                      type="text"
                      required
                      placeholder="성함을 입력해주세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">이메일 주소 (선택)</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">상담 분야</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                    >
                      <option value="consultation">일반 매수/매도 상담</option>
                      <option value="vip_matching">VIP 비공개 매물 매칭</option>
                      <option value="tour">단지 현장 투어 동행</option>
                      <option value="sell_request">소유 부동산 매도 의뢰</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">관심 권역</label>
                    <select
                      value={targetRegion}
                      onChange={(e) => setTargetRegion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                    >
                      <option value="용산/한남">용산 · 한남동</option>
                      <option value="강남/청담">강남 · 청담 · 압구정</option>
                      <option value="성동/성수">성동 · 성수 서울숲</option>
                      <option value="서초/반포">서초 · 반포 한강</option>
                      <option value="송파/잠실">송파 · 잠실</option>
                      <option value="광주/봉선">광주 · 봉선동</option>
                      <option value="상업용빌딩">상업용 빌딩·사옥</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">예상 예산 규모</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                    >
                      <option value="30억 이하">30억원 이하</option>
                      <option value="30억~50억">30억 ~ 50억원</option>
                      <option value="50억~100억">50억 ~ 100억원</option>
                      <option value="100억 이상">100억원 이상</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">상세 문의 사항 (선택)</label>
                  <textarea
                    rows={3}
                    placeholder="원하시는 주거 형태, 입주 시기, 특약 조건 등을 자유롭게 기재해 주세요."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>1:1 VIP 상담 신청 완료</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Office Locations & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Offices Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>오피스 및 VIP 라운지 안내</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block text-xs">강남 본사 (GFC 라운지)</span>
                  <p className="mt-1 text-slate-500">서울특별시 강남구 테헤란로 152 강남파이낸스센터 28층</p>
                  <p className="text-[11px] text-amber-700 mt-1">2호선 역삼역 지하 직결 / VIP 발렛 파킹 제공</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block text-xs">한남 VIP 프라이빗 라운지</span>
                  <p className="mt-1 text-slate-500">서울특별시 용산구 독서당로 111 (한남동)</p>
                  <p className="text-[11px] text-amber-700 mt-1">사전 예약 방문 전용 / 프라이빗 룸 완비</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>대표전화: 02-588-7740</span>
                </div>
                <span className="text-emerald-700 font-semibold">연중무휴 (09:00 ~ 21:00)</span>
              </div>
            </div>

            {/* Accordion FAQ Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-base font-bold text-slate-900 mb-2">자주 묻는 질문 (FAQ)</h4>
              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-3 text-xs font-bold text-slate-800 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-3 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
