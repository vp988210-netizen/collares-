import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INSPIRATION_STORIES } from '../data/inspiration';
import { Sparkles, ArrowRight, Quote } from 'lucide-react';

export const InspirationView: React.FC = () => {
  const { setCurrentView, startCustomizationForProduct } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = [
    'Todas',
    'Para ti',
    'Para mamá',
    'Para pareja',
    'Para amigas',
    'Para recordar',
    'Para regalar',
  ];

  const filteredStories = selectedCategory === 'Todas'
    ? INSPIRATION_STORIES
    : INSPIRATION_STORIES.filter((s) => s.category === selectedCategory);

  return (
    <div className="w-full pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 self-center px-3 py-1 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-semibold uppercase tracking-wider border border-[#E8C8C8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Editorial de Comunidad</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#2D2421] font-bold">
            Historias que llevamos cerca.
          </h1>
          <p className="text-sm text-[#6E5D57]">
            Más que metal precioso, cada collar es un talismán de amor propio, recuerdos imborrables y vínculos que trascienden el tiempo.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2D2421] text-white shadow-xs'
                  : 'bg-white text-[#6E5D57] hover:bg-[#FAF7F2] hover:text-[#2D2421] border border-[#EAE2D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stories Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-3xl border border-[#EAE2D9] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Media image */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-[#C68B8B] border border-[#E8C8C8]">
                  {story.category}
                </span>

                <span className="absolute bottom-3 right-3 text-[10px] bg-black/60 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-full font-medium">
                  {story.material}
                </span>
              </div>

              {/* Story Content */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] font-mono text-[#C5A880] uppercase tracking-wider font-semibold">
                    {story.necklaceName}
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#2D2421] leading-snug">
                    {story.title}
                  </h3>

                  <div className="relative p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE2D9] my-1">
                    <Quote className="w-4 h-4 text-[#C68B8B] mb-1 opacity-70" />
                    <p className="font-serif-luxury italic text-xs text-[#2D2421] leading-relaxed">
                      {story.quote}
                    </p>
                  </div>

                  <p className="text-xs text-[#6E5D57] leading-relaxed">
                    {story.story}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4EFEB] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#2D2421]">{story.author}</span>
                    <span className="text-[10px] text-[#A29A93]">{story.city}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (story.category === 'Para mamá') startCustomizationForProduct('collar-mama');
                      else if (story.category === 'Para pareja') startCustomizationForProduct('collar-pareja');
                      else if (story.category === 'Para recordar') startCustomizationForProduct('collar-zodiacal');
                      else startCustomizationForProduct('collar-nombre');
                    }}
                    className="px-4 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#F6ECEC] text-[#C68B8B] text-xs font-semibold tracking-wide transition-all border border-[#EAE2D9] flex items-center gap-1"
                  >
                    <span>Crear diseño</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Community Call to Action */}
        <div className="mt-16 bg-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#EAE2D9] text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
            Comparte tu Recuerdo
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#2D2421] font-bold max-w-lg">
            ¿Ya tienes tu collar NOVA? Nos encantaría conocer tu historia.
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5D57] max-w-md">
            Etiquétanos en Instagram con <strong className="text-[#2D2421]">#MiHistoriaNOVA</strong> o envíanos tu fotografía para aparecer en nuestra galería editorial.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView('personalize')}
            className="mt-2 px-8 py-3.5 rounded-full bg-[#C68B8B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B57A7A] shadow-xs transition-all"
          >
            Diseñar mi joya ahora
          </button>
        </div>
      </div>
    </div>
  );
};
