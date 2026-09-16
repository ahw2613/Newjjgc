import React from 'react';

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
    <footer className="bg-[#111111] text-neutral-400 text-xs py-20 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Brand & Main Links (Sotheby's style clean editorial structure) */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 pb-16 border-b border-neutral-800/80">
          <div>
            <span className="text-xl font-semibold tracking-[0.25em] text-white uppercase block mb-3">
              THE ADDRESS
            </span>
            <p className="text-neutral-500 font-light max-w-sm text-xs leading-relaxed">
              Prime domestic and global luxury residential and commercial advisory.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 text-xs uppercase tracking-widest font-medium text-neutral-300">
            <button
              onClick={() => {
                const elem = document.getElementById('properties-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              PROPERTIES
            </button>
            <button
              onClick={onOpenSellModal}
              className="hover:text-white transition-colors"
            >
              SELL
            </button>
            <button
              onClick={onOpenCalculator}
              className="hover:text-white transition-colors"
            >
              CALCULATOR
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('about-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('contact-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              CONTACT
            </button>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors"
            >
              TOP ↑
            </button>
          </div>
        </div>

        {/* Legal Disclosures (Required by Korean Real Estate Brokerage Act) */}
        <div className="py-12 border-b border-neutral-800/80 space-y-3 font-light text-[11px] leading-relaxed text-neutral-500">
          <p className="text-neutral-400 font-normal">
            디 어드레스 부동산중개법인 주식회사 (THE ADDRESS Real Estate Co., Ltd.)
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>대표: 강태양</span>
            <span>중개등록번호: 제11680-2018-00214호</span>
            <span>사업자등록번호: 211-88-09142</span>
            <span>한국공인중개사협회 20억원 손해배상책임보증보험 가입</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>소재지: 서울특별시 강남구 압구정로 421 4층</span>
            <span>대표전화: 02-588-7740</span>
            <span>팩스: 02-588-7749</span>
            <span>이메일: contact@theaddress.co.kr</span>
          </div>
          <p className="pt-2 text-neutral-600">
            디 어드레스는 공인중개사법을 준수하며, 등록된 모든 매물은 100% 실소유자 및 전속 대리인의 확인을 거친 실매물입니다. 무단 전재 및 재배포를 금합니다.
          </p>
        </div>

        {/* Bottom Copyright & Admin Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-600 font-light">
          <p>© {new Date().getFullYear()} THE ADDRESS. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-400 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">Terms of Service</span>
            <button
              onClick={onOpenAdminModal}
              className="hover:text-neutral-300 transition uppercase tracking-widest text-[10px]"
            >
              Admin Console
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
