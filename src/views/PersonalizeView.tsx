import React from 'react';
import { useApp } from '../context/AppContext';
import { NecklacePreview } from '../components/Customizer/NecklacePreview';
import { NecklaceConfigurator } from '../components/Customizer/NecklaceConfigurator';
import { Sparkles, ShieldCheck, HeartHandshake, RefreshCw } from 'lucide-react';

export const PersonalizeView: React.FC = () => {
  const { customizerDraft } = useApp();

  return (
    <div className="w-full pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col gap-2 mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 self-center px-3 py-1 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-semibold uppercase tracking-wider border border-[#E8C8C8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Configurador Interactivo de Joyería</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#2D2421] font-bold">
            Diseña tu collar
          </h1>
          <p className="text-sm text-[#6E5D57]">
            Personaliza en tiempo real cada elemento: metal noble, eslabón de cadena, tipografía grabada a láser y dije especial. Lo que ves es exactamente lo que creamos para ti.
          </p>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT ZONE: Big Live Visualizer (lg:col-span-6 or 7) */}
          <div className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-28">
            <NecklacePreview customization={customizerDraft} />

            {/* Atelier Guarantee Ribbon under visualizer */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#EAE2D9] shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F6ECEC] text-[#C68B8B] flex items-center justify-center flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D2421]">
                    Garantía de Satisfacción Total
                  </h4>
                  <p className="text-[11px] text-[#6E5D57]">
                    Grabado con láser óptico de micro-precisión y pulido artesanal a mano.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#8FA89B] font-bold bg-[#EBF1EE] px-2.5 py-1 rounded-full border border-[#8FA89B]/30 whitespace-nowrap">
                100% Personalizado
              </span>
            </div>
          </div>

          {/* RIGHT ZONE: Customization Panel Controls (lg:col-span-6 or 5) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <NecklaceConfigurator />
          </div>
        </div>

        {/* Value Props Strip */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#EAE2D9]">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE2D9] shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#F6ECEC] text-[#C68B8B] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Grabado Láser de Precisión
              </h4>
              <p className="text-xs text-[#6E5D57] mt-1 leading-relaxed">
                Trazos definidos microscópicamente que resisten el agua, perfumes y el paso de los años sin borrarse.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EAE2D9] shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] text-[#C5A880] flex items-center justify-center flex-shrink-0 border border-[#EAE2D9]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Baño Oro 18K de 3 Micras
              </h4>
              <p className="text-xs text-[#6E5D57] mt-1 leading-relaxed">
                Doble espesor sobre Plata 925 que asegura un brillo dorado suntuoso y durabilidad prolongada.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EAE2D9] shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#EBF1EE] text-[#789286] flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">
                Reajuste de Cadena Gratuito
              </h4>
              <p className="text-xs text-[#6E5D57] mt-1 leading-relaxed">
                ¿Prefieres otra longitud tras probártelo? Ajustamos la longitud sin costo adicional en nuestro taller.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
