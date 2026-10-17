import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChainLength,
  ChainType,
  FontStyleType,
  MaterialType,
  NecklaceType,
  SymbolType,
} from '../../types';

export const NecklaceConfigurator: React.FC = () => {
  const { customizerDraft, updateCustomizerDraft, addToCart } = useApp();

  const { necklaceType, material, chain, text, fontStyle, symbol, length } = customizerDraft;

  // Dynamic price calculation
  const getDynamicPrice = () => {
    let base = 42.0;
    if (necklaceType === 'nombre') base = 49.0;
    else if (necklaceType === 'inicial') base = 42.0;
    else if (necklaceType === 'corazon') base = 46.0;
    else if (necklaceType === 'fecha') base = 48.0;

    // Material modifier
    if (material === 'oro') base += 7.0;
    if (material === 'oro-rosa') base += 5.0;

    // Chain modifier
    if (chain === 'gruesa') base += 6.0;

    // Symbol modifier
    if (symbol !== 'ninguno') base += 3.5;

    return base;
  };

  const calculatedPrice = getDynamicPrice();

  const handleAddToCart = () => {
    const typeNames: Record<NecklaceType, string> = {
      nombre: 'Collar con Nombre Personalizado',
      inicial: 'Collar con Inicial Tallada',
      corazon: 'Collar Corazón de Autor',
      fecha: 'Collar con Fecha Conmemorativa',
      zodiacal: 'Collar Zodiacal Constelación',
      pareja: 'Collar Dúo Pareja',
      mama: 'Collar Mamá Joya',
      familia: 'Collar Familia Generaciones',
    };

    addToCart({
      productId: `custom-${necklaceType}`,
      name: typeNames[necklaceType] || 'Collar Personalizado NOVA',
      price: calculatedPrice,
      quantity: 1,
      image:
        necklaceType === 'corazon'
          ? '/src/assets/images/product_necklace_heart_1792195289058.jpg'
          : necklaceType === 'nombre'
          ? '/src/assets/images/product_necklace_name_1792195288438.jpg'
          : '/src/assets/images/hero_necklace_luxury_1792195289923.jpg',
      customization: { ...customizerDraft },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Tipo de Collar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE2D9] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="font-serif-luxury text-lg text-[#2D2421] font-bold">Tipo de Collar</h3>
          </div>
          <span className="text-xs text-[#6E5D57] font-medium">Elige tu silueta base</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { id: 'nombre', label: 'Nombre', desc: 'Silueta corrida' },
              { id: 'inicial', label: 'Inicial', desc: 'Medalla redonda' },
              { id: 'corazon', label: 'Corazón', desc: 'Dije de amor' },
              { id: 'fecha', label: 'Fecha', desc: 'Barra grabada' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                let defaultText = text;
                if (item.id === 'inicial' && text.length > 2) defaultText = text.charAt(0);
                if (item.id === 'fecha' && !text.includes('.')) defaultText = '12.05.2024';
                updateCustomizerDraft({ necklaceType: item.id, text: defaultText });
              }}
              className={`p-3 rounded-xl border text-center transition-all ${
                necklaceType === item.id
                  ? 'border-[#C68B8B] bg-[#FDFBF7] shadow-xs ring-1 ring-[#C68B8B]'
                  : 'border-[#EAE2D9] bg-white hover:bg-[#FAF7F2] text-[#6E5D57]'
              }`}
            >
              <div
                className={`text-sm font-semibold ${
                  necklaceType === item.id ? 'text-[#C68B8B]' : 'text-[#2D2421]'
                }`}
              >
                {item.label}
              </div>
              <div className="text-[10px] text-[#A29A93] mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Material */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE2D9] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="font-serif-luxury text-lg text-[#2D2421] font-bold">Material</h3>
          </div>
          <span className="text-xs text-[#C5A880] font-semibold">Metales Nobles Certificados</span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {(
            [
              {
                id: 'plata' as MaterialType,
                name: 'Plata de Ley',
                sub: '925 Rodiada',
                swatch: 'bg-gradient-to-tr from-[#9CA3AF] via-[#E5E7EB] to-white',
              },
              {
                id: 'oro' as MaterialType,
                name: 'Oro 18K',
                sub: 'Baño 3 Micras',
                swatch: 'bg-gradient-to-tr from-[#C5A880] via-[#E5C384] to-[#FFF2C6]',
              },
              {
                id: 'oro-rosa' as MaterialType,
                name: 'Oro Rosa',
                sub: '18K Satinado',
                swatch: 'bg-gradient-to-tr from-[#D49B9B] via-[#F4BAAC] to-[#FFE6DF]',
              },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateCustomizerDraft({ material: item.id })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                material === item.id
                  ? 'border-[#C68B8B] bg-[#FDFBF7] shadow-xs ring-1 ring-[#C68B8B]'
                  : 'border-[#EAE2D9] bg-white hover:bg-[#FAF7F2]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full ${item.swatch} shadow-xs border border-black/10`}
              />
              <span
                className={`text-xs font-bold ${
                  material === item.id ? 'text-[#C68B8B]' : 'text-[#2D2421]'
                }`}
              >
                {item.name}
              </span>
              <span className="text-[10px] text-[#A29A93]">{item.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Cadena */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE2D9] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="font-serif-luxury text-lg text-[#2D2421] font-bold">Tipo de Cadena</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'delicada' as ChainType, label: 'Delicada', detail: '0.9 mm sutil' },
              { id: 'clasica' as ChainType, label: 'Clásica', detail: '1.4 mm eslabón' },
              { id: 'gruesa' as ChainType, label: 'Gruesa', detail: '2.2 mm (+€6)' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateCustomizerDraft({ chain: item.id })}
              className={`p-3 rounded-xl border text-center transition-all ${
                chain === item.id
                  ? 'border-[#C68B8B] bg-[#FDFBF7] text-[#C68B8B] font-bold shadow-xs ring-1 ring-[#C68B8B]'
                  : 'border-[#EAE2D9] text-[#6E5D57] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="text-xs font-semibold">{item.label}</div>
              <div className="text-[10px] text-[#A29A93] mt-0.5">{item.detail}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Texto & Límite de Caracteres */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE2D9] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-bold flex items-center justify-center">
              4
            </span>
            <label htmlFor="necklace-text-input" className="font-serif-luxury text-lg text-[#2D2421] font-bold cursor-pointer">
              Escribe tu nombre o palabra
            </label>
          </div>
          <span className="text-xs text-[#A29A93] font-mono">
            {text.length}/12 caracteres
          </span>
        </div>

        <div className="relative">
          <input
            id="necklace-text-input"
            type="text"
            maxLength={12}
            value={text}
            onChange={(e) => updateCustomizerDraft({ text: e.target.value })}
            placeholder={necklaceType === 'fecha' ? '12.05.2024' : 'Tu palabra o nombre...'}
            className="w-full px-4 py-3 bg-[#FAF7F2] text-[#2D2421] rounded-xl border border-[#EAE2D9] focus:outline-none focus:ring-2 focus:ring-[#C68B8B]/40 focus:border-[#C68B8B] text-base font-semibold tracking-wide placeholder:text-[#A29A93]"
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-[11px] text-[#6E5D57]">
          <span>Sugerencias: Tu nombre, el de tus hijos, fecha especial o una palabra guía.</span>
        </div>
      </div>

      {/* 5. Tipo de Letra */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE2D9] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-bold flex items-center justify-center">
              5
            </span>
            <h3 className="font-serif-luxury text-lg text-[#2D2421] font-bold">Tipo de Letra</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              {
                id: 'caligrafica' as FontStyleType,
                label: 'Caligráfica',
                sample: 'Nova',
                fontClass: 'font-script text-xl',
              },
              {
                id: 'serif' as FontStyleType,
                label: 'Serif Elegante',
                sample: 'Nova',
                fontClass: 'font-serif-luxury italic text-base',
              },
              {
                id: 'sans' as FontStyleType,
                label: 'Minimal Sans',
                sample: 'NOVA',
                fontClass: 'font-sans font-semibold text-xs tracking-wider',
              },
              {
                id: 'romana' as FontStyleType,
                label: 'Romana Clásica',
                sample: 'NOVA',
                fontClass: 'font-editorial font-bold text-xs tracking-widest',
              },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateCustomizerDraft({ fontStyle: item.id })}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                fontStyle === item.id
                  ? 'border-[#C68B8B] bg-[#FDFBF7] shadow-xs ring-1 ring-[#C68B8B]'
                  : 'border-[#EAE2D9] bg-white hover:bg-[#FAF7F2]'
              }`}
            >
              <span className={`text-[#2D2421] ${item.fontClass}`}>{item.sample}</span>
              <span
                className={`text-[11px] ${
                  fontStyle === item.id ? 'text-[#C68B8B] font-bold' : 'text-[#6E5D57]'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Símbolo */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE2D9] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-bold flex items-center justify-center">
              6
            </span>
            <h3 className="font-serif-luxury text-lg text-[#2D2421] font-bold">Símbolo</h3>
          </div>
          <span className="text-xs text-[#6E5D57]">Dije o grabado complementario</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {(
            [
              { id: 'ninguno' as SymbolType, glyph: '—', label: 'Sin dije' },
              { id: 'corazon' as SymbolType, glyph: '♡', label: 'Corazón' },
              { id: 'estrella' as SymbolType, glyph: '☆', label: 'Estrella' },
              { id: 'infinito' as SymbolType, glyph: '∞', label: 'Infinito' },
              { id: 'luna' as SymbolType, glyph: '☾', label: 'Luna' },
              { id: 'flor' as SymbolType, glyph: '🌸', label: 'Flor' },
              { id: 'destello' as SymbolType, glyph: '✧', label: 'Brillo' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateCustomizerDraft({ symbol: item.id })}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                symbol === item.id
                  ? 'border-[#C68B8B] bg-[#FDFBF7] shadow-xs ring-1 ring-[#C68B8B]'
                  : 'border-[#EAE2D9] bg-white hover:bg-[#FAF7F2]'
              }`}
            >
              <span
                className={`text-base font-bold ${
                  symbol === item.id ? 'text-[#C68B8B]' : 'text-[#2D2421]'
                }`}
              >
                {item.glyph}
              </span>
              <span className="text-[10px] text-[#6E5D57] truncate w-full text-center">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Longitud de Cadena */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE2D9] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#F6ECEC] text-[#C68B8B] text-xs font-bold flex items-center justify-center">
              7
            </span>
            <h3 className="font-serif-luxury text-lg text-[#2D2421] font-bold">
              Longitud de Cadena
            </h3>
          </div>
          <span className="text-xs text-[#6E5D57]">Incluye extensión de +5 cm</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { id: '40cm' as ChainLength, name: '40 cm', desc: 'Cuello alto' },
              { id: '45cm' as ChainLength, name: '45 cm', desc: 'Princesa (Favorito)' },
              { id: '50cm' as ChainLength, name: '50 cm', desc: 'Escote medio' },
              { id: '55cm' as ChainLength, name: '55 cm', desc: 'Largo estilizado' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateCustomizerDraft({ length: item.id })}
              className={`p-3 rounded-xl border text-center transition-all ${
                length === item.id
                  ? 'border-[#C68B8B] bg-[#FDFBF7] text-[#C68B8B] font-bold shadow-xs ring-1 ring-[#C68B8B]'
                  : 'border-[#EAE2D9] text-[#6E5D57] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="text-xs font-bold">{item.name}</div>
              <div className="text-[10px] text-[#A29A93] mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Order Bar */}
      <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EAE2D9] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-col">
          <span className="text-xs text-[#6E5D57]">Precio Total Personalizado</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-sans text-[#2D2421]">
              ${calculatedPrice.toFixed(2)}
            </span>
            <span className="text-xs text-[#A29A93]">(IVA incluido)</span>
          </div>
          <span className="text-[11px] text-[#8FA89B] font-medium flex items-center gap-1 mt-0.5">
            <span>✓</span> Envío asegurado y estuche de regalo incluidos
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#C68B8B] hover:bg-[#B57A7A] text-white rounded-full font-sans font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Agregar al carrito</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
