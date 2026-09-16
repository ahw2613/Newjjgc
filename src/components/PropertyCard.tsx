import React from 'react';
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

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, isFavorite, onToggleFavorite, onSelectProperty, unit, currency }) => {
  const price = currency === 'USD'
    ? formatManwonToUSD(property.price)
    : formatPropertyPrice(property.listingType, property.price, property.deposit, property.monthlyRent);

  const status = property.listingType === 'sale' ? 'FOR SALE' : property.listingType === 'rent' ? 'FOR RENT' : property.listingType === 'jeonse' ? 'FOR LEASE' : 'COMMERCIAL';

  return (
    <article className="group cursor-pointer" onClick={() => onSelectProperty(property)}>
      <div className="relative aspect-[1.18/1] overflow-hidden bg-[#f1f1ef]">
        <img
          src={property.images[0]}
          alt={property.titleKo}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="text-[9px] font-medium tracking-[0.18em] text-white drop-shadow-md">{status}</span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id); }}
            aria-label={isFavorite ? 'Remove from saved' : 'Save property'}
            className="text-white/90 drop-shadow-md transition-opacity hover:opacity-60"
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="truncate text-[15px] font-medium tracking-[-0.01em] text-[#171717]">{property.titleKo}</h3>
          <p className="shrink-0 text-[15px] font-medium text-[#171717]">{price}</p>
        </div>
        <p className="mt-1 truncate text-[11px] text-black/50">{property.roadAddress}</p>
        <p className="mt-2 text-[10px] tracking-[0.04em] text-black/55">
          {property.rooms} BD&nbsp;&nbsp; {property.baths} BA&nbsp;&nbsp; {formatArea(property.exclusivePyeong, property.exclusiveAreaM2, unit)}
        </p>
      </div>
    </article>
  );
};
