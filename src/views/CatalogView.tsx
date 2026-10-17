import React, { useState, useEffect } from 'react';
import { usePaws } from '../context/PawsContext';
import { PAWS_CATALOG } from '../data/pawsCatalog';
import { api } from '../services/apiClient';

export const CatalogView: React.FC = () => {
  const { setActiveTab, updateCollarConfig, addToCart, showToast } = usePaws();
  const [filterSpecies, setFilterSpecies] = useState<'all' | 'perro' | 'gato'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>(PAWS_CATALOG);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products from REST API (GET /api/products)
  useEffect(() => {
    let isMounted = true;
    const fetchApiProducts = async () => {
      setIsLoading(true);
      try {
        const res = await api.getProducts({
          search: searchQuery.trim() || undefined,
          limit: 30,
        });
        if (isMounted && res && res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn('Using local catalog fallback for products:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchApiProducts();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const filteredProducts = products.filter((item) => {
    const matchesSpecies =
      filterSpecies === 'all' ||
      item.speciesCategory === filterSpecies ||
      item.speciesCategory === 'both';
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.material && item.material.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecies && matchesSearch;
  });

  const handleCustomizeCollar = (product: any) => {
    let leatherColor: any = 'cognac';
    const pName = (product.name || '').toLowerCase();
    if (pName.includes('petalo') || pName.includes('rosa')) leatherColor = 'rose';
    else if (pName.includes('menta') || pName.includes('salvia')) leatherColor = 'mint';
    else if (pName.includes('bruma') || pName.includes('marina')) leatherColor = 'sky';
    else if (pName.includes('lavanda')) leatherColor = 'lavender';

    updateCollarConfig({
      species: product.speciesCategory === 'gato' ? 'cat' : 'dog',
      basePrice: product.price > 1000 ? Math.round(product.price / 2500) : product.price,
      leather: leatherColor,
    });
    showToast(`Cargando modelo "${product.name}" en el Estudio de Diseño...`);
    setActiveTab('estudio-de-diseno');
  };

  return (
    <div className="w-full pt-6 pb-24">
      <div className="w-full px-5 md:px-8 lg:px-12 py-4">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3.5 py-1 bg-[#ffdad7] text-[#713531] text-xs rounded-full font-bold flex items-center gap-1 border border-[#ffb3ad]/60">
                <span className="material-symbols-outlined text-[14px]">local_mall</span> Catálogo Atelier
              </span>
              <span className="px-3.5 py-1 bg-[#b7ebd9] text-[#366759] text-xs rounded-full font-bold flex items-center gap-1 border border-[#b9eddc]">
                <span className="material-symbols-outlined text-[14px]">verified</span> Conectado a API REST
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl text-[#211a17] tracking-tight font-bold">
              Catálogo de Collares Artesanales
            </h1>
            <p className="text-sm text-[#534342] max-w-2xl mt-1">
              Modelos concebidos desde la anatomía canina y felina: bordes biselados con cera de abeja, costura de guarnicionero y placas de identificación con microcódigo QR.
            </p>
          </div>

          {/* Quick stats pills */}
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-xs border border-[#d8c1bf]/40 text-xs font-semibold text-[#534342]">
            <span className="flex items-center gap-1 text-[#366759]">
              <span className="material-symbols-outlined text-[16px]">eco</span> Curtición 100% Vegetal
            </span>
            <span className="w-px h-3.5 bg-[#d8c1bf]/60" />
            <a
              href="/api/docs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#8d4b47] hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">api</span> Documentación API
            </a>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#fff1eb]/70 p-3 rounded-2xl border border-[#d8c1bf]/30 mb-8">
          {/* Species tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-xs border border-[#d8c1bf]/30">
            <button
              type="button"
              onClick={() => setFilterSpecies('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterSpecies === 'all'
                  ? 'bg-[#d98a84] text-white shadow-xs'
                  : 'text-[#534342] hover:bg-[#fff8f6]'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterSpecies('perro')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterSpecies === 'perro'
                  ? 'bg-[#d98a84] text-white shadow-xs'
                  : 'text-[#534342] hover:bg-[#fff8f6]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">pets</span>
              Para Perros
            </button>
            <button
              type="button"
              onClick={() => setFilterSpecies('gato')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterSpecies === 'gato'
                  ? 'bg-[#d98a84] text-white shadow-xs'
                  : 'text-[#534342] hover:bg-[#fff8f6]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">cruelty_free</span>
              Para Gatos
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#867371] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por material, oro, plata, nombre..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#d8c1bf]/50 text-xs text-[#211a17] focus:outline-none focus:border-[#d98a84] focus:ring-2 focus:ring-[#ffdad7]/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#867371] hover:text-[#211a17]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-6 gap-2 text-xs text-[#8d4b47] font-semibold">
            <span className="animate-spin material-symbols-outlined text-[18px]">sync</span>
            <span>Consultando catálogo en tiempo real mediante API REST...</span>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const displayPrice = product.price > 1000 ? Math.round(product.price / 2500) : product.price;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 border border-[#d8c1bf]/40 shadow-[0_2px_12px_rgba(141,75,71,0.03)] hover:shadow-[0_8px_24px_rgba(141,75,71,0.08)] hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative w-full aspect-square bg-[#fff8f6] rounded-2xl overflow-hidden mb-4 border border-[#d8c1bf]/20">
                    <img
                      src={product.image}
                      alt={product.alt || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.badge1 && (
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#8d4b47] text-[11px] font-bold rounded-full shadow-xs border border-[#d8c1bf]/30">
                          {product.badge1}
                        </span>
                      )}
                      {product.badge2 && (
                        <span className="px-2.5 py-1 bg-[#b7ebd9]/90 backdrop-blur-sm text-[#366759] text-[10px] font-bold rounded-full shadow-xs border border-[#b9eddc]/50">
                          {product.badge2}
                        </span>
                      )}
                    </div>

                    {/* Species Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#534342] shadow-xs border border-[#d8c1bf]/30">
                      <span className="material-symbols-outlined text-[18px]">
                        {product.speciesCategory === 'gato' ? 'cruelty_free' : 'pets'}
                      </span>
                    </div>
                  </div>

                  {/* Rating & reviews */}
                  <div className="flex items-center gap-1.5 mb-1.5 text-xs text-[#867371]">
                    <div className="flex items-center text-[#d98a84]">
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="font-bold text-[#211a17] ml-0.5">{product.rating || 4.9}</span>
                    </div>
                    <span>·</span>
                    <span>{product.reviewCount || 120} reseñas verificadas</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#211a17] tracking-tight mb-1 group-hover:text-[#8d4b47] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#8d4b47] font-semibold mb-2">
                    {product.categoryTitle || product.category || 'Atelier Personalizado'}
                  </p>
                  <p className="text-xs text-[#534342] line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="p-2.5 rounded-xl bg-[#fff8f6] border border-[#d8c1bf]/20 text-[11px] text-[#534342] flex flex-col gap-1 mb-4">
                    <div className="flex items-center gap-1.5 text-[#366759] font-medium">
                      <span className="material-symbols-outlined text-[14px]">architecture</span>
                      <span>{product.width || `Material: ${product.material}`}</span>
                    </div>
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center justify-between pt-1 border-t border-[#d8c1bf]/20">
                        <span className="text-[#867371]">Colores de taller:</span>
                        <div className="flex items-center gap-1">
                          {product.colors.map((c: string, i: number) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="pt-2 border-t border-[#d8c1bf]/30 flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#867371]">Precio</span>
                    <span className="text-xl font-bold text-[#211a17]">
                      €{Number(displayPrice).toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCustomizeCollar(product)}
                      className="w-full py-2 px-3 rounded-xl bg-[#fff1eb] text-[#8d4b47] hover:bg-[#ffdad7] font-bold text-xs flex items-center justify-center gap-1 transition-colors border border-[#d8c1bf]/30"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>Personalizar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          productId: product.id,
                          name: product.name,
                          price: displayPrice,
                          quantity: 1,
                          details: `${product.material} · Incluye chapa QR`,
                          image: product.image,
                        })
                      }
                      className="w-full py-2 px-3 rounded-xl bg-[#d98a84] hover:bg-[#b86963] text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>Cesta</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Craft Assurance Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#fff1eb] via-[#fff8f6] to-[#b7ebd9]/40 border border-[#d8c1bf]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#b7ebd9] text-[#366759] flex items-center justify-center flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#211a17]">
                ¿Buscas una medida especial o tienes un perro con cuello atípico?
              </h3>
              <p className="text-xs sm:text-sm text-[#534342] mt-0.5">
                En nuestro taller confeccionamos collares a medida exacta sin coste adicional para galgos, podencos o cachorros en crecimiento.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('estudio-de-diseno')}
            className="px-6 py-3 rounded-full bg-[#d98a84] text-white text-xs sm:text-sm font-bold hover:bg-[#b86963] transition-colors shadow-xs flex items-center gap-2 flex-shrink-0"
          >
            <span>Abrir Estudio a Medida</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
