import React from 'react';
import { PRINCIPAL_BROKERS } from '../data/propertiesData';
import { Award, ShieldCheck, Users, Building, CheckCircle2, Phone, Mail } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const brokers = Object.values(PRINCIPAL_BROKERS);

  const stats = [
    { label: '누적 하이엔드 중개 실적', value: '1조 8,500억원+' },
    { label: 'VIP 고객 전속 재계약률', value: '99.4%' },
    { label: '부동산 거래 손해배상 보증', value: '20억원 가입' },
    { label: '평균 경력', value: '14년 이상 전문가' },
  ];

  const milestones = [
    { year: '2018', title: '디 어드레스 부동산 중개법인 설립 (강남구 역삼동)' },
    { year: '2020', title: '용산·한남 프라이빗 VIP 라운지 2호점 오픈' },
    { year: '2022', title: '하이엔드 주거 누적 거래액 1조원 돌파 및 한국부동산학회 공로상' },
    { year: '2024', title: '상업용 빌딩 & 기업 사옥 매입매각 전담 본부 발족' },
    { year: '2026', title: '누적 거래액 1조 8,500억원 달성 및 디지털 프라이빗 매칭 런칭' },
  ];

  return (
    <section id="about-section" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Philosophy Banner */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            ABOUT THE ADDRESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            신뢰와 품격으로 증명하는 <br className="hidden sm:inline" />
            대한민국 1등 하이엔드 부동산 파트너
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            디 어드레스(THE ADDRESS)는 2018년 설립 이래, 철저한 권리분석과 비밀유지, 그리고 자산가 맞춤형 포트폴리오를 기반으로 대한민국 최고가 주거 및 상업용 빌딩 시장을 선도해 왔습니다.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((st, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-2xl sm:text-3xl font-black font-['Cinzel',serif] text-slate-900 block mb-1">
                {st.value}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {st.label}
              </span>
            </div>
          ))}
        </div>

        {/* Certified Broker Team Profile */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
              EXPERTS & PARTNERS
            </span>
            <h3 className="text-2xl font-bold text-slate-950">공인중개사 및 자산관리 전담 파트너</h3>
            <p className="text-xs text-slate-500 mt-1">
              국가공인 공인중개사 자격 및 법률·세무 전문 자문을 완비한 전속 파트너가 1:1로 밀착 서포트합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brokers.map((broker, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col items-center text-center">
                <img
                  src={broker.avatar}
                  alt={broker.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                />
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold mb-1">
                  경력 {broker.experienceYears}년
                </span>
                <h4 className="text-lg font-bold text-slate-900">{broker.name}</h4>
                <p className="text-xs text-slate-500 mb-3">{broker.title}</p>
                <div className="w-full pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <p className="text-[11px] text-slate-400">자격번호: {broker.licenseNumber}</p>
                  <p className="flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3 text-amber-600" />
                    <span>{broker.mobile}</span>
                  </p>
                  <p className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                    <Mail className="w-3 h-3 text-amber-600" />
                    <span>{broker.email}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline & Legal Certification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-950 text-white p-8 sm:p-10 rounded-3xl">
          {/* History */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              HISTORY & MILESTONES
            </span>
            <h3 className="text-2xl font-bold text-white mb-6">디 어드레스의 발자취</h3>
            <div className="space-y-4 border-l border-slate-800 pl-4">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold text-amber-400 block">{m.year}</span>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 font-light">{m.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Compliance Box */}
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
              <h4 className="text-base font-bold text-white">법적 고지 및 100% 안전 보증</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              (주)디 어드레스 부동산 중개법인은 공인중개사법 제30조에 의거하여 한국공인중개사협회 <strong>손해배상책임보증보험 20억원</strong>에 공식 가입되어 있습니다. 
              등기부등본 권리분석, 신탁 매물 정밀 실사, 계약금 에스크로 안심 계좌 연계를 통해 거래 사고 0건을 지켜오고 있습니다.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p>• 중개사무소 등록번호: 제11680-2018-00214호</p>
              <p>• 사업자등록번호: 214-88-94102</p>
              <p>• 한국공인중개사협회 서울시지부 정회원</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
