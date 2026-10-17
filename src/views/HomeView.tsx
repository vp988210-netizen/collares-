import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Heart, Star, Sparkles, Shield, Clock } from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setCurrentView,
    startCustomizationForProduct,
    openProductDetail,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-8 pb-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6 items-start text-left">
              {/* Subtle Atelier Tagline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-semibold tracking-wider uppercase border border-[#E8C8C8]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Atelier de Joyería Fina &amp; Personalizada</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2D2421] font-bold tracking-tight leading-[1.1] text-balance">
                Una joya que cuenta <span className="italic font-serif text-[#C68B8B]">tu historia.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-base sm:text-lg text-[#6E5D57] max-w-xl leading-relaxed">
                Personaliza tu collar con un nombre, una fecha o esa palabra que significa todo para ti. Piezas forjadas a mano en oro 18K y plata fina para acompañarte siempre.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('personalize')}
                  className="px-8 py-3.5 rounded-full bg-[#C68B8B] hover:bg-[#B57A7A] text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Crear mi collar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentView('collection')}
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#2D2421] border border-[#EAE2D9] text-sm font-semibold tracking-wide transition-all active:scale-95 shadow-xs"
                >
                  Ver colección
                </button>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#6E5D57]">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#2D2421]">4.95/5</span>
                  <span>(+4.200 historias)</span>
                </div>
                <span>·</span>
                <span>Oro 18K &amp; Plata de Ley 925</span>
                <span>·</span>
                <span>Envío asegurado gratis</span>
              </div>
            </div>

            {/* Right Media Column (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-[#EAE2D9] bg-[#F4EFEB] aspect-4/3 lg:aspect-4/5 group">
                <img
                  src="/src/assets/images/hero_necklace_luxury_1792195289923.jpg"
                  alt="Collar personalizado de oro sobre piedra travertino"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Artisan Quote Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EAE2D9] shadow-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] font-bold">
                      Edición Exclusiva
                    </span>
                    <span className="font-serif-luxury text-sm font-bold text-[#2D2421]">
                      Collar con Inicial Tallada
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => startCustomizationForProduct('collar-inicial')}
                    className="px-3.5 py-1.5 rounded-full bg-[#2D2421] text-white text-xs font-semibold hover:bg-[#433530] transition-colors"
                  >
                    Personalizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: "Tu historia. Tu diseño. Tu joya." (3 Benefits) */}
      <section className="w-full py-16 bg-[#F4EFEB]/60 border-y border-[#EAE2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
              El Arte de la Personalización
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#2D2421] font-bold mt-1 text-balance">
              Tu historia. Tu diseño. Tu joya.
            </h2>
            <p className="text-sm text-[#6E5D57] mt-2">
              Unimos la joyería tradicional de autor con tecnología interactiva en tiempo real para que cada detalle sea exactamente como lo soñaste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 01 */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE2D9] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="font-serif-luxury text-4xl text-[#C68B8B] font-bold block mb-3">
                  01
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#2D2421] mb-2">
                  Personalización única
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5D57] leading-relaxed">
                  Tú decides el nombre, la inicial, esa fecha grabada o el símbolo especial. Visualízalo en vivo antes de que pase a las manos de nuestros orfebres.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F4EFEB] flex items-center gap-2 text-xs font-medium text-[#C68B8B]">
                <span>Configurador interactivo 100% fiel</span>
              </div>
            </div>

            {/* Benefit 02 */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE2D9] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="font-serif-luxury text-4xl text-[#C5A880] font-bold block mb-3">
                  02
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#2D2421] mb-2">
                  Materiales seleccionados
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5D57] leading-relaxed">
                  Auténtica Plata de Ley 925 y baños de Oro de 18K y Oro Rosa de 3 micras. Libres de níquel, resistentes al agua y diseñados para toda la vida.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F4EFEB] flex items-center gap-2 text-xs font-medium text-[#C5A880]">
                <span>Metales preciosos con certificado</span>
              </div>
            </div>

            {/* Benefit 03 */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE2D9] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="font-serif-luxury text-4xl text-[#789286] font-bold block mb-3">
                  03
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#2D2421] mb-2">
                  Hecho especialmente para ti
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5D57] leading-relaxed">
                  Cero sobreproducción. Cada collar se forja, pule y graba por encargo bajo estrictos estándares artesanales y se empaca en estuche de regalo.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F4EFEB] flex items-center gap-2 text-xs font-medium text-[#789286]">
                <span>Taller orfebre en 3 a 5 días hábiles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
                Colección Selecta
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#2D2421] font-bold mt-1">
                Collares que marcan momentos
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentView('collection')}
              className="text-xs font-semibold text-[#2D2421] hover:text-[#C68B8B] flex items-center gap-1.5 transition-colors"
            >
              <span>Ver todos los 8 collares</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const favorite = isFavorite(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#EAE2D9] overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Tag Personalizable */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-[#C68B8B] border border-[#E8C8C8]">
                      Personalizable
                    </span>

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label="Guardar en favoritos"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#6E5D57] hover:text-[#C68B8B] flex items-center justify-center transition-colors shadow-xs"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorite ? 'fill-[#C68B8B] text-[#C68B8B]' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#A29A93] mb-1">
                        <span className="capitalize">{product.materialDefault} 18K / 925</span>
                        <div className="flex items-center gap-1 text-[#C5A880]">
                          <Star className="w-3 h-3 fill-[#C5A880]" />
                          <span className="font-semibold text-[#2D2421]">{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => openProductDetail(product.id)}
                        className="font-serif-luxury text-lg font-bold text-[#2D2421] hover:text-[#C68B8B] cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#6E5D57] mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#F4EFEB] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#A29A93] block">Desde</span>
                        <span className="text-base font-bold font-sans text-[#2D2421]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => startCustomizationForProduct(product.id)}
                        className="px-4 py-2 rounded-full bg-[#C68B8B] hover:bg-[#B57A7A] text-white text-xs font-semibold tracking-wide shadow-xs transition-all active:scale-95"
                      >
                        Personalizar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ATELIER & CRAFTSMANSHIP BANNER */}
      <section className="w-full py-16 bg-[#FAF7F2] border-t border-[#EAE2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-[#EAE2D9] aspect-16/9 lg:aspect-4/3">
              <img
                src="/src/assets/images/about_jewelry_artisan_1792195289816.jpg"
                alt="Manos artesanas en el taller de joyería NOVA"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col gap-5 items-start text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] font-bold">
                El Alma de Nuestro Taller
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#2D2421] font-bold leading-tight">
                Joyas hechas para momentos que importan.
              </h2>
              <p className="text-sm text-[#6E5D57] leading-relaxed">
                Creemos que la joyería más valiosa no es la que presume opulencia, sino la que alberga un significado íntimo. Detrás de cada pulido, cada corte láser y cada soldadura hay un tributo a tus hijos, a tu amor o al recuerdo de alguien inolvidable.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#EAE2D9]">
                  <Clock className="w-5 h-5 text-[#C68B8B] mb-1" />
                  <h4 className="text-xs font-bold text-[#2D2421]">3-5 Días Hábiles</h4>
                  <p className="text-[11px] text-[#6E5D57]">Confección personalizada a mano</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EAE2D9]">
                  <Shield className="w-5 h-5 text-[#8FA89B] mb-1" />
                  <h4 className="text-xs font-bold text-[#2D2421]">Garantía Vitalicia</h4>
                  <p className="text-[11px] text-[#6E5D57]">En legibilidad de grabados</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentView('about')}
                className="mt-2 text-xs font-semibold text-[#2D2421] hover:text-[#C68B8B] flex items-center gap-1.5 transition-colors underline decoration-[#E8C8C8] underline-offset-4"
              >
                <span>Conoce la historia de nuestros artesanos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
