import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Building, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenSellModal: () => void;
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalculator,
  onOpenSellModal,
  onOpenAdminModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Banner: Guarantee & Trust */}
      <div className="border-b border-slate-900 py-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">한국공인중개사협회 손해배상보증 20억원 공식 가입</p>
              <p className="text-[11px] text-slate-400">철저한 권리분석 및 실매물 100% 검증으로 안전한 하이엔드 거래를 보증합니다.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCalculator}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
            >
              취득세·대출 계산기
            </button>
            <button
              onClick={onOpenSellModal}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition"
            >
              내 집 내놓기
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white font-['Cinzel',serif]">
                THE ADDRESS
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                프리미엄 부동산
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              디 어드레스(THE ADDRESS)는 한남, 청담, 반포, 성수 등 대한민국 최상위 0.1% 하이엔드 주거 자산과 핵심 상업용 빌딩의 전속 중개 및 매입매각 자문을 수행하는 부동산 전문 파트너입니다.
            </p>
            <div className="pt-2">
              <button
                id="btn-footer-admin"
                onClick={onOpenAdminModal}
                className="text-[11px] text-slate-400 hover:text-amber-400 underline underline-offset-4"
              >
                관리자 CMS 콘솔 (Admin Demo)
              </button>
            </div>
          </div>

          {/* District Portfolios */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              핵심 주거 권역 컬렉션
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• 한남동 (한남더힐 · 나인원한남 · 유엔빌리지)</li>
              <li>• 청담 · 압구정 (에테르노청담 · PH129 · 현대)</li>
              <li>• 성수동 (아크로서울포레스트 · 갤러리아포레)</li>
              <li>• 반포동 (아크로리버파크 · 래미안원베일리)</li>
              <li>• 잠실동 (롯데월드타워 시그니엘 레지던스)</li>
              <li>• 광주 봉선동 (한국아델리움 · 포스코더샵)</li>
            </ul>
          </div>

          {/* Quick Services */}
          <div className="md:col-span-2 space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              프리미엄 자문 서비스
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#services-section" className="hover:text-white transition">VIP 프라이빗 매칭</a></li>
              <li><a href="#services-section" className="hover:text-white transition">내 집 내놓기 (전속매도)</a></li>
              <li><a href="#services-section" className="hover:text-white transition">상업용 사옥 빌딩 자문</a></li>
              <li><a href="#services-section" className="hover:text-white transition">취득세·양도세 절세 컨설팅</a></li>
              <li><a href="#locations-section" className="hover:text-white transition">권역별 실거래 시세 리포트</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              고객센터 & VIP 라운지
            </h5>
            <p className="text-lg font-black text-white">02-588-7740</p>
            <p className="text-xs text-slate-400">운영시간: 09:00 ~ 21:00 (연중무휴)</p>
            <p className="text-xs text-slate-400">VIP 전용 이메일: vip@theaddress.co.kr</p>
            <div className="pt-2">
              <span className="inline-block text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 border border-slate-800">
                100% 프라이빗 사전 예약제
              </span>
            </div>
          </div>
        </div>

        {/* Real Estate Law Mandatory Disclosures */}
        <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p className="text-slate-300 font-semibold">
            (주)디 어드레스 부동산 중개법인 | 대표 공인중개사: 강태양 | 사업자등록번호: 214-88-94102 | 중개사무소 등록번호: 제11680-2018-00214호
          </p>
          <p>
            본사: 서울특별시 강남구 테헤란로 152 강남파이낸스센터 28층 | 한남 VIP 라운지: 서울특별시 용산구 독서당로 111
          </p>
          <p>
            한국공인중개사협회 공제증서 20억원 가입 | 통신판매업신고: 제2024-서울강남-03140호
          </p>
          <p className="text-slate-400 pt-2">
            * 디 어드레스의 모든 게시물 및 매물 데이터는 공인중개사법에 의거하여 현장 실사 및 공부 검증을 완료한 정직한 실매물입니다. 허위 매물 신고 시 즉시 확인 조치됩니다.
          </p>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-8 pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 THE ADDRESS Real Estate Group. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition"
            >
              <span>맨 위로</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
