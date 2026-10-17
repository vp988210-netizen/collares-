import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, MOCK_REVIEWS } from '../data/products';
import { MaterialType } from '../types';
import { Star, Shield, Clock, Heart, ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    setCurrentView,
    startCustomizationForProduct,
    toggleFavorite,
    isFavorite,
    addToCart,
  } = useApp();

  const product = selectedProduct || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materialDefault);
  const [fastEngravingText, setFastEngravingText] = useState('NOVA');

  const favorite = isFavorite(product.id);

  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const handleQuickAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      customization: {
        necklaceType: product.category,
        material: selectedMaterial,
        chain: 'delicada',
        text: fastEngravingText.toUpperCase(),
        fontStyle: 'caligrafica',
        symbol: 'corazon',
        length: '45cm',
      },
    });
  };

  return (
    <div className="w-full pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => setCurrentView('collection')}
          className="inline-flex items-center gap-1.5 text-xs text-[#6E5D57] hover:text-[#2D2421] mb-6 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la colección</span>
        </button>

        {/* Main Grid: Gallery Left + Sticky Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Left (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Big Main Image */}
            <div className="relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#EAE2D9] shadow-sm">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Tag Personalizable */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold tracking-wider uppercase text-[#C68B8B] border border-[#E8C8C8]">
                Personalizable
              </span>

              {/* Favorite Button */}
              <button
                type="button"
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-[#6E5D57] hover:text-[#C68B8B] flex items-center justify-center transition-colors shadow-xs"
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-[#C68B8B] text-[#C68B8B]' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#C68B8B] ring-2 ring-[#C68B8B]/20 shadow-xs'
                        : 'border-[#EAE2D9] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Vista ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Customer Reviews Section */}
            <div className="mt-8 pt-8 border-t border-[#EAE2D9] flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-[#2D2421]">
                    Opiniones de Clientes
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#6E5D57]">
                    <div className="flex text-[#C5A880]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C5A880]" />
                      ))}
                    </div>
                    <span className="font-bold text-[#2D2421]">{product.rating} de 5</span>
                    <span>·</span>
                    <span>{product.reviewCount} valoraciones verificadas</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_REVIEWS.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white border border-[#EAE2D9] shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#2D2421]">{rev.author}</span>
                        <span className="text-[11px] text-[#A29A93]">{rev.date}</span>
                      </div>
                      <div className="flex text-[#C5A880]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C5A880]" />
                        ))}
                      </div>
                      <p className="text-xs text-[#6E5D57] leading-relaxed italic">
                        «{rev.comment}»
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#FAF7F2] flex items-center justify-between text-[11px] text-[#A29A93]">
                      <span>Grabado: <strong>{rev.necklaceText}</strong></span>
                      <span>{rev.material}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details & Purchase Module Right (5 cols, sticky) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE2D9] shadow-sm flex flex-col gap-6 lg:sticky lg:top-28">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
                Joyería Fina Artesanal
              </span>
              <h1 className="font-editorial text-3xl font-bold text-[#2D2421] mt-1">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-bold font-sans text-[#2D2421]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A29A93] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#8FA89B] font-semibold bg-[#EBF1EE] px-2.5 py-0.5 rounded-full">
                  IVA &amp; Estuche incluido
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6E5D57] leading-relaxed">
              {product.description}
            </p>

            {/* Estimated Craftsmanship Time */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D9] flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#C68B8B] flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2D2421]">
                  {product.craftTime}
                </span>
                <span className="text-[11px] text-[#6E5D57]">
                  Cada pieza requiere forja, calado láser y doble pulido manual
                </span>
              </div>
            </div>

            {/* Material Selector in PDP */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#2D2421]">Metal noble:</label>
              <div className="grid grid-cols-3 gap-2">
                {product.availableMaterials.map((mat: MaterialType) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setSelectedMaterial(mat)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                      selectedMaterial === mat
                        ? 'border-[#C68B8B] bg-[#FDFBF7] text-[#C68B8B] shadow-xs'
                        : 'border-[#EAE2D9] text-[#6E5D57] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {mat.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Fast Customization Preview Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fast-engraving-input" className="text-xs font-bold text-[#2D2421] flex justify-between cursor-pointer">
                <span>Grabado inicial previsto:</span>
                <span className="text-[11px] text-[#A29A93]">Máx. 12 caracteres</span>
              </label>
              <input
                id="fast-engraving-input"
                type="text"
                maxLength={12}
                value={fastEngravingText}
                onChange={(e) => setFastEngravingText(e.target.value)}
                placeholder="Escribe tu grabado..."
                className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-[#C68B8B]"
              />
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={() => startCustomizationForProduct(product.id)}
                className="w-full py-4 rounded-full bg-[#C68B8B] hover:bg-[#B57A7A] text-white font-semibold text-xs tracking-wider uppercase shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Personalizar este collar en 3D</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-full py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#2D2421] border border-[#EAE2D9] font-semibold text-xs tracking-wider uppercase transition-all"
              >
                Añadir directo a la bolsa
              </button>
            </div>

            {/* Bullet Details */}
            <div className="pt-4 border-t border-[#F4EFEB] flex flex-col gap-2">
              <h4 className="text-xs font-bold text-[#2D2421]">Especificaciones:</h4>
              <ul className="flex flex-col gap-1.5 text-xs text-[#6E5D57]">
                {product.details.map((detail: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#8FA89B] flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
