import React from 'react';
import { useApp } from '../../context/AppContext';
import { DESIGN_SYSTEM } from '../../data/designSystem';
import { X, Sparkles, Check, Palette, Type, Layers } from 'lucide-react';

export const DesignSystemModal: React.FC = () => {
  const { isDesignSystemOpen, setIsDesignSystemOpen } = useApp();

  if (!isDesignSystemOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2D2421]/50 backdrop-blur-xs"
        onClick={() => setIsDesignSystemOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE2D9] overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#EAE2D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F6ECEC] text-[#C68B8B] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-2xl font-bold text-[#2D2421]">
                  Design System NOVA
                </h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EBF1EE] text-[#789286] font-semibold border border-[#8FA89B]/30">
                  Google Stitch Style
                </span>
              </div>
              <p className="text-xs text-[#6E5D57]">
                Identidad visual propia para joyería personalizada de alta gama
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDesignSystemOpen(false)}
            className="p-2 rounded-full text-[#6E5D57] hover:bg-[#F4EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-8">
          {/* 1. Brand Concept */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EAE2D9]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880] font-bold">
              01 · Concepto de Marca
            </span>
            <h4 className="font-serif-luxury text-xl text-[#2D2421] font-bold mt-1">
              «{DESIGN_SYSTEM.brand.tagline}»
            </h4>
            <div className="flex flex-wrap gap-2 mt-3">
              {DESIGN_SYSTEM.brand.attributes.map((attr) => (
                <span
                  key={attr}
                  className="px-3 py-1 rounded-full bg-white text-xs text-[#2D2421] border border-[#EAE2D9] font-medium"
                >
                  ✓ {attr}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Color Palette */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2D2421]">
              <Palette className="w-4 h-4 text-[#C68B8B]" />
              <span>02 · Paleta Cromática Armónica</span>
            </div>
            <p className="text-xs text-[#6E5D57]">
              Tonos suaves, cálidos y femeninos sin saturación excesiva:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                ...DESIGN_SYSTEM.palette.primary,
                ...DESIGN_SYSTEM.palette.accents,
                ...DESIGN_SYSTEM.palette.neutrals,
              ].map((token) => (
                <div
                  key={token.name}
                  className="p-3 bg-white rounded-xl border border-[#EAE2D9] flex flex-col gap-2 shadow-xs"
                >
                  <div
                    className="w-full h-12 rounded-lg border border-black/10 shadow-inner flex items-end justify-end p-1.5"
                    style={{ backgroundColor: token.hex }}
                  >
                    <span
                      className={`text-[10px] font-mono px-1 rounded ${
                        token.textDark ? 'text-black/80 bg-white/70' : 'text-white bg-black/40'
                      }`}
                    >
                      {token.hex}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#2D2421] leading-tight">{token.name}</h5>
                    <p className="text-[10px] text-[#A29A93] leading-tight mt-0.5">{token.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Typography Pairings */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2D2421]">
              <Type className="w-4 h-4 text-[#C5A880]" />
              <span>03 · Sistema Tipográfico Dual</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-[#EAE2D9]">
                <span className="text-[10px] uppercase font-mono text-[#A29A93]">Títulos &amp; Marca</span>
                <p className="font-serif-luxury text-2xl text-[#2D2421] my-2">Cormorant / Playfair</p>
                <p className="text-xs text-[#6E5D57]">{DESIGN_SYSTEM.typography.display.characteristics}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#EAE2D9]">
                <span className="text-[10px] uppercase font-mono text-[#A29A93]">Textos &amp; Botones</span>
                <p className="font-sans text-xl font-bold text-[#2D2421] my-2">Plus Jakarta Sans</p>
                <p className="text-xs text-[#6E5D57]">{DESIGN_SYSTEM.typography.body.characteristics}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#EAE2D9]">
                <span className="text-[10px] uppercase font-mono text-[#A29A93]">Grabados Caligráficos</span>
                <p className="font-script text-2xl text-[#C68B8B] my-2">Alex Brush Cursive</p>
                <p className="text-xs text-[#6E5D57]">{DESIGN_SYSTEM.typography.script.characteristics}</p>
              </div>
            </div>
          </div>

          {/* 4. UX Principles */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2D2421]">
              <Layers className="w-4 h-4 text-[#8FA89B]" />
              <span>04 · Principios de Experiencia de Usuario (UI/UX)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DESIGN_SYSTEM.principles.map((pr) => (
                <div key={pr.number} className="p-4 bg-white rounded-xl border border-[#EAE2D9]">
                  <span className="text-xs font-mono font-bold text-[#C68B8B]">{pr.number}</span>
                  <h5 className="text-xs font-bold text-[#2D2421] mt-1">{pr.title}</h5>
                  <p className="text-xs text-[#6E5D57] mt-1 leading-relaxed">{pr.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#EAE2D9] flex items-center justify-between text-xs text-[#6E5D57]">
          <span>Garantía de consistencia en todas las pantallas</span>
          <button
            type="button"
            onClick={() => setIsDesignSystemOpen(false)}
            className="px-5 py-2 bg-[#2D2421] text-white rounded-full font-semibold text-xs hover:bg-[#433530]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
