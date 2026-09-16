import React from 'react';
import { Property, UnitType, CurrencyType } from '../types';
import { formatPropertyPrice, formatArea } from '../utils/formatters';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  properties: Property[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  unit: UnitType;
  currency: CurrencyType;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  properties,
  onToggleFavorite,
  onSelectProperty,
  unit,
}) => {
  if (!isOpen) return null;

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="favorites-modal"
        className="relative w-full max-w-2xl bg-white text-[#111111] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-100">
          <div>
            <h3 className="text-lg font-light tracking-wide uppercase">
              SAVED PROPERTIES ({favoriteProperties.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest font-semibold hover:opacity-60 transition"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favoriteProperties.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <p className="text-sm font-light text-neutral-600 mb-1">No saved properties yet.</p>
              <p className="text-xs text-neutral-400">매물 카드의 하트 버튼을 클릭하여 관심 매물을 저장하세요.</p>
            </div>
          ) : (
            favoriteProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex items-center gap-4 p-3 hover:bg-neutral-50 transition cursor-pointer border-b border-neutral-100"
                onClick={() => {
                  onSelectProperty(prop);
                  onClose();
                }}
              >
                <img
                  src={prop.images[0]}
                  alt={prop.titleKo}
                  className="w-20 h-16 object-cover bg-neutral-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111111]">
                    {formatPropertyPrice(prop.listingType, prop.price, prop.deposit, prop.monthlyRent)}
                  </p>
                  <h4 className="text-xs text-neutral-700 truncate font-medium mt-0.5">
                    {prop.titleKo}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {prop.district} · {formatArea(prop.exclusivePyeong, prop.exclusiveAreaM2, unit)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(prop.id);
                  }}
                  className="text-xs uppercase tracking-wider text-neutral-400 hover:text-black transition px-2 py-1"
                >
                  REMOVE
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
