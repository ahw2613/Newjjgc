import React from 'react';

interface ServicesSectionProps {
  onOpenSellModal: () => void;
  onOpenVipConsultModal: () => void;
  onSelectBuy?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenSellModal,
  onOpenVipConsultModal,
  onSelectBuy
}) => {
  const handleBuyClick = () => {
    if (onSelectBuy) {
      onSelectBuy();
    } else {
      const elem = document.getElementById('properties-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services-section" className="py-24 lg:py-32 bg-white text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Section Header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-3">
            PRACTICES
          </p>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight">
            How We Serve.
          </h2>
          <p className="mt-4 text-sm font-light text-neutral-600 leading-relaxed">
            단순 중개를 넘어 고객의 생애 자산 가치를 극대화하는 3대 전속 부동산 자문 서비스를 제공합니다.
          </p>
        </div>

        {/* 3 Pillar Architectural Cards (Compass style: Large Imagery, generous breathing room) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* 1. BUY */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 mb-6">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Buying Luxury Real Estate"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h3 className="text-xl font-medium tracking-tight mb-3">
              BUY &amp; ACQUIRE
            </h3>
            <p className="text-sm font-light text-neutral-600 leading-relaxed mb-6">
              시장에 공개되지 않은 비공개 오프마켓 매물부터 한강변 최상위 펜트하우스까지, 자산 규모와 라이프스타일에 맞춘 1:1 맞춤형 포트폴리오를 제공합니다.
            </p>
            <button
              onClick={handleBuyClick}
              className="mt-auto text-left text-xs uppercase tracking-widest font-semibold text-neutral-900 hover:opacity-60 transition"
            >
              EXPLORE COLLECTION →
            </button>
          </div>

          {/* 2. SELL */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 mb-6">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Selling with The Address"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h3 className="text-xl font-medium tracking-tight mb-3">
              SELL &amp; REPRESENT
            </h3>
            <p className="text-sm font-light text-neutral-600 leading-relaxed mb-6">
              건축 전문 사진작가의 미디어 패키지 촬영, 빅데이터 기반 가치평가, 엄선된 VIP 바이어 네트워크를 통해 귀하의 매물을 신속하고 가치 있게 중개합니다.
            </p>
            <button
              onClick={onOpenSellModal}
              className="mt-auto text-left text-xs uppercase tracking-widest font-semibold text-neutral-900 hover:opacity-60 transition"
            >
              REQUEST VALUATION →
            </button>
          </div>

          {/* 3. LEASE & COMMERCIAL */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 mb-6">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
                alt="Commercial and Corporate Relocation"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h3 className="text-xl font-medium tracking-tight mb-3">
              LEASE &amp; COMMERCIAL
            </h3>
            <p className="text-sm font-light text-neutral-600 leading-relaxed mb-6">
              국내 최고급 전월세 임대차 자문 및 테헤란로·성수·판교 핵심 상업용 빌딩과 기업 사옥 이전을 위한 세무·법률 복합 컨설팅을 수행합니다.
            </p>
            <button
              onClick={onOpenVipConsultModal}
              className="mt-auto text-left text-xs uppercase tracking-widest font-semibold text-neutral-900 hover:opacity-60 transition"
            >
              SCHEDULE ADVISORY →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
