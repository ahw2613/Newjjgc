import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
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
  currency,
}) => {
  if (!isOpen) return null;

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        id="favorites-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h3 className="text-lg font-bold">관심 매물 보관함</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              {favoriteProperties.length}개
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {favoriteProperties.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Heart className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
              <p className="text-sm font-semibold text-slate-700">보관된 관심 매물이 없습니다</p>
              <p className="text-xs text-slate-500">
                매물 카드의 하트 아이콘을 클릭하여 관심 있는 랜드마크를 저장해보세요.
              </p>
            </div>
          ) : (
            favoriteProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  onSelectProperty(prop);
                  onClose();
                }}
                className="group p-3.5 rounded-2xl border border-slate-200 hover:border-amber-400/80 bg-slate-50 hover:bg-white transition cursor-pointer flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={prop.images[0]}
                    alt={prop.titleKo}
                    className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-bold">
                      {prop.district}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 truncate mt-1 group-hover:text-amber-700 transition">
                      {prop.titleKo}
                    </h4>
                    <p className="text-xs font-black text-slate-950 mt-0.5">
                      {formatPropertyPrice(prop.listingType, prop.price, prop.deposit, prop.monthlyRent)}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      전용 {formatArea(prop.exclusivePyeong, prop.exclusiveAreaM2, unit)} · 룸{prop.rooms}/욕{prop.baths}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(prop.id);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                    title="보관함에서 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-amber-700 font-semibold group-hover:translate-x-0.5 transition hidden sm:inline-flex items-center gap-1">
                    보기 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
