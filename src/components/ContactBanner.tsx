import React, { useState } from 'react';
import { Phone, MessageSquareText, Mail, Send, CheckCircle, ShieldCheck } from 'lucide-react';

export const ContactBanner: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('매매 상담');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact-banner" className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Info */}
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
              CONSULTATION & INQUIRY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              뉴저지 내 집 마련 & 투자,<br />
              <span className="text-blue-400">1:1 맞춤형 전문가 무료 상담</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              복잡한 뉴저지 부동산 거래, 학군 선택, 모기지 승인부터 클로징까지 
              검증된 한인 베테랑 공인중개사가 정직하고 세심하게 동행합니다.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a
                href="tel:2015550199"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">실시간 전화 상담 (주 7일)</span>
                  <span className="text-lg font-bold text-white">201-555-0199 (임시 대표번호)</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 shrink-0">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">카카오톡 실시간 1:1 채팅</span>
                  <span className="text-base font-bold text-white">njstreet_realestate</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">이메일 문의</span>
                  <span className="text-base font-bold text-white">contact@njstreet-demo.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Quick Inquiry Form */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-1">빠른 상담 문의 신청</h3>
            <p className="text-xs text-slate-500 mb-5">
              원하시는 조건이나 궁금하신 점을 남겨주시면 담당자가 신속히 답변드립니다.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-3 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">상담 신청이 성공적으로 접수되었습니다!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {name} 고객님께 빠른 시일 내로 안내 연락을 드리겠습니다. 감사합니다.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-emerald-700 underline cursor-pointer"
                >
                  새로운 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">상담 분야</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium"
                  >
                    <option>뉴저지 주택 매매 (Buy Home)</option>
                    <option>아파트/콘도 렌트 (Rent)</option>
                    <option>상업용 부동산/비즈니스 (Commercial)</option>
                    <option>내 집 팔기/렌트 주기 (Sell/Lease)</option>
                    <option>학군 및 지역 이주 상담 (Relocation)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">성함 *</label>
                    <input
                      type="text"
                      required
                      placeholder="성함을 입력해주세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">전화번호 *</label>
                    <input
                      type="tel"
                      required
                      placeholder="201-000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">문의 내용 및 희망 조건</label>
                  <textarea
                    rows={3}
                    placeholder="예: 포트리 2베드 콘도 매매 찾고 있습니다. 예산 80만불 내외, 오픈하우스 일정 알고 싶습니다."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>상담 신청서 전송</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>입력하신 개인정보는 상담 목적으로만 안전하게 보관됩니다.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
