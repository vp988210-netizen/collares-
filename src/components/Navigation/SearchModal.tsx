import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetail, startCustomizationForProduct } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2D2421]/40 backdrop-blur-xs"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE2D9] overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE2D9] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#C68B8B] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, inicial, fecha, zodiaco..."
            className="w-full bg-transparent text-[#2D2421] text-sm sm:text-base font-medium focus:outline-none placeholder:text-[#A29A93]"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-[#6E5D57] hover:bg-[#F4EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-2.5 bg-[#FAF7F2] border-b border-[#EAE2D9] flex items-center gap-2 overflow-x-auto text-xs text-[#6E5D57]">
          <span className="text-[11px] font-semibold text-[#A29A93] uppercase tracking-wider">
            Popular:
          </span>
          {['Nombre', 'Inicial', 'Corazón', 'Mamá', 'Oro 18K'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F6ECEC] hover:text-[#C68B8B] border border-[#EAE2D9] transition-colors whitespace-nowrap text-xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-3">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#6E5D57] flex flex-col items-center gap-2">
              <span className="text-2xl">🔍</span>
              <p className="font-serif-luxury text-base font-bold">
                No encontramos resultados para «{query}»
              </p>
              <p className="text-xs text-[#A29A93]">
                Intenta buscar por categorías como "Nombre", "Inicial", o "Corazón".
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-white rounded-2xl border border-[#EAE2D9] hover:border-[#C68B8B] transition-all flex items-center justify-between gap-3 group"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    setIsSearchOpen(false);
                    openProductDetail(product.id);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-[#F4EFEB] flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <h4 className="font-serif-luxury text-sm font-bold text-[#2D2421] group-hover:text-[#C68B8B] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#6E5D57] truncate">{product.description}</p>
                    <span className="text-xs font-bold text-[#2D2421]">
                      Desde ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    startCustomizationForProduct(product.id);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#F6ECEC] text-[#C68B8B] hover:bg-[#C68B8B] hover:text-white text-xs font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <span>Personalizar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
