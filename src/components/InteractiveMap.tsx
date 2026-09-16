import React, { useState } from 'react';
import { Property, CurrencyType, UnitType } from '../types';
import { formatPropertyPrice } from '../utils/formatters';

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
  hoveredPropertyId
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);

  const getCoordinatesPosition = (prop: Property) => {
    if (prop.district.includes('광주')) {
      return { x: 82, y: 80, isGwangju: true };
    }

    const minLat = 37.495;
    const maxLat = 37.615;
    const minLng = 126.910;
    const maxLng = 127.115;

    const latPercent = ((prop.coordinates.lat - minLat) / (maxLat - minLat));
    const lngPercent = ((prop.coordinates.lng - minLng) / (maxLng - minLng));

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
    <div id="interactive-map-container" className="relative w-full h-full min-h-[460px] bg-[#f8f8f8] overflow-hidden select-none">
      {/* Top Map Location Tag (Zillow style minimal indicator) */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-neutral-600 shadow-sm border border-neutral-200/60">
        SEOUL & KEY DISTRICTS
      </div>

      {/* SVG Architectural Vector Map (Minimal Monochrome Redfin/Zillow style) */}
      <div className="relative w-full h-full overflow-hidden">
        <svg 
          viewBox="0 0 1000 650" 
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e5e5" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Map Base Canvas */}
          <rect width="100%" height="100%" fill="#f4f4f4" />
          <rect width="100%" height="100%" fill="url(#mapGrid)" />

          {/* Han River Vector Ribbon (Clean muted slate-blue) */}
          <path
            d="M 50 360 C 180 370, 240 330, 340 340 C 440 350, 480 390, 560 370 C 650 350, 720 310, 840 280 C 920 260, 970 240, 1000 230"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Clean bridges */}
          <line x1="420" y1="315" x2="430" y2="395" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="480" y1="315" x2="490" y2="395" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="550" y1="315" x2="560" y2="405" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="630" y1="285" x2="640" y2="385" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Minimalist District Typography (Subtle grey labeling) */}
          <text x="470" y="270" fill="#64748b" fontSize="11" fontWeight="500" letterSpacing="0.05em">HANNAM (한남)</text>
          <text x="590" y="240" fill="#64748b" fontSize="11" fontWeight="500" letterSpacing="0.05em">SEONGSU (성수)</text>
          <text x="640" y="440" fill="#64748b" fontSize="11" fontWeight="500" letterSpacing="0.05em">CHEONGDAM (청담)</text>
          <text x="400" y="460" fill="#64748b" fontSize="11" fontWeight="500" letterSpacing="0.05em">BANPO (반포)</text>
          <text x="820" y="380" fill="#64748b" fontSize="11" fontWeight="500" letterSpacing="0.05em">JAMSIL (잠실)</text>
          <text x="180" y="310" fill="#64748b" fontSize="11" fontWeight="500" letterSpacing="0.05em">YEOUIDO (여의도)</text>

          {/* Gwangju Inset Box */}
          <g transform="translate(790, 470)">
            <rect width="190" height="160" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x="14" y="24" fill="#334155" fontSize="10" fontWeight="600" letterSpacing="0.05em">GWANGJU BONGSEON</text>
            <text x="14" y="38" fill="#94a3b8" fontSize="8">광주광역시 봉선 특구</text>
          </g>
        </svg>

        {/* Zillow / Redfin Style Price Badge Pins */}
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
                className={`absolute pointer-events-auto cursor-pointer transition-all duration-150 z-10 ${
                  isHovered || isSelected ? 'z-30 scale-110' : 'hover:z-20'
                }`}
              >
                <div
                  className={`px-2.5 py-1 text-xs font-semibold whitespace-nowrap shadow-md transition-colors ${
                    isSelected || isHovered
                      ? 'bg-[#111111] text-white ring-2 ring-black'
                      : 'bg-white text-[#111111] border border-neutral-300 hover:bg-[#111111] hover:text-white'
                  }`}
                >
                  {formatShortPrice(prop)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Preview Card (Minimal Zillow Card overlay) */}
        {previewProperty && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-40 bg-white p-4 shadow-xl border border-neutral-200 animate-in fade-in duration-200">
            <button
              onClick={() => setPreviewProperty(null)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-black p-1 text-xs uppercase"
            >
              ✕
            </button>
            <div className="flex gap-3">
              <img
                src={previewProperty.images[0]}
                alt={previewProperty.titleKo}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#111111]">
                  {formatPropertyPrice(previewProperty.listingType, previewProperty.price, previewProperty.deposit, previewProperty.monthlyRent)}
                </p>
                <p className="text-xs text-neutral-600 truncate mt-0.5">
                  {previewProperty.titleKo}
                </p>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                  {previewProperty.rooms} Bed · {previewProperty.baths} Bath · {previewProperty.exclusivePyeong}평
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectProperty(previewProperty);
                setPreviewProperty(null);
              }}
              className="mt-3 w-full py-2 bg-[#111111] text-white text-xs font-medium tracking-widest uppercase hover:bg-neutral-800 transition"
            >
              VIEW DETAILS
            </button>
          </div>
        )}

        {/* Minimal Zoom Controls */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-col bg-white border border-neutral-200 shadow-sm text-xs font-semibold">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 border-b border-neutral-200"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100"
            title="Zoom out"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
};
