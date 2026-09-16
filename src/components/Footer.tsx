import React from 'react';
import { Building2, Shield, Heart, Phone, Mail, MapPin, ExternalLink, Info } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenMortgageModal: () => void;
  onOpenSellModal: () => void;
  onSelectListingType: (type: 'all' | 'sale' | 'rent' | 'commercial') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToSection,
  onOpenMortgageModal,
  onOpenSellModal,
  onSelectListingType
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Prototype Disclaimer Banner */}
      <div className="bg-amber-950/60 border-b border-amber-900/50 py-2.5 px-4 text-center text-amber-300 font-medium">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>[초기 프로토타입 안내]</strong> 본 웹사이트의 로고, 상호, 연락처 및 공인중개사 정보는 제작 검토를 위한 임시 더미 데이터입니다. 실제 오픈 시 정식 업체 정보로 대체됩니다.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">NJ STREET REALTY</span>
                <span className="text-xs text-slate-400">뉴저지 스트리트 부동산 포털</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              뉴저지 버겐카운티(포트리, 팰팍, 테너플라이, 클로스터, 에지워터) 및 허드슨카운티 
              주택 매매, 렌트, 상업용 부동산, 학군 상담 전문 부동산 포털입니다.
            </p>

            <div className="space-y-1.5 text-slate-400 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>1234 Lemoine Ave, Suite 200, Fort Lee, NJ 07024 (임시 주소)</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>대표전화: 201-555-0199 | 팩스: 201-555-0198</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>이메일: contact@njstreet-demo.com</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Category Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">매물 검색 바로가기</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectListingType('sale');
                    onScrollToSection('listings-section');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  뉴저지 주택 매매 (Buy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectListingType('rent');
                    onScrollToSection('listings-section');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  아파트 / 콘도 렌트 (Rent)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectListingType('commercial');
                    onScrollToSection('listings-section');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  상업용 / 비즈니스 (Commercial)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('towns-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  지역별 타운 매물 찾기
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tools & Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">부동산 툴 & 가이드</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenMortgageModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  모기지 & 월 납입금 계산기
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSellModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  내 집 팔기/렌트 무료 시세 감정
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('towns-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  버겐카운티 공립 학군 안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('insights-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  뉴저지 재산세 및 세무 상식
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Disclaimers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">라이선스 & 규정</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              New Jersey Real Estate Commission 라이선스 규정을 준수합니다.
            </p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Equal Housing Opportunity</span>
              </div>
              <p className="text-slate-400">
                인종, 피부색, 종교, 국적, 성별, 장애 유무에 따른 차별 없이 평등한 주거 기회를 보장합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & NJMLS Notice */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            © 2026 NJ Street Realty. All Rights Reserved. (초기 데모 프로토타입)
          </p>
          <div className="flex items-center gap-4">
            <span>NJ MLS Data Exchange</span>
            <span>•</span>
            <span>이용약관</span>
            <span>•</span>
            <span>개인정보처리방침</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
