import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { Product, MaterialType } from '../types';
import { Search, Heart, Star, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const CollectionView: React.FC = () => {
  const {
    openProductDetail,
    startCustomizationForProduct,
    toggleFavorite,
    isFavorite,
  } = useApp();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<string>('populares');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceMax, setPriceMax] = useState<number>(70);

  // Filter logic
  const filteredProducts = PRODUCTS.filter((p) => {
    // Category filter
    if (selectedCategory !== 'todos' && p.category !== selectedCategory) {
      return false;
    }

    // Material filter
    if (selectedMaterial !== 'todos') {
      if (!p.availableMaterials.includes(selectedMaterial as MaterialType)) {
        return false;
      }
    }

    // Price filter
    if (p.price > priceMax) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // Populares
  });

  const categories = [
    { id: 'todos', label: 'Todos los Collares' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'inicial', label: 'Inicial' },
    { id: 'corazon', label: 'Corazón' },
    { id: 'fecha', label: 'Fecha' },
    { id: 'zodiacal', label: 'Zodiacal' },
    { id: 'pareja', label: 'Pareja' },
    { id: 'mama', label: 'Mamá' },
    { id: 'familia', label: 'Familia' },
  ];

  return (
    <div className="w-full pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col gap-2 mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
            Catálogo Oficial · Joyería de Autor
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#2D2421] font-bold">
            Colección de Collares
          </h1>
          <p className="text-sm text-[#6E5D57]">
            Piezas hechas especialmente para ti. Elige tu silueta favorita y personalízala en nuestro configurador con tu propio nombre, inicial o fecha.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-[#EAE2D9] shadow-xs mb-10 flex flex-col gap-4">
          {/* Top row: Search input & Sort selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#A29A93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, estilo o significado..."
                className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] text-xs sm:text-sm text-[#2D2421] rounded-full border border-[#EAE2D9] focus:outline-none focus:border-[#C68B8B] placeholder:text-[#A29A93]"
              />
            </div>

            {/* Sort & Quick Material Filter */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
              {/* Material Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-[#6E5D57]">
                <span className="text-[#A29A93] font-medium hidden sm:inline">Material:</span>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#EAE2D9] rounded-full px-3 py-1.5 text-xs text-[#2D2421] focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todos los materiales</option>
                  <option value="oro">Oro 18K</option>
                  <option value="plata">Plata de Ley 925</option>
                  <option value="oro-rosa">Oro Rosa 18K</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-[#6E5D57]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C68B8B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#EAE2D9] rounded-full px-3 py-1.5 text-xs text-[#2D2421] focus:outline-none cursor-pointer font-medium"
                >
                  <option value="populares">Más Populares</option>
                  <option value="rating">Mejor Calificados</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#F4EFEB] scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D2421] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#6E5D57] hover:bg-[#F4EFEB] hover:text-[#2D2421]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Result */}
        <div className="flex items-center justify-between text-xs text-[#6E5D57] mb-6 px-1">
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> collares personalizados
          </span>
          {(selectedCategory !== 'todos' || selectedMaterial !== 'todos' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedMaterial('todos');
                setSearchQuery('');
              }}
              className="text-[#C68B8B] hover:underline font-semibold"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-3 bg-white rounded-3xl border border-[#EAE2D9] p-8">
            <span className="text-3xl">✨</span>
            <h3 className="font-serif-luxury text-xl font-bold text-[#2D2421]">
              No hay joyas con estos filtros
            </h3>
            <p className="text-xs text-[#6E5D57] max-w-sm">
              Prueba cambiando el material o el término de búsqueda para ver más modelos.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedMaterial('todos');
                setSearchQuery('');
              }}
              className="mt-2 px-6 py-2 rounded-full bg-[#C68B8B] text-white text-xs font-semibold"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const favorite = isFavorite(product.id);
              return (
                <article
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#EAE2D9] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Frame */}
                  <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => openProductDetail(product.id)}
                      referrerPolicy="no-referrer"
                    />

                    {/* Tag Personalizable */}
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-[#C68B8B] border border-[#E8C8C8] shadow-xs">
                      Personalizable
                    </span>

                    {/* Favorite Heart Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label="Añadir a deseos"
                      className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-[#6E5D57] hover:text-[#C68B8B] flex items-center justify-center transition-colors shadow-xs active:scale-90"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorite ? 'fill-[#C68B8B] text-[#C68B8B]' : ''}`}
                      />
                    </button>

                    {/* Craft Time chip */}
                    <div className="absolute bottom-2.5 left-3.5 text-[10px] bg-black/50 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-full font-medium">
                      {product.craftTime}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs text-[#A29A93]">
                        <span className="capitalize">{product.category} · Oro &amp; Plata</span>
                        <div className="flex items-center gap-1 text-[#C5A880]">
                          <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
                          <span className="font-semibold text-[#2D2421]">{product.rating}</span>
                          <span className="text-[10px] text-[#A29A93]">({product.reviewCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => openProductDetail(product.id)}
                        className="font-serif-luxury text-lg font-bold text-[#2D2421] group-hover:text-[#C68B8B] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#6E5D57] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F4EFEB] flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#A29A93]">Precio base</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold font-sans text-[#2D2421]">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#A29A93] line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => startCustomizationForProduct(product.id)}
                        className="px-5 py-2.5 rounded-full bg-[#C68B8B] hover:bg-[#B57A7A] text-white text-xs font-semibold tracking-wide transition-all shadow-xs active:scale-95"
                      >
                        Personalizar
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
