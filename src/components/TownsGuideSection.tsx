import React from 'react';
import { TOWNS_DATA } from '../data/townsData';
import { TownGuide } from '../types';
import { GraduationCap, Car, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

interface TownsGuideSectionProps {
  onSelectTown: (townNameKo: string) => void;
}

export const TownsGuideSection: React.FC<TownsGuideSectionProps> = ({ onSelectTown }) => {
  return (
    <section id="towns-section" className="py-16 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>NEW JERSEY TOWN & SCHOOL GUIDE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            뉴저지 주요 타운 & 명문 학군 가이드
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            맨해튼 통근 시간, 공립학교 등급, 타운별 주택 시세를 비교하고 우리 가족에게 딱 맞는 동네를 찾아보세요.
          </p>
        </div>

        {/* Town Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOWNS_DATA.map((town) => (
            <div
              key={town.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Town Photo with Overlay */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={town.image}
                    alt={town.nameKo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block">
                      {town.county}
                    </span>
                    <h3 className="text-lg font-black text-white">{town.nameKo}</h3>
                    <p className="text-xs text-slate-300">{town.nameEn}</p>
                  </div>
                </div>

                {/* Town Details */}
                <div className="p-4 space-y-3">
                  <p className="text-xs font-semibold text-blue-700 bg-blue-50 p-2 rounded-lg leading-snug">
                    {town.highlight}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {town.descriptionKo}
                  </p>

                  {/* Metrics Box */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                        학군 평가:
                      </span>
                      <span className="font-bold text-slate-900">{town.schoolGrade}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-blue-600" />
                        맨해튼 통근:
                      </span>
                      <span className="font-bold text-slate-900">{town.commuteTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">평균 매매가:</span>
                      <span className="font-bold text-slate-900">{town.avgPrice}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {town.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onSelectTown(town.nameKo)}
                  className="w-full py-2.5 px-3 bg-slate-50 hover:bg-blue-600 text-slate-800 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200 hover:border-transparent cursor-pointer"
                >
                  <span>{town.nameKo} 매물 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
