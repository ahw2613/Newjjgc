import React, { useState } from 'react';
import { DISTRICTS_GUIDE } from '../data/locationsData';
import { DistrictGuide } from '../types';
import { MapPin, TrendingUp, GraduationCap, Coffee, ArrowRight, Building, Sparkles } from 'lucide-react';

interface LocationsSectionProps {
  onSelectDistrictFilter: (districtName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onSelectDistrictFilter }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictGuide>(DISTRICTS_GUIDE[0]);

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

  return (
    <section id="locations-section" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>District Intelligence & Market Report</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            대한민국 핵심 권역별 프리미엄 입지 분석
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            실거래가 추이, 최고 명문 학군, 미래 개발 호재 및 라이프스타일을 종합 분석한 디 어드레스의 독점 지역 가이드입니다.
          </p>
        </div>

        {/* District Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {DISTRICTS_GUIDE.map((dist) => {
            const isSelected = selectedDistrict.id === dist.id;
            return (
              <button
                key={dist.id}
                id={`btn-district-${dist.id}`}
                onClick={() => setSelectedDistrict(dist)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-amber-400 shadow-md scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {dist.name}
              </button>
            );
          })}
        </div>

        {/* Active District Feature Spotlight (Compass / Sotheby's Editorial Style) */}
        <div className="bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Large Imagery */}
          <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
            <img
              src={selectedDistrict.image}
              alt={selectedDistrict.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                {selectedDistrict.subName}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {selectedDistrict.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                {selectedDistrict.highlight}
              </p>
            </div>
          </div>

          {/* Right Insights & Market Intelligence */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedDistrict.tags.map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 font-medium border border-slate-700">
                    #{t}
                  </span>
                ))}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {selectedDistrict.description}
              </p>
            </div>

            {/* Price & School Metric Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-800 text-xs">
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  평균 매매 평당가
                </span>
                <span className="text-sm font-bold text-white mt-1 block">
                  {selectedDistrict.avgSalePyeongPrice}
                </span>
              </div>
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  평균 전세 평당가
                </span>
                <span className="text-sm font-bold text-white mt-1 block">
                  {selectedDistrict.avgJeonsePyeongPrice}
                </span>
              </div>
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  배정 명문 학군
                </span>
                <span className="text-xs font-semibold text-slate-200 mt-1 block truncate">
                  {selectedDistrict.schoolGrade}
                </span>
              </div>
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-amber-400" />
                  대표 라이프스타일
                </span>
                <span className="text-xs font-semibold text-slate-200 mt-1 block truncate">
                  {selectedDistrict.lifestyle}
                </span>
              </div>
            </div>

            {/* Landmark Complexes List */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">권역 주요 랜드마크 단지</span>
              <div className="flex flex-wrap gap-2">
                {selectedDistrict.landmarkComplexes.map((complex, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-slate-200 border border-slate-700/80">
                    {complex}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button: Filter properties for this district */}
            <button
              id={`btn-explore-district-${selectedDistrict.id}`}
              onClick={() => onSelectDistrictFilter(mapDistrictToFilter(selectedDistrict.id))}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <span>{selectedDistrict.name} 매물 전체보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
