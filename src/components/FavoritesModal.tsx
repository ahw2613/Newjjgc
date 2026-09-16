import React from 'react';
import { X, Heart, Trash2, Eye, MapPin } from 'lucide-react';
import { CurrencyType, Property, UnitType } from '../types';
import { formatPrice, formatArea } from '../utils/formatters';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  currency: CurrencyType;
  unit: UnitType;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectProperty,
  currency,
  unit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto border border-slate-200 relative">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-extrabold text-base text-white">내가 찜한 관심 매물 ({favorites.length}개)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {favorites.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700">아직 저장된 관심 매물이 없습니다.</p>
              <p className="text-xs text-slate-400 mt-1">
                매물 카드 상단의 하트(♥) 아이콘을 눌러 관심 있는 집을 담아보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((prop) => (
                <div
                  key={prop.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-400 transition-all gap-3 bg-slate-50/50"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.titleKo}
                    className="w-20 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-blue-600 block">
                      {prop.town} • MLS# {prop.mlsNumber}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {prop.titleKo}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mt-1">
                      <span className="text-blue-700">
                        {formatPrice(prop.price, currency, prop.listingType)}
                      </span>
                      <span className="text-[11px] font-normal text-slate-500">
                        {prop.beds}베드 • {prop.baths}배스 • {formatArea(prop.sqft, unit)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">상세보기</span>
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(prop.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
