import React from 'react';
import { DISTRICTS_GUIDE } from '../data/locationsData';

interface LocationsSectionProps {
  onSelectDistrictFilter: (districtName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectDistrictFilter }) => {
  const mapDistrictToFilter = (id: string) => {
    switch (id) {
      case 'district-yongsan': return '용산/한남';
      case 'district-gangnam': return '강남/청담';
      case 'district-seongsu': return '성동/성수';
      case 'district-seocho': return '서초/반포';
      case 'district-songpa': return '송파/잠실';
      case 'district-gwangju': return '광주/봉선';
      default: return 'all';
    }
  };

  const handleDistrictClick = (id: string) => {
    const filterKey = mapDistrictToFilter(id);
    onSelectDistrictFilter(filterKey);
    const elem = document.getElementById('properties-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="locations-section" className="py-24 lg:py-32 bg-[#fafafa] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-3">
            PRIME NEIGHBORHOODS
          </p>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight">
            Curated Neighborhoods.
          </h2>
          <p className="mt-4 text-sm font-light text-neutral-600 leading-relaxed">
            전통적인 하이엔드 주거지 한남과 청담부터 신흥 럭셔리 허브 성수와 반포, 그리고 영호남 거점 특구까지 엄선된 입지별 포트폴리오를 제공합니다.
          </p>
        </div>

        {/* Large Visual Neighborhood Grid (Compass Editorial Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISTRICTS_GUIDE.slice(0, 6).map((dist) => (
            <div
              key={dist.id}
              onClick={() => handleDistrictClick(dist.id)}
              className="group cursor-pointer flex flex-col"
            >
              {/* High-res image container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-200">
                <img
                  src={dist.image}
                  alt={dist.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Minimalist Info Below (No boxes) */}
              <div className="pt-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-lg font-medium text-[#111111] group-hover:underline underline-offset-4">
                    {dist.name}
                  </h3>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-light">
                    {dist.avgSalePyeongPrice}
                  </span>
                </div>
                <p className="text-xs font-light text-neutral-500 line-clamp-2 leading-relaxed">
                  {dist.highlight}
                </p>
                <span className="inline-block mt-3 text-[11px] font-medium tracking-widest uppercase text-neutral-900 group-hover:translate-x-1 transition-transform">
                  EXPLORE PROPERTIES →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
