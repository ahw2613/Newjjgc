import React from 'react';

interface ServicesSectionProps { onOpenSellModal: () => void; onOpenVipConsultModal: () => void; onSelectBuy?: () => void; }

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenSellModal, onOpenVipConsultModal, onSelectBuy }) => {
  const handleBuyClick = () => { if (onSelectBuy) onSelectBuy(); else document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' }); };
  const services = [
    { title: 'BUY A HOME', ko: '주택 구매', copy: 'Search homes, condos and townhouses across Northern New Jersey with local guidance from search through closing.', koCopy: '뉴저지 주택, 콘도, 타운하우스 매물 검색부터 오퍼와 클로징까지 현지 시장 기준으로 안내합니다.', action: handleBuyClick, label: 'START YOUR SEARCH' },
    { title: 'SELL YOUR PROPERTY', ko: '주택 매도', copy: 'Pricing, preparation, marketing and negotiation designed around your property and local market conditions.', koCopy: '정확한 가격 분석부터 마케팅, 바이어 연결, 협상까지 매도 과정을 체계적으로 진행합니다.', action: onOpenSellModal, label: 'REQUEST A VALUATION' },
    { title: 'RENT & RELOCATE', ko: '렌트 · 이주', copy: 'Rental and relocation support for clients moving to Bergen County, Hudson County and surrounding communities.', koCopy: '버겐카운티와 허드슨카운티를 포함한 뉴저지 지역 렌트와 이주 상담을 도와드립니다.', action: onOpenVipConsultModal, label: 'TALK TO AN AGENT' },
  ];
  return (
    <section id="services-section" className="border-t border-black/10 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-10 border-b border-black/10 pb-12 lg:grid-cols-[1fr_2fr] lg:items-end"><div><p className="text-[9px] font-medium tracking-[0.25em] text-black/45">REAL ESTATE SERVICES</p><h2 className="mt-3 text-3xl font-light tracking-[-0.02em] sm:text-4xl">Buying, selling &amp; renting<br /><span className="text-black/45">구매 · 매도 · 렌트</span></h2></div><p className="max-w-xl text-[13px] leading-6 text-black/55">A local New Jersey brokerage experience, with Korean and English support. <br />뉴저지 현지 부동산 시장에 대한 이해를 바탕으로 한국어와 영어로 상담합니다.</p></div>
        <div className="grid divide-y divide-black/10 md:grid-cols-3 md:divide-x md:divide-y-0">{services.map((service, i) => <div key={service.title} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0"><p className="text-[9px] tracking-[0.16em] text-black/40">0{i + 1}</p><h3 className="mt-7 text-[18px] font-medium">{service.title}</h3><p className="mt-1 text-[12px] text-black/45">{service.ko}</p><p className="mt-5 text-[12px] leading-5 text-black/60">{service.copy}</p><p className="mt-2 text-[12px] leading-5 text-black/45">{service.koCopy}</p><button onClick={service.action} className="mt-7 border-b border-black pb-1 text-[9px] font-medium tracking-[0.16em] hover:opacity-50">{service.label} · {service.ko === '주택 구매' ? '구매 상담' : service.ko === '주택 매도' ? '매도 상담' : '상담하기'}</button></div>)}</div>
      </div>
    </section>
  );
};
