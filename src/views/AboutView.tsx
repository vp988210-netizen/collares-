import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Heart, Shield, Award, ChevronDown, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo sé que el material no cambiará de color o irritará mi piel?',
      a: 'Trabajamos exclusivamente con Plata de Ley 925 auténtica y baños de Oro de 18 quilates de 3 micras de espesor (el estándar de alta joyería europea). Son 100% libres de níquel, cadmio y plomo, garantizando biocompatibilidad total incluso con las pieles más reactivas.',
    },
    {
      q: '¿Puedo bañarme o hacer deporte con mi collar NOVA?',
      a: 'Nuestros collares están diseñados para acompañarte en tu vida cotidiana. Soportan agua dulce y sudor sin oxidarse. Sin embargo, para preservar el brillo máximo de metales preciosos durante décadas, recomendamos evitar el contacto directo continuo con piscinas cloradas, aguas termales o químicos abrasivos.',
    },
    {
      q: '¿Cuánto tiempo tarda la confección y el envío?',
      a: 'Al ser piezas hechas a medida por maestros orfebres, el tiempo de elaboración es de 3 a 5 días hábiles. El envío nacional asegurado toma entre 24 y 48 horas adicionales dependiendo de la ciudad de destino.',
    },
    {
      q: '¿Qué garantía tienen los collares y los grabados?',
      a: 'Ofrecemos 2 años de garantía total en herrajes, soldaduras y broches, y una garantía de por vida en la legibilidad del grabado láser. Además, si necesitas ajustar la longitud de tu cadena tras recibirla, lo hacemos sin costo en nuestro taller.',
    },
  ];

  return (
    <div className="w-full pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 self-center px-3 py-1 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-semibold uppercase tracking-wider border border-[#E8C8C8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Manifiesto del Atelier</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2D2421] font-bold tracking-tight">
            Joyas hechas para momentos que importan.
          </h1>
          <p className="font-serif-luxury italic text-lg sm:text-xl text-[#6E5D57]">
            «Una joya que cuenta tu historia.»
          </p>
        </div>

        {/* Narrative Split 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-[#EAE2D9] aspect-4/3">
            <img
              src="/src/assets/images/about_jewelry_artisan_1792195289816.jpg"
              alt="Orfebre tallando medalla en taller NOVA"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-5 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
              Nuestra Esencia
            </span>
            <h2 className="font-editorial text-3xl text-[#2D2421] font-bold leading-tight">
              Regalos, recuerdos y personas especiales que viven contigo
            </h2>
            <p className="text-sm text-[#6E5D57] leading-relaxed">
              En NOVA entendemos que un collar no es un adorno superficial. Es el nombre de tu hijo que acabas de abrazar por primera vez; es la fecha secreta de esa tarde en que supiste que habías encontrado a tu cómplice de vida; es la inicial de esa abuela cuyas palabras aún te guían.
            </p>
            <p className="text-sm text-[#6E5D57] leading-relaxed">
              Nacimos con una convicción clara: devolver la emoción humana y la devoción artesanal a una industria que se había vuelto masiva y genérica. Cada pieza que sale de nuestro taller es irrepetible.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-6 bg-white rounded-3xl border border-[#EAE2D9] shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#F6ECEC] text-[#C68B8B] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Emoción Genuina
              </h4>
              <p className="text-xs text-[#6E5D57] mt-1.5 leading-relaxed">
                Diseñamos para conmover, celebrar vínculos indestructibles y guardar momentos para siempre.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#EAE2D9] shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] text-[#C5A880] flex items-center justify-center mb-4 border border-[#EAE2D9]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Metales Nobles
              </h4>
              <p className="text-xs text-[#6E5D57] mt-1.5 leading-relaxed">
                Solo Plata de Ley 925 y Oro 18K certificados. Hipoalergénicos y de larga duración.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#EAE2D9] shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF1EE] text-[#789286] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Cero Desperdicio
              </h4>
              <p className="text-xs text-[#6E5D57] mt-1.5 leading-relaxed">
                Fabricamos exclusivamente bajo pedido. Sin almacenes de piezas olvidadas ni sobreproducción.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#EAE2D9] shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#F6ECEC] text-[#C68B8B] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Empaque de Regalo
              </h4>
              <p className="text-xs text-[#6E5D57] mt-1.5 leading-relaxed">
                Cada joya viaja en un estuche de terciopelo rosa empolvado con cinta de seda y tarjeta caligrafiada.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] font-bold">
              Transparencia y Cuidado
            </span>
            <h3 className="font-editorial text-3xl font-bold text-[#2D2421] mt-1">
              Preguntas Frecuentes
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#EAE2D9] overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif-luxury text-base font-bold text-[#2D2421]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A29A93] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#C68B8B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#6E5D57] leading-relaxed border-t border-[#FAF7F2] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setCurrentView('personalize')}
              className="px-8 py-3.5 rounded-full bg-[#C68B8B] hover:bg-[#B57A7A] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 mx-auto"
            >
              <span>Comenzar a diseñar mi joya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
