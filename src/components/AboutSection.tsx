import React from 'react';

export const AboutSection: React.FC = () => (
  <section id="about-section" className="border-t border-black/10 bg-[#f6f6f3] py-20 lg:py-28 text-[#171717]">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
        <div className="lg:col-span-7"><div className="aspect-[16/10] overflow-hidden bg-[#ddd]"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85" alt="North Jersey home" className="h-full w-full object-cover" /></div></div>
        <div className="lg:col-span-5">
          <p className="text-[9px] font-medium tracking-[0.25em] text-black/45">ABOUT THE ADDRESS · THE ADDRESS 소개</p>
          <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Local knowledge.<br />Real estate expertise.<span className="mt-2 block text-lg text-black/45">뉴저지 현지 시장을 아는 부동산</span></h2>
          <p className="mt-7 text-[13px] leading-6 text-black/65">THE ADDRESS는 Northern New Jersey의 주거 시장을 중심으로 구매, 매도, 렌트와 relocation을 돕는 부동산 서비스입니다.</p>
          <p className="mt-4 text-[13px] leading-6 text-black/55">We help clients navigate Bergen County, Hudson County and surrounding communities with practical local insight—from neighborhood selection and property search to negotiation and closing.</p>
          <div className="mt-9 grid grid-cols-2 gap-6 border-t border-black/10 pt-6 text-[11px]"><div><p className="text-black/40">LANGUAGES</p><p className="mt-1">English · 한국어</p></div><div><p className="text-black/40">MARKET</p><p className="mt-1">North Jersey · NJ</p></div></div>
        </div>
      </div>
    </div>
  </section>
);
