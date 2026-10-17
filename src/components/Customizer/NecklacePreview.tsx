import React, { useState } from 'react';
import { CustomizationOptions } from '../../types';

interface NecklacePreviewProps {
  customization: CustomizationOptions;
}

export const NecklacePreview: React.FC<NecklacePreviewProps> = ({ customization }) => {
  const [viewMode, setViewMode] = useState<'neck' | 'flat'>('neck');
  const [isSparkling, setIsSparkling] = useState(false);

  const { material, chain, text, fontStyle, symbol, length, necklaceType } = customization;

  // Metal color mappings for SVG gradients
  const metalPalettes = {
    oro: {
      stop1: '#FFF2C6',
      stop2: '#E5C384',
      stop3: '#C5A880',
      stop4: '#9A7B4F',
      textFill: '#533E1D',
      specular: '#FFFFFF',
      chainStroke: '#D8B876',
      label: 'Oro 18K',
    },
    'oro-rosa': {
      stop1: '#FFE6DF',
      stop2: '#F4BAAC',
      stop3: '#D89688',
      stop4: '#A86B60',
      textFill: '#5B2C24',
      specular: '#FFFFFF',
      chainStroke: '#DCA092',
      label: 'Oro Rosa 18K',
    },
    plata: {
      stop1: '#FFFFFF',
      stop2: '#E5E7EB',
      stop3: '#C3C7CE',
      stop4: '#8F96A0',
      textFill: '#374151',
      specular: '#FFFFFF',
      chainStroke: '#B6BBC4',
      label: 'Plata de Ley 925',
    },
  };

  const currentMetal = metalPalettes[material] || metalPalettes.oro;

  // Font family mapping for SVG text
  const fontFamilies: Record<string, string> = {
    caligrafica: "'Alex Brush', cursive",
    serif: "'Cormorant Garamond', serif",
    sans: "'Plus Jakarta Sans', sans-serif",
    romana: "'Playfair Display', serif",
  };

  const currentFont = fontFamilies[fontStyle] || fontFamilies.caligrafica;

  // Chain drape calculation based on length
  const chainDropMap = {
    '40cm': { curveY: 175, pendantY: 182, label: '40 cm · Gargantilla' },
    '45cm': { curveY: 195, pendantY: 202, label: '45 cm · Princesa (Estándar)' },
    '50cm': { curveY: 215, pendantY: 222, label: '50 cm · Matinée' },
    '55cm': { curveY: 235, pendantY: 242, label: '55 cm · Largo Elegante' },
  };

  const currentDrop = chainDropMap[length] || chainDropMap['45cm'];

  // Chain stroke width & dash array for different chain styles
  const chainStyles = {
    delicada: { strokeWidth: 1.4, dashArray: 'none', loopSize: 1.2 },
    clasica: { strokeWidth: 2.2, dashArray: '2, 1', loopSize: 1.8 },
    gruesa: { strokeWidth: 3.4, dashArray: '4, 2', loopSize: 2.4 },
  };

  const currentChainStyle = chainStyles[chain] || chainStyles.delicada;

  // Symbols visual representation
  const renderSymbolGlyph = (sym: string) => {
    switch (sym) {
      case 'corazon':
        return '♡';
      case 'estrella':
        return '☆';
      case 'infinito':
        return '∞';
      case 'luna':
        return '☾';
      case 'flor':
        return '🌸';
      case 'destello':
        return '✧';
      default:
        return '';
    }
  };

  const triggerSparkle = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 900);
  };

  return (
    <div className="relative w-full bg-[#FAF7F2] rounded-3xl p-6 lg:p-8 border border-[#EAE2D9] shadow-sm flex flex-col items-center justify-between min-h-[560px] overflow-hidden">
      {/* Subtle radial ambient warmth */}
      <div className="absolute inset-0 bg-radial from-[#F5ECE8]/50 via-transparent to-transparent pointer-events-none" />

      {/* Top Bar of Visualizer */}
      <div className="w-full flex items-center justify-between z-10">
        {/* View Mode Toggle */}
        <div className="inline-flex p-1 bg-white/90 backdrop-blur-md rounded-full border border-[#EAE2D9] shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('neck')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              viewMode === 'neck'
                ? 'bg-[#C68B8B] text-white shadow-xs'
                : 'text-[#6E5D57] hover:text-[#2D2421]'
            }`}
          >
            En Escote
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flat')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              viewMode === 'flat'
                ? 'bg-[#C68B8B] text-white shadow-xs'
                : 'text-[#6E5D57] hover:text-[#2D2421]'
            }`}
          >
            Plano de Taller
          </button>
        </div>

        {/* Live Material & Length Badge */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-[#EAE2D9] text-xs font-medium text-[#6E5D57]">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-inner"
              style={{
                backgroundColor:
                  material === 'oro'
                    ? '#E5C384'
                    : material === 'oro-rosa'
                    ? '#F4BAAC'
                    : '#C3C7CE',
              }}
            />
            <span>{currentMetal.label}</span>
            <span>·</span>
            <span>{currentDrop.label.split('·')[0].trim()}</span>
          </div>

          {/* Sparkle micro-interaction button */}
          <button
            type="button"
            onClick={triggerSparkle}
            title="Efecto brillo de taller"
            className="w-8 h-8 rounded-full bg-white text-[#C5A880] border border-[#EAE2D9] shadow-xs hover:bg-[#FDFBF7] flex items-center justify-center transition-transform active:scale-90"
          >
            <span className="text-sm">✧</span>
          </button>
        </div>
      </div>

      {/* Main Vector Rendering Stage */}
      <div className="relative w-full flex-1 flex items-center justify-center my-4 py-2">
        {viewMode === 'neck' ? (
          /* Escote / Silhouette View */
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            {/* Elegant stylized neck & collarbone contour */}
            <svg
              viewBox="0 0 380 380"
              className="w-full h-full drop-shadow-sm select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Metallic Linear Gradient for Pendant */}
                <linearGradient id="necklaceMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={currentMetal.stop1} />
                  <stop offset="35%" stopColor={currentMetal.stop2} />
                  <stop offset="70%" stopColor={currentMetal.stop3} />
                  <stop offset="100%" stopColor={currentMetal.stop4} />
                </linearGradient>

                {/* Shimmer Specular Sweep */}
                <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity={isSparkling ? "0.85" : "0.35"} />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>

                {/* Drop shadow filter for pendant */}
                <filter id="pendantShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2D2421" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Gentle feminine silhouette contour */}
              <g opacity="0.35">
                {/* Neck & Shoulders soft curvature */}
                <path
                  d="M140,20 C140,80 135,110 80,170 C30,225 15,280 10,380 L370,380 C365,280 350,225 300,170 C245,110 240,80 240,20 Z"
                  fill="#EFE8DE"
                />
                {/* Collarbones delicate lines */}
                <path
                  d="M100,195 Q145,210 180,220"
                  stroke="#D8CDC0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M280,195 Q235,210 200,220"
                  stroke="#D8CDC0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* Suprasternal notch shadow */}
                <ellipse cx="190" cy="216" rx="6" ry="2.5" fill="#D8CDC0" opacity="0.6" />
              </g>

              {/* Necklace Chain Left Loop */}
              <path
                d={`M 135 60 Q 138 120 190 ${currentDrop.curveY}`}
                stroke={currentMetal.chainStroke}
                strokeWidth={currentChainStyle.strokeWidth}
                strokeDasharray={currentChainStyle.dashArray}
                fill="none"
                strokeLinecap="round"
              />
              {/* Necklace Chain Right Loop */}
              <path
                d={`M 245 60 Q 242 120 190 ${currentDrop.curveY}`}
                stroke={currentMetal.chainStroke}
                strokeWidth={currentChainStyle.strokeWidth}
                strokeDasharray={currentChainStyle.dashArray}
                fill="none"
                strokeLinecap="round"
              />

              {/* Connecting Jump Ring */}
              <circle
                cx="190"
                cy={currentDrop.curveY}
                r={currentChainStyle.loopSize + 2}
                stroke={currentMetal.chainStroke}
                strokeWidth="1.6"
                fill="none"
              />

              {/* Dynamic Pendant Assembly */}
              <g
                transform={`translate(190, ${currentDrop.pendantY})`}
                filter="url(#pendantShadow)"
                className="transition-transform duration-300"
              >
                {/* 1. Name Necklace: Cutout Bar or Name Ribbon */}
                {necklaceType === 'nombre' && (
                  <g>
                    {/* Background Plate / Backing Pill */}
                    <rect
                      x={-Math.max(48, (text.length || 6) * 6.5)}
                      y="-14"
                      width={Math.max(96, (text.length || 6) * 13)}
                      height="28"
                      rx="14"
                      fill="url(#necklaceMetalGrad)"
                      stroke={currentMetal.stop4}
                      strokeWidth="0.8"
                    />
                    {/* Shimmer sweep */}
                    <rect
                      x={-Math.max(48, (text.length || 6) * 6.5)}
                      y="-14"
                      width={Math.max(96, (text.length || 6) * 13)}
                      height="28"
                      rx="14"
                      fill="url(#shimmerGradient)"
                    />
                    {/* Engraved or cut-out Name Text */}
                    <text
                      x={symbol !== 'ninguno' ? -8 : 0}
                      y="4"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={currentMetal.textFill}
                      fontFamily={currentFont}
                      fontSize={fontStyle === 'caligrafica' ? 18 : 13}
                      fontWeight={fontStyle === 'caligrafica' ? 'normal' : '600'}
                      letterSpacing={fontStyle === 'romana' ? '2.5px' : '0.5px'}
                      className="select-none"
                    >
                      {text || 'NOVA'}
                    </text>
                    {/* Attached Symbol */}
                    {symbol !== 'ninguno' && (
                      <text
                        x={Math.max(16, (text.length || 6) * 4.5)}
                        y="3"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={currentMetal.textFill}
                        fontSize="12"
                      >
                        {renderSymbolGlyph(symbol)}
                      </text>
                    )}
                  </g>
                )}

                {/* 2. Initial Medallion */}
                {necklaceType === 'inicial' && (
                  <g>
                    {/* Circular Coin */}
                    <circle
                      cx="0"
                      cy="0"
                      r="20"
                      fill="url(#necklaceMetalGrad)"
                      stroke={currentMetal.stop4}
                      strokeWidth="0.8"
                    />
                    {/* Outer Bevel Rim */}
                    <circle cx="0" cy="0" r="17.5" fill="none" stroke={currentMetal.stop1} strokeWidth="0.8" opacity="0.8" />
                    {/* Engraved Initial */}
                    <text
                      x="0"
                      y="1.5"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={currentMetal.textFill}
                      fontFamily={currentFont}
                      fontSize={fontStyle === 'caligrafica' ? 24 : 17}
                      fontWeight="bold"
                    >
                      {(text || 'M').charAt(0).toUpperCase()}
                    </text>
                    {/* Small accent charm hanging */}
                    {symbol !== 'ninguno' && (
                      <g transform="translate(18, 14)">
                        <circle cx="0" cy="0" r="7" fill="url(#necklaceMetalGrad)" stroke={currentMetal.stop4} strokeWidth="0.5" />
                        <text x="0" y="1" textAnchor="middle" dominantBaseline="middle" fill={currentMetal.textFill} fontSize="7">
                          {renderSymbolGlyph(symbol)}
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* 3. Heart Pendant */}
                {necklaceType === 'corazon' && (
                  <g>
                    {/* Heart Shape */}
                    <path
                      d="M0,-5 C-18,-24 -36,2 0,26 C36,2 18,-24 0,-5 Z"
                      fill="url(#necklaceMetalGrad)"
                      stroke={currentMetal.stop4}
                      strokeWidth="0.8"
                    />
                    <path
                      d="M0,-5 C-18,-24 -36,2 0,26 C36,2 18,-24 0,-5 Z"
                      fill="url(#shimmerGradient)"
                    />
                    {/* Inner Inscription */}
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={currentMetal.textFill}
                      fontFamily={currentFont}
                      fontSize={fontStyle === 'caligrafica' ? 14 : 9.5}
                      fontWeight="600"
                      letterSpacing="0.8px"
                    >
                      {text.length > 8 ? text.substring(0, 8) : text || 'AMOR'}
                    </text>
                    {symbol !== 'ninguno' && (
                      <text x="0" y="14" textAnchor="middle" dominantBaseline="middle" fill={currentMetal.textFill} fontSize="9">
                        {renderSymbolGlyph(symbol)}
                      </text>
                    )}
                  </g>
                )}

                {/* 4. Date Bar / Other Necklaces */}
                {(necklaceType === 'fecha' || necklaceType === 'zodiacal' || necklaceType === 'pareja' || necklaceType === 'mama' || necklaceType === 'familia') && (
                  <g>
                    {/* Elegant Horizontal Bar */}
                    <rect
                      x="-44"
                      y="-10"
                      width="88"
                      height="20"
                      rx="5"
                      fill="url(#necklaceMetalGrad)"
                      stroke={currentMetal.stop4}
                      strokeWidth="0.8"
                    />
                    <rect x="-44" y="-10" width="88" height="20" rx="5" fill="url(#shimmerGradient)" />
                    <text
                      x={symbol !== 'ninguno' ? -6 : 0}
                      y="1.5"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={currentMetal.textFill}
                      fontFamily={currentFont}
                      fontSize={fontStyle === 'romana' ? 10 : 11}
                      fontWeight="600"
                      letterSpacing="1.8px"
                    >
                      {text || '12.05.2024'}
                    </text>
                    {symbol !== 'ninguno' && (
                      <text x="30" y="2" textAnchor="middle" dominantBaseline="middle" fill={currentMetal.textFill} fontSize="9">
                        {renderSymbolGlyph(symbol)}
                      </text>
                    )}
                  </g>
                )}
              </g>
            </svg>
          </div>
        ) : (
          /* Plano de Taller / Flat Macro Tray View */
          <div className="relative w-full max-w-[420px] aspect-square flex flex-col items-center justify-center p-6 bg-white/70 rounded-2xl border border-[#EAE2D9] shadow-inner">
            <div className="text-center mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9A7B4F]">
                Plano de Taller · Escala 1:1
              </span>
            </div>

            {/* Flat Jewelry Showcase */}
            <div className="relative w-full h-44 bg-[#F5ECE8]/60 rounded-xl border border-[#E8C8C8]/50 flex items-center justify-center p-4 overflow-hidden">
              {/* Velvet Texture Backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#C68B8B_0.5px,transparent_0.5px)] [background-size:12px_12px] opacity-25" />

              {/* Horizontal Chain Line */}
              <div
                className="absolute w-3/4 h-[2px] top-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: currentMetal.chainStroke,
                  boxShadow: '0 1px 3px rgba(45,36,33,0.15)',
                }}
              />

              {/* Flat Pendant Display */}
              <div
                className="relative z-10 px-5 py-2.5 rounded-full flex items-center justify-center gap-2 border shadow-md transition-all"
                style={{
                  background: `linear-gradient(135deg, ${currentMetal.stop1}, ${currentMetal.stop2}, ${currentMetal.stop3})`,
                  borderColor: currentMetal.stop4,
                }}
              >
                <span
                  style={{
                    fontFamily: currentFont,
                    color: currentMetal.textFill,
                    fontSize: fontStyle === 'caligrafica' ? '1.4rem' : '1rem',
                    letterSpacing: fontStyle === 'romana' ? '2px' : '0.5px',
                  }}
                  className="font-semibold select-none"
                >
                  {text || 'NOVA'}
                </span>
                {symbol !== 'ninguno' && (
                  <span className="text-sm" style={{ color: currentMetal.textFill }}>
                    {renderSymbolGlyph(symbol)}
                  </span>
                )}
              </div>
            </div>

            {/* Dimension Indicators */}
            <div className="w-full flex justify-between items-center text-[11px] text-[#6E5D57] font-mono mt-3 px-2">
              <span>Longitud: {length}</span>
              <span>Cadena: {chain}</span>
              <span>Metal: {currentMetal.label}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Atelier Guarantees Bar */}
      <div className="w-full grid grid-cols-3 gap-2 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-[#EAE2D9] shadow-xs text-center z-10">
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold text-[#2D2421]">Oro 18K &amp; Plata 925</span>
          <span className="text-[10px] text-[#6E5D57]">Metales certificados</span>
        </div>
        <div className="flex flex-col items-center border-x border-[#EAE2D9]">
          <span className="text-[11px] font-bold text-[#2D2421]">Láser de Joyería</span>
          <span className="text-[10px] text-[#6E5D57]">Grabado indeleble</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold text-[#2D2421]">Garantía Taller</span>
          <span className="text-[10px] text-[#6E5D57]">2 años &amp; estuche</span>
        </div>
      </div>
    </div>
  );
};
