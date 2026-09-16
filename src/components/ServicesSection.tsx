import React from 'react';
import { 
  Building2, 
  Send, 
  KeyRound, 
  Briefcase, 
  Scale, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenSellModal: () => void;
  onOpenVipConsultModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenSellModal,
  onOpenVipConsultModal
}) => {
  const services = [
    {
      icon: Send,
      title: '내 집 내놓기 (전속 매도·임대)',
      subtitle: '프리미엄 사진 촬영 및 빅데이터 기반 최적 매도가 산출',
      desc: '소유자님의 소중한 자산을 가치 있게 평가합니다. 전문 사진작가의 하이엔드 공간 촬영, 타깃 VIP 매수자 네트워크 매칭, 허위 매물 방지 계약까지 원스톱으로 책임집니다.',
      points: ['전문 스튜디오 공간 촬영 무료 지원', 'KB부동산 및 실거래 빅데이터 기반 CMA 보고서 제공', '네이버부동산 및 하이엔드 포털 상위 노출'],
      ctaLabel: '무료 가치평가 의뢰하기',
      action: onOpenSellModal,
      highlight: true
    },
    {
      icon: KeyRound,
      title: 'VIP 프라이빗 오프마켓 매칭',
      subtitle: '대외 비공개 매물 매수 및 1:1 맞춤 브리핑',
      desc: '정재계 인사, 연예인, 글로벌 자산가 분들을 위한 철저한 비밀 보장 서비스입니다. 시장에 공개되지 않은 한남·청담 펜트하우스 및 대저택을 독점 매칭해드립니다.',
      points: ['100% 비공개 NDA(비밀유지협약) 체결', '전담 파트너 1:1 방문 단독 브리핑', '금융자산가별 맞춤형 포트폴리오 제안'],
      ctaLabel: 'VIP 비밀상담 신청',
      action: onOpenVipConsultModal,
      highlight: false
    },
    {
      icon: Briefcase,
      title: '상업용 빌딩 & 기업 사옥 이전',
      subtitle: '테헤란로, 성수, 판교 핵심 상업용 부동산 매입·매각',
      desc: '연면적 300평 이상의 대형 사옥, 메디컬 빌딩, 수익형 근생 빌딩의 매입매각 자문을 수행합니다. 임대수익률 분석, 명도 컨설팅, 밸류애드 리모델링 플랜을 제시합니다.',
      points: ['수익률 및 공실 리스크 사전 실사', '기업 이전 감정평가 및 법인 자금플랜', '매입 후 책임 임대전속 관리'],
      ctaLabel: '빌딩 컨설팅 문의',
      action: onOpenVipConsultModal,
      highlight: false
    },
    {
      icon: Scale,
      title: '부동산 세무 & 법률 종합 자산관리',
      subtitle: '대형 회계법인 및 로펌 출신 전문 자문단 제휴',
      desc: '고가 주택 및 상업용 빌딩 거래 시 발생하는 양도소득세, 취득세 중과, 증여·상속세 절세 솔루션을 세무사·변호사와 함께 다각도로 설계해 드립니다.',
      points: ['증여 vs 매매 절세 시뮬레이션', '자금조달계획서 소명 완벽 대비', '주택수 산정 및 법인 취득 자문'],
      ctaLabel: '세무·법률 자문 요청',
      action: onOpenVipConsultModal,
      highlight: false
    }
  ];

  return (
    <section id="services-section" className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prestige Advisory Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            오직 고객만을 위한 4대 프리미엄 전속 서비스
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            단순한 중개를 넘어, 고객의 부동산 자산 가치를 극대화하는 맞춤형 자산관리 파트너십을 약속합니다.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  srv.highlight
                    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border-amber-500/40 shadow-xl shadow-amber-500/5'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
                    {srv.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6">
                    {srv.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {srv.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={srv.action}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 ${
                    srv.highlight
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{srv.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
