import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, MapPin, Maximize2, Car, Compass } from 'lucide-react';
import { Property, UnitType, CurrencyType } from '../types';
import { formatPropertyPrice, formatManwonToUSD, formatArea } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  unit: UnitType;
  currency: CurrencyType;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  unit,
  currency,
  compact = false
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  const getListingBadgeColor = () => {
    switch (property.listingType) {
      case 'sale':
        return 'bg-amber-500 text-slate-950 font-bold';
      case 'jeonse':
        return 'bg-emerald-600 text-white font-bold';
      case 'rent':
        return 'bg-blue-600 text-white font-bold';
      case 'commercial':
        return 'bg-purple-600 text-white font-bold';
      default:
        return 'bg-slate-800 text-slate-200';
    }
  };

  const getListingLabel = () => {
    switch (property.listingType) {
      case 'sale': return '매매';
      case 'jeonse': return '전세';
      case 'rent': return '월세';
      case 'commercial': return '빌딩·상업용';
    }
  };

  return (
    <div
      id={`property-card-${property.id}`}
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 cursor-pointer flex flex-col relative"
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={property.images[currentImageIndex] || property.images[0]}
          alt={property.titleKo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Carousel Arrow Controls (shows on hover) */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="이전 사진"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="다음 사진"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
              {property.images.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    currentImageIndex === i ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`text-[11px] px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider ${getListingBadgeColor()}`}>
            {getListingLabel()}
          </span>
          {property.isVipExclusive && (
            <span className="text-[11px] px-2 py-1 rounded-md bg-slate-950/90 text-amber-300 font-semibold border border-amber-400/40 backdrop-blur-md shadow-sm">
              VIP 전속
            </span>
          )}
          {property.isHot && (
            <span className="text-[11px] px-2 py-1 rounded-md bg-rose-600 text-white font-semibold shadow-sm">
              인기 매물
            </span>
          )}
        </div>

        {/* Top Right Favorite Button */}
        <button
          id={`btn-favorite-${property.id}`}
          onClick={handleFavoriteClick}
          aria-label="관심 매물 저장"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-400'
            }`}
          />
        </button>

        {/* Sub-location tag on bottom of image */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1 drop-shadow">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{property.region}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Title */}
        <div className="mb-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-amber-700 transition">
            {property.titleKo}
          </h3>
          {property.subTitle && (
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
              {property.subTitle}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="my-2">
          <div className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-baseline gap-2">
            <span>
              {formatPropertyPrice(property.listingType, property.price, property.deposit, property.monthlyRent)}
            </span>
          </div>
          {currency === 'USD' && (
            <p className="text-xs text-slate-500 font-medium">
              약 {formatManwonToUSD(property.price)} (환율 1,380원 기준)
            </p>
          )}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100 my-2 text-center text-xs text-slate-600">
          <div>
            <span className="block text-[10px] text-slate-400">전용면적</span>
            <span className="font-bold text-slate-800">
              {formatArea(property.exclusivePyeong, property.exclusiveAreaM2, unit)}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400">구조</span>
            <span className="font-bold text-slate-800">룸{property.rooms}/욕{property.baths}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400">해당층</span>
            <span className="font-bold text-slate-800">{property.floor}층/{property.totalFloors}층</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400">주차</span>
            <span className="font-bold text-slate-800">세대당 {property.parking}대</span>
          </div>
        </div>

        {/* Features / Subway tag */}
        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium whitespace-nowrap">
              {property.subway.station.split('(')[0]} 도보 {property.subway.walkMinutes}분
            </span>
            {property.features[0] && (
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[11px] font-medium whitespace-nowrap truncate">
                {property.features[0]}
              </span>
            )}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold group-hover:underline whitespace-nowrap ml-2">
            상세보기 &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
