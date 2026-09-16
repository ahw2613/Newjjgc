import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, X, Building, Car, Sparkles } from 'lucide-react';
import { CurrencyType, Property, UnitType } from '../types';
import { formatPrice } from '../utils/formatters';

interface InteractiveNJMapProps {
  properties: Property[];
  currency: CurrencyType;
  unit: UnitType;
  onSelectProperty: (property: Property) => void;
}

export const InteractiveNJMap: React.FC<InteractiveNJMapProps> = ({
  properties,
  currency,
  unit,
  onSelectProperty
}) => {
  const [selectedPinProperty, setSelectedPinProperty] = useState<Property | null>(null);
  const [activeZone, setActiveZone] = useState<string>('all');

  // Relative visual positions for Bergen & Hudson County landmarks on our stylized graphic map
  // Longitude ranges roughly -74.15 (West: Ridgewood) to -73.95 (East: Hudson River)
  // Latitude ranges roughly 40.70 (South: Jersey City) to 40.98 (North: Closter/Ridgewood)
  const getMapCoordinates = (lat: number, lng: number) => {
    const minLat = 40.70;
    const maxLat = 41.00;
    const minLng = -74.16;
    const maxLng = -73.93;

    // Convert to percentage
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;

    // Clamp within 8% to 92%
    return {
      top: `${Math.min(90, Math.max(10, y))}%`,
      left: `${Math.min(90, Math.max(10, x))}%`
    };
  };

  const filteredPins = activeZone === 'all' 
    ? properties 
    : properties.filter(p => p.town.includes(activeZone));

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative my-6">
      {/* Map Header & Controls */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">뉴저지 버겐·허드슨 카운티 매물 지도</h3>
            <p className="text-xs text-slate-400">지도의 핀을 클릭하면 매물 요약과 가격을 확인할 수 있습니다</p>
          </div>
        </div>

        {/* Quick Town Filter Pills on Map */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
          <span className="text-slate-400 text-[11px] font-semibold mr-1">지역 바로가기:</span>
          {['all', '포트리', '팰리세이즈', '테너플라이', '에지워터', '클로스터', '릿지우드'].map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeZone === zone
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {zone === 'all' ? '전체 보기' : zone}
            </button>
          ))}
        </div>
      </div>

      {/* Stylized Visual Map Board */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-slate-950 overflow-hidden select-none">
        {/* River & Ocean Graphic (Hudson River on the Right) */}
        <div className="absolute top-0 bottom-0 right-0 w-[22%] bg-gradient-to-l from-sky-900/60 to-slate-950 border-l border-sky-800/40 pointer-events-none flex flex-col justify-between py-6 px-3 text-sky-400/80 font-mono text-[11px] uppercase tracking-widest text-right">
          <span>Hudson River</span>
          <span className="text-sky-300 font-bold">MANHATTAN (NYC) 🗽</span>
          <span>Upper NY Bay</span>
        </div>

        {/* Major Roads / Bridges Visual Highlights */}
        <div className="absolute top-[48%] right-0 w-[30%] h-1 bg-amber-500/40 border-t border-b border-amber-400/70 z-0 pointer-events-none flex items-center justify-end pr-2">
          <span className="text-[10px] text-amber-300 font-bold bg-slate-950/80 px-1 py-0.5 rounded-sm">
            GWB (George Washington Bridge) 🌉
          </span>
        </div>
        <div className="absolute bottom-[20%] right-0 w-[25%] h-1 bg-amber-500/30 border-dashed border-t border-amber-400/50 z-0 pointer-events-none flex items-center justify-end pr-2">
          <span className="text-[10px] text-amber-300 font-bold bg-slate-950/80 px-1 py-0.5 rounded-sm">
            Lincoln Tunnel
          </span>
        </div>

        {/* Major Highways lines (Route 4, Route 17, Route 9W, Palisades Interstate Pkwy) */}
        <div className="absolute top-[32%] left-[10%] right-[22%] h-[1px] bg-slate-700/60 rotate-2 pointer-events-none">
          <span className="text-[9px] text-slate-500 font-semibold px-2">Rt 4 (Route 4 East-West)</span>
        </div>
        <div className="absolute top-0 bottom-0 left-[24%] w-[1px] bg-slate-700/60 pointer-events-none">
          <span className="text-[9px] text-slate-500 font-semibold py-2 block -rotate-90">Rt 17</span>
        </div>

        {/* Area Ambient Labels */}
        <div className="absolute top-6 left-8 text-slate-600 font-bold text-xs pointer-events-none">
          BERGEN COUNTY NORTH (명문 학군 지구)
        </div>
        <div className="absolute top-[42%] left-[14%] text-slate-600 font-bold text-xs pointer-events-none">
          CENTRAL BERGEN
        </div>
        <div className="absolute bottom-6 left-8 text-slate-600 font-bold text-xs pointer-events-none">
          HUDSON COUNTY (PATH 통근 라인)
        </div>

        {/* Property Pins */}
        {filteredPins.map((prop) => {
          const coords = getMapCoordinates(prop.coordinates.lat, prop.coordinates.lng);
          const isSelected = selectedPinProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              style={{ top: coords.top, left: coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setSelectedPinProperty(prop)}
                className={`group flex items-center gap-1 px-2 py-1 rounded-full shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white ring-4 ring-rose-400/40 scale-110 z-30'
                    : prop.listingType === 'sale'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : prop.listingType === 'rent'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                <MapPin className="w-3 h-3" />
                <span className="text-[11px] font-bold">
                  {prop.listingType === 'rent'
                    ? `$${prop.price}/월`
                    : prop.price >= 1000000
                    ? `$${(prop.price / 1000000).toFixed(1)}M`
                    : `$${Math.round(prop.price / 1000)}K`}
                </span>
              </button>
            </div>
          );
        })}

        {/* Selected Property Popup Card */}
        {selectedPinProperty && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 bg-white text-slate-900 rounded-xl shadow-2xl p-4 border border-slate-200 z-40 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-blue-100 text-blue-800">
                  {selectedPinProperty.listingType === 'sale' ? '매매' : selectedPinProperty.listingType === 'rent' ? '렌트' : '상업용'}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedPinProperty.town}
                </span>
              </div>
              <button
                onClick={() => setSelectedPinProperty(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-3 mt-2">
              <img
                src={selectedPinProperty.images[0]}
                alt={selectedPinProperty.titleKo}
                className="w-24 h-20 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                  {selectedPinProperty.titleKo}
                </h4>
                <p className="text-sm font-extrabold text-blue-600 mt-0.5">
                  {formatPrice(selectedPinProperty.price, currency, selectedPinProperty.listingType)}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                  <span>{selectedPinProperty.beds}베드</span>
                  <span>•</span>
                  <span>{selectedPinProperty.baths}배스</span>
                  <span>•</span>
                  <span>{selectedPinProperty.sqft} sqft</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                GWB 차 {selectedPinProperty.commute.gwbDriveMinutes}분
              </span>
              <button
                onClick={() => onSelectProperty(selectedPinProperty)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md flex items-center gap-1 transition-colors"
              >
                <span>상세보기 & 투어</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend Footer */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>매매 (For Sale)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>렌트 (For Rent)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span>상업용 (Commercial)</span>
          </div>
        </div>
        <span className="text-slate-500 text-[11px]">
          * 뉴저지 버겐/허드슨 카운티 실시간 매물 좌표 안내
        </span>
      </div>
    </div>
  );
};
