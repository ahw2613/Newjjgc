import React, { useState } from 'react';
import { BookOpen, ArrowRight, X, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  image: string;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'school-ranking-2026',
    title: '2026 뉴저지 버겐카운티 명문 공립 학군(Blue Ribbon) 종합 순위 분석',
    category: '학군 & 교육 가이드',
    readTime: '5분 소요',
    date: '2026. 08. 15',
    summary: '테너플라이, 크레스킬, 노던밸리(클로스터/데마레스트), 릿지우드 고등학교의 최신 대학 진학률과 학군별 장단점 심층 비교.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    content: [
      '뉴저지 버겐카운티(Bergen County)는 미국 전체에서도 손꼽히는 우수한 공립학교 시스템을 갖추고 있어 자녀 교육을 최우선으로 고려하는 한인 학부모들의 선호도가 가장 높은 지역입니다.',
      '1. 테너플라이 학군 (Tenafly Public Schools): 전통적으로 버겐카운티 1위 자리를 굳건히 지키고 있으며, 아이비리그 진학률과 AP 과목 수강률이 뉴저지 최상위권입니다. 단독주택 위주의 학군으로 안정적인 면학 분위기가 강점입니다.',
      '2. 노던밸리 리저널 학군 (NVRHS Demarest & Old Tappan): 클로스터, 크레스킬, 하워스, 노우드 지역 학생들이 진학하는 학군으로 최신 STEM 교육 시설과 높은 학업 성취도를 자랑합니다.',
      '3. 릿지우드 학군 (Ridgewood High School): 역사와 전통을 자랑하며 학업뿐만 아니라 음악, 예술, 스포츠 프로그램이 균형 있게 발달한 명문 학군입니다.',
      '4. 포트리 학군 (Fort Lee High School): 최근 수년간 AICE(캠브리지 프로그램) 및 아카데미 특성화 교육을 대폭 강화하여 매년 학업 평가 점수가 가파르게 상승하고 있습니다.'
    ]
  },
  {
    id: 'nj-property-tax-tips',
    title: '뉴저지 주택 구매 시 필수 세금 총정리: 재산세(Property Tax)와 맨션택스',
    category: '세무 & 법률 가이드',
    readTime: '4분 소요',
    date: '2026. 07. 22',
    summary: '미국 내에서 높은 편인 뉴저지 재산세율(타운별 1.4% ~ 2.6%)과 100만 달러 이상 매매 시 발생하는 1% 맨션택스 완벽 대비법.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    content: [
      '뉴저지 부동산을 취득할 때 매매 가격만큼이나 중요한 것이 바로 "연간 재산세(Property Tax)"와 클로징 비용입니다.',
      '1. 타운별 재산세율 차이: 잉글우드 클리프(Englewood Cliffs)나 알파인(Alpine) 같은 타운은 상업용 기업 사옥들이 많아 재산세율이 약 1% 초반대로 매우 낮은 반면, 일반 주거 중심 타운은 2% ~ 2.4% 수준을 형성합니다.',
      '2. 뉴저지 맨션택스(Mansion Tax 1%): 매매 가격이 정확히 100만 달러($1,000,000) 이상인 경우, 전체 매매 대금의 1%를 구매자가 뉴저지 주정부에 일시불로 납부해야 합니다. $999,000과 $1,000,000 사이의 실제 비용 차이가 $10,000 이상 발생하므로 네고 시 유의해야 합니다.',
      '3. 재산세 이의신청(Tax Appeal): 주택 시세 대비 재산세 감정 평가액이 과도하게 높게 책정된 경우 매년 1월~4월 사이 전문 변호사를 통해 감액 신청을 진행할 수 있습니다.'
    ]
  },
  {
    id: 'commute-comparison-nyc',
    title: '맨해튼 출퇴근자 주거지 선택: 포트리 vs 에지워터 vs 저지시티',
    category: '통근 & 입지 분석',
    readTime: '6분 소요',
    date: '2026. 08. 02',
    summary: '미드타운 42번가 vs 월스트리트 직장인을 위한 교통수단(GWB 셔틀, NY Waterway 페리, PATH 전철) 및 라이프스타일 비교.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    content: [
      '맨해튼으로 출퇴근하는 직장인에게 뉴저지는 세금 혜택과 쾌적한 주거 면적을 동시에 챙길 수 있는 최적의 선택지입니다.',
      '1. 포트리 (Fort Lee): 조지워싱턴브릿지(GWB)를 도보 또는 셔틀로 건널 수 있으며, 어퍼맨해튼, 컬럼비아 대학 병원, 미드타운 북부 출퇴근에 가장 강력합니다. 한국 식당, 마트, 학원가 등 압도적인 한인 생활 편의성을 자랑합니다.',
      '2. 에지워터 (Edgewater): 허드슨 강변의 환상적인 뷰를 즐기며 NY Waterway 페리를 통해 15분 만에 미드타운 39번가로 진입할 수 있습니다. 여유롭고 세련된 워터프론트 라이프스타일을 추구하는 신혼부부에게 인기입니다.',
      '3. 저지시티 (Jersey City): 월스트리트(WTC) 및 다운타운 금융가 직장인에게는 PATH 전철 1정거장(7분)으로 연결되는 익스체인지 플레이스 및 뉴포트 지역이 최선의 대안입니다.'
    ]
  },
  {
    id: 'first-time-homebuyer-guide',
    title: '미국 첫 집 구매자(First-Time Homebuyer)를 위한 7단계 성공 로드맵',
    category: '바이어 실전 가이드',
    readTime: '7분 소요',
    date: '2026. 06. 18',
    summary: '모기지 사전승인(Pre-Approval)부터 오퍼 제출, 변호사 리뷰, 홈 인스펙션, 타이틀 클로징까지 원스톱 체크리스트.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    content: [
      '미국의 주택 매매 절차는 한국과 달리 바이어와 셀러가 각각 독립된 전문 공인중개사와 부동산 전문 변호사를 선임하여 법적으로 철저하게 보호받으며 진행됩니다.',
      '1단계: 모기지 사전승인서(Pre-Approval Letter) 발급 - 예산 범위 확정 및 오퍼 제출 필수 서류',
      '2단계: 희망 지역 선정 및 현장 투어 - 통근 거리, 학군, 재산세율 종합 분석',
      '3단계: 오퍼(Offer) 제출 및 계약 합의 - 가격 및 다운페이먼트 조건 협상',
      '4단계: 변호사 리뷰 기간(Attorney Review - 3일) - 계약서 조항 수정 및 법적 권리 확보',
      '5단계: 홈 인스펙션(Home Inspection) - 건물 구조, 지붕, 라돈, 오일탱크, 터마이트 점검 후 수리 요구',
      '6단계: 렌더 감정(Appraisal) 및 최종 모기지 승인(Commitment)',
      '7단계: 파이널 워크스루(Final Walk-through) 및 클로징(Closing) - 열쇠 수령'
    ]
  }
];

export const MarketInsightsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="insights-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>NJ REAL ESTATE COLUMN & INSIGHTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            뉴저지 부동산 실전 칼럼 & 필수 가이드
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            현지 거주민과 이주민을 위해 전문 에이전트가 직접 분석한 최신 뉴저지 시장 정보와 팁을 전해드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden relative bg-slate-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  칼럼 전체 읽기
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-auto border border-slate-200 relative">
            <div className="relative aspect-21/9 overflow-hidden bg-slate-900">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white inline-block mb-1">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
