import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-24 lg:py-36 bg-[#f9f9f9] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* 50/50 Editorial Layout (Sotheby's / Compass Magazine Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 50% Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="The Address Architectural Space"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition duration-700"
              />
            </div>
          </div>

          {/* 50% Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-4">
              ABOUT THE ADDRESS
            </p>

            <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-[1.15] mb-8">
              A different perspective on real estate.
            </h2>

            <div className="space-y-6 text-sm sm:text-base font-light text-neutral-600 leading-relaxed">
              <p>
                디 어드레스(THE ADDRESS)는 부동산을 단순한 거래의 대상이 아닌, 삶의 양식과 안목이 집약된 건축적 유산으로 바라봅니다.
              </p>
              <p>
                2018년 한남과 청담 라운지에서 시작되어, 국내 최고가 주거 단지와 핵심 상업용 빌딩 시장에서 대한민국 상위 0.1% 자산가들의 신뢰를 얻어왔습니다. 철저한 비밀 유지 협약(NDA), 데이터 기반의 정밀한 권리분석, 그리고 건축가적 심미안으로 최상의 가치를 제안합니다.
              </p>
            </div>

            {/* Credibility & Protection (Text-based, no badges) */}
            <div className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="uppercase tracking-widest text-neutral-400 font-semibold mb-1">FIDUCIARY DUTY</p>
                <p className="font-normal text-neutral-800">한국공인중개사협회 20억원 손해배상 보증</p>
              </div>
              <div>
                <p className="uppercase tracking-widest text-neutral-400 font-semibold mb-1">PARTNERSHIP</p>
                <p className="font-normal text-neutral-800">평균 14년 이상의 공인중개사 및 세무 법률 자문단</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
