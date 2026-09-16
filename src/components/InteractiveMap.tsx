import React, { useState } from 'react';
import { Property, CurrencyType, UnitType } from '../types';
import { formatPropertyPrice } from '../utils/formatters';
import { MapPin, ZoomIn, ZoomOut, Navigation, Eye, ArrowRight, X } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  hoveredPropertyId?: string | null;
  unit: UnitType;
  currency: CurrencyType;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  hoveredPropertyId,
  unit,
  currency
}) => {
  const [activeDistrictView, setActiveDistrictView] = useState<'all' | 'seoul' | 'gwangju'>('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);

  // 서울 좌표 정규화 함수 (서울 중심: 위도 37.50~37.60, 경도 126.90~127.12)
  const getCoordinatesPosition = (prop: Property) => {
    // 만약 광주 매물인 경우
    if (prop.district.includes('광주')) {
      return { x: 82, y: 80, isGwangju: true };
    }

    const minLat = 37.495;
    const maxLat = 37.615;
    const minLng = 126.910;
    const maxLng = 127.115;

    const latPercent = ((prop.coordinates.lat - minLat) / (maxLat - minLat));
    const lngPercent = ((prop.coordinates.lng - minLng) / (maxLng - minLng));

    // Y축은 위도가 높을수록 위(0)에 위치
    const y = Math.max(8, Math.min(88, (1 - latPercent) * 80 + 10));
    const x = Math.max(8, Math.min(90, lngPercent * 80 + 10));

    return { x, y, isGwangju: false };
  };

  const formatShortPrice = (prop: Property) => {
    if (prop.listingType === 'jeonse') {
      const eok = Math.floor((prop.deposit || prop.price) / 10000);
      return `전 ${eok}억`;
    }
    if (prop.listingType === 'rent') {
      return `월 ${prop.monthlyRent}만`;
    }
    const eok = Math.floor(prop.price / 10000);
    return `${eok}억`;
  };

  const handlePinClick = (prop: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewProperty(prop);
  };

  return (
    <div id="interactive-map-container" className="relative w-full h-full min-h-[500px] lg:min-h-[640px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col">
      {/* Top Map Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 pointer-events-auto shadow-lg">
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-white">디 어드레스 인터랙티브 지도</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
            {properties.length}개 매물
          </span>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 pointer-events-auto shadow-lg">
          <button
            onClick={() => setActiveDistrictView('all')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
              activeDistrictView === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveDistrictView('seoul')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
              activeDistrictView === 'seoul' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            서울 한강벨트
          </button>
          <button
            onClick={() => setActiveDistrictView('gwangju')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
              activeDistrictView === 'gwangju' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            광주 봉선
          </button>
        </div>
      </div>

      {/* SVG Stylized Architectural Vector Map */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950 select-none">
        <svg 
          viewBox="0 0 1000 650" 
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Subtle Grid System */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#0369a1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#075985" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="#090d16" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Stylized Han River Path (서울 한강 굽이치는 곡선) */}
          <path
            d="M 50 360 C 180 370, 240 330, 340 340 C 440 350, 480 390, 560 370 C 650 350, 720 310, 840 280 C 920 260, 970 240, 1000 230"
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="38"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Han River Sub Branches / Bridges Stylized */}
          <line x1="420" y1="310" x2="430" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" /> {/* 반포대교 */}
          <line x1="480" y1="310" x2="490" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" /> {/* 한남대교 */}
          <line x1="550" y1="310" x2="560" y2="410" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" /> {/* 성수대교 */}
          <line x1="630" y1="280" x2="640" y2="390" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" /> {/* 영동대교 */}

          {/* Area Labels (권역 랜드마크 텍스트) */}
          <text x="470" y="270" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="1">용산 · 한남동</text>
          <text x="590" y="240" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="1">성동 · 성수동 (서울숲)</text>
          <text x="640" y="440" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="1">강남 · 청담 · 압구정</text>
          <text x="400" y="460" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="1">서초 · 반포동</text>
          <text x="820" y="380" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="1">송파 · 잠실 (롯데타워)</text>
          <text x="180" y="310" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="1">영등포 · 여의도</text>

          {/* 지방 거점 분할 미니맵 (광주광역시 표시 박스) */}
          <g transform="translate(800, 480)">
            <rect width="180" height="150" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="14" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold">광주광역시 봉선 특구</text>
            <text x="14" y="40" fill="#64748b" fontSize="9">호남 1위 명문 학원가 벨트</text>
            <circle cx="80" cy="90" r="8" fill="#f59e0b" fillOpacity="0.2" />
          </g>
        </svg>

        {/* Dynamic Property Pins Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {properties.map((prop) => {
            const pos = getCoordinatesPosition(prop);
            const isHovered = hoveredPropertyId === prop.id;
            const isSelected = selectedProperty?.id === prop.id;

            return (
              <div
                key={prop.id}
                id={`map-pin-${prop.id}`}
                onClick={(e) => handlePinClick(prop, e)}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -100%)',
                }}
                className={`absolute pointer-events-auto cursor-pointer transition-all duration-200 z-10 ${
                  isHovered || isSelected ? 'z-30 scale-110' : 'hover:z-20 hover:scale-105'
                }`}
              >
                {/* Pin Price Chip */}
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-xl border whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/40'
                      : isHovered
                      ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-500/50'
                      : prop.listingType === 'sale'
                      ? 'bg-slate-900/95 text-amber-300 border-amber-500/50'
                      : prop.listingType === 'jeonse'
                      ? 'bg-slate-900/95 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-900/95 text-blue-300 border-blue-500/50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                  <span>{formatShortPrice(prop)}</span>
                </div>
                {/* Pin Pointer Triangle */}
                <div className="w-0 h-0 mx-auto border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-900" />
              </div>
            );
          })}
        </div>

        {/* Selected / Preview Property Card Popup */}
        {previewProperty && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-40 bg-slate-950/95 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden p-3.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <button
              onClick={() => setPreviewProperty(null)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex gap-3">
              <img
                src={previewProperty.images[0]}
                alt={previewProperty.titleKo}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0 pr-6">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                  {previewProperty.district}
                </span>
                <h4 className="text-sm font-bold text-white truncate mt-1">
                  {previewProperty.titleKo}
                </h4>
                <p className="text-sm font-black text-amber-400 mt-1">
                  {formatPropertyPrice(previewProperty.listingType, previewProperty.price, previewProperty.deposit, previewProperty.monthlyRent)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  전용 {previewProperty.exclusivePyeong}평 ({previewProperty.exclusiveAreaM2}㎡) · 룸{previewProperty.rooms}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectProperty(previewProperty);
                setPreviewProperty(null);
              }}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>상세 정보 및 투어 예약</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 shadow-lg">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="지도 확대"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="지도 축소"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
