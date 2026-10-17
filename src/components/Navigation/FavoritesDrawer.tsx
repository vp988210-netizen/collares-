import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

export const FavoritesDrawer: React.FC = () => {
  const {
    isFavoritesOpen,
    setIsFavoritesOpen,
    favorites,
    toggleFavorite,
    startCustomizationForProduct,
  } = useApp();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2D2421]/40 backdrop-blur-xs"
        onClick={() => setIsFavoritesOpen(false)}
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 border-l border-[#EAE2D9] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE2D9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C68B8B] fill-[#C68B8B]" />
            <span className="font-serif-luxury text-xl font-bold text-[#2D2421]">
              Tus Joyas Favoritas
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F6ECEC] text-[#C68B8B] font-bold">
              {favorites.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsFavoritesOpen(false)}
            className="p-1.5 rounded-full text-[#6E5D57] hover:bg-[#F4EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {favoriteProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-3">
              <div className="w-14 h-14 rounded-full bg-[#F6ECEC] flex items-center justify-center text-[#C68B8B] text-xl">
                ♡
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Aún no tienes favoritos guardados
              </h4>
              <p className="text-xs text-[#6E5D57] max-w-xs">
                Guarda aquí los collares que más te inspiren haciendo clic en el corazón de cualquier tarjeta.
              </p>
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 bg-white rounded-2xl border border-[#EAE2D9] flex gap-3 relative shadow-xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-18 h-18 rounded-xl object-cover bg-[#F4EFEB] flex-shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-luxury text-sm font-bold text-[#2D2421] truncate">
                        {product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        className="text-[#A29A93] hover:text-[#C68B8B] p-1"
                        title="Quitar de favoritos"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-[#6E5D57] mt-0.5 line-clamp-1">
                      {product.description}
                    </p>
                    <span className="text-xs font-bold text-[#2D2421] mt-1 block">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFavoritesOpen(false);
                        startCustomizationForProduct(product.id);
                      }}
                      className="w-full py-1.5 px-3 bg-[#C68B8B] hover:bg-[#B57A7A] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Personalizar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
