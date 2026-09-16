import React from 'react';
import { 
  Heart, 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  GraduationCap, 
  Bus, 
  Calendar, 
  Eye, 
  Sparkles, 
  Clock 
} from 'lucide-react';
import { CurrencyType, Property, UnitType } from '../types';
import { formatPrice, formatArea } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  currency: CurrencyType;
  unit: UnitType;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  unit,
  isFavorite,
  onToggleFavorite,
  onSelectProperty
}) => {
  const getListingTypeBadge = (type: string) => {
    switch (type) {
      case 'sale':
        return { label: '매매 (For Sale)', bg: 'bg-blue-600 text-white' };
      case 'rent':
        return { label: '렌트 (For Rent)', bg: 'bg-emerald-600 text-white' };
      case 'commercial':
        return { label: '상업용 (Commercial)', bg: 'bg-amber-600 text-white' };
      default:
        return { label: type, bg: 'bg-slate-700 text-white' };
    }
  };

  const badge = getListingTypeBadge(property.listingType);
  const bestSchool = property.schools.reduce((prev, curr) => (curr.rating > prev.rating ? curr : prev), property.schools[0]);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.images[0]}
          alt={property.titleKo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs ${badge.bg}`}>
            {badge.label}
          </span>
          {property.isNew && (
            <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-indigo-600 text-white flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" /> 신축 NEW
            </span>
          )}
          {property.isHot && (
            <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-rose-600 text-white shadow-xs">
              HOT 인기
            </span>
          )}
        </div>

        {/* Favorite Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-rose-600 transition-all shadow-md z-10 cursor-pointer"
          title={isFavorite ? '관심 매물에서 제거' : '관심 매물에 저장'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Open House Notice Badge */}
        {property.openHouse && (
          <div className="absolute bottom-3 left-3 bg-amber-500/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>오픈하우스: {property.openHouse.date}</span>
          </div>
        )}

        {/* Image count */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
          사진 {property.images.length}장
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Town and Address */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-blue-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {property.town}
            </span>
            <span className="text-slate-400">MLS# {property.mlsNumber}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer"
            title={property.titleKo}
          >
            {property.titleKo}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
            {property.address}, {property.town}
          </p>

          {/* Price display with dual currency */}
          <div className="mt-3 pb-2 border-b border-slate-100">
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                {formatPrice(property.price, currency, property.listingType)}
              </span>
            </div>
            {/* Secondary currency preview */}
            <p className="text-xs text-slate-500 mt-0.5">
              {currency === 'USD' 
                ? `(원화 환산 ${formatPrice(property.price, 'KRW', property.listingType)})` 
                : `(USD: $${property.price.toLocaleString()})`}
            </p>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-b border-slate-100 text-slate-700 text-xs font-semibold">
            <div className="flex items-center gap-1.5" title="침실 수">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.beds > 0 ? `${property.beds} 침실` : '오피스/스튜디오'}</span>
            </div>
            <div className="flex items-center gap-1.5" title="욕실 수">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.baths} 욕실</span>
            </div>
            <div className="flex items-center gap-1.5" title="면적">
              <Maximize className="w-4 h-4 text-slate-400" />
              <span className="truncate">{formatArea(property.sqft, unit)}</span>
            </div>
          </div>

          {/* School and Commute Highlights */}
          <div className="mt-3 flex flex-col gap-1.5 text-xs text-slate-600">
            {bestSchool && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-800">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  학군 평가:
                </span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  {bestSchool.name.split(' ')[0]} {bestSchool.rating}/10점
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-500">
                <Bus className="w-3.5 h-3.5 text-blue-500" />
                NYC 통근:
              </span>
              <span className="font-medium text-slate-700">
                GWB 차 {property.commute.gwbDriveMinutes}분 / 버스 {property.commute.busToPortAuthorityMinutes}분
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>상세정보 & 투어 예약</span>
          </button>
        </div>
      </div>
    </div>
  );
};
