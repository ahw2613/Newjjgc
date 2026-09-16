import React, { useState } from 'react';
import { Property, UnitType, CurrencyType } from '../types';
import { formatPropertyPrice, formatManwonToUSD, formatArea } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  unit: UnitType;
  currency: CurrencyType;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  unit,
  currency,
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  const getListingStatus = () => {
    switch (property.listingType) {
      case 'sale': return 'FOR SALE';
      case 'jeonse': return 'FOR LEASE';
      case 'rent': return 'FOR RENT';
      case 'commercial': return 'COMMERCIAL';
      default: return 'ACTIVE';
    }
  };

  return (
    <article
      id={`property-card-${property.id}`}
      onClick={() => onSelectProperty(property)}
      className="group cursor-pointer flex flex-col transition-opacity duration-200"
    >
      {/* Large Visual Container (Sotheby's / Compass style) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={property.images[currentImgIndex] || property.images[0]}
          alt={property.titleKo}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Minimal Status Tag */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium tracking-[0.15em] px-2.5 py-1 uppercase">
          {getListingStatus()}
        </div>

        {/* Minimal Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from saved' : 'Save property'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors backdrop-blur-sm"
        >
          <svg 
            className="w-4 h-4" 
            fill={isFavorite ? '#ffffff' : 'none'} 
            stroke="currentColor" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Image dot indicators if multiple */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {property.images.slice(0, 5).map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImgIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details - Strict Typography Hierarchy, Zero Clutter */}
      <div className="pt-3.5 pb-2">
        {/* Price headline */}
        <div className="flex items-baseline justify-between mb-1">
          <p className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
            {currency === 'USD' 
              ? formatManwonToUSD(property.price) 
              : formatPropertyPrice(property.listingType, property.price, property.deposit, property.monthlyRent)
            }
          </p>
          {currency === 'USD' && (
            <span className="text-xs text-neutral-400 font-normal">
              {formatPropertyPrice(property.listingType, property.price, property.deposit, property.monthlyRent)}
            </span>
          )}
        </div>

        {/* Specs: Bed · Bath · Area (clean text only, no icons) */}
        <p className="text-xs text-neutral-600 mb-1 font-normal tracking-wide">
          {property.rooms} Beds · {property.baths} Baths · {formatArea(property.exclusivePyeong, property.exclusiveAreaM2, unit)}
        </p>

        {/* Property Name */}
        <h3 className="text-sm font-medium text-[#111111] truncate group-hover:underline underline-offset-4">
          {property.titleKo}
        </h3>

        {/* Location Address */}
        <p className="text-xs text-neutral-500 font-light truncate mt-0.5">
          {property.roadAddress}
        </p>
      </div>
    </article>
  );
};
