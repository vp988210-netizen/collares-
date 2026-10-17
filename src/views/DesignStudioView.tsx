import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';
import { CollarSize, HardwareFinish, LeatherColor, SpeciesType, CharmType } from '../types/paws';
import { api } from '../services/apiClient';

export const DesignStudioView: React.FC = () => {
  const { collarConfig, updateCollarConfig, calculatedPrice, addToCart, showToast } = usePaws();
  const [viewMode, setViewMode] = useState<'neck' | 'flat'>('neck');

  const {
    species,
    size,
    cm,
    leather,
    leatherName,
    leatherHex,
    metal,
    metalName,
    metalHex,
    charm,
    petName,
    petPhone,
    font,
    reflective,
    airtag,
  } = collarConfig;

  const leatherOptions: {
    id: LeatherColor;
    name: string;
    label: string;
    hex: [string, string, string];
  }[] = [
    { id: 'rose', name: 'Rosa Pétalo Pastel', label: 'Pétalo', hex: ['#d98a84', '#b86963', '#8d4b47'] },
    { id: 'mint', name: 'Menta Aguamarina', label: 'Menta', hex: ['#86c6b4', '#579b8a', '#366759'] },
    { id: 'sky', name: 'Azul Cielo Pastel', label: 'Cielo', hex: ['#83a3b9', '#5d8299', '#436276'] },
    { id: 'cognac', name: 'Cognac Florentino', label: 'Cognac', hex: ['#9a4026', '#732b17', '#551e0e'] },
    { id: 'lavender', name: 'Lavanda Silvestre', label: 'Lavanda', hex: ['#b8a6be', '#92798e', '#574354'] },
  ];

  const metalOptions: {
    id: HardwareFinish;
    name: string;
    label: string;
    hex: [string, string, string];
  }[] = [
    { id: 'brass', name: 'Latón Dorado Macizo', label: 'Latón', hex: ['#fff1c7', '#e8c97e', '#bd9a44'] },
    { id: 'black', name: 'Negro Mate PVD', label: 'Negro Mate', hex: ['#555555', '#2b2b2b', '#111111'] },
    { id: 'rosegold', name: 'Oro Rosado Satinado', label: 'Oro Rosa', hex: ['#ffd0c2', '#e29b8c', '#a86255'] },
    { id: 'silver', name: 'Plata Antigua Niquelada', label: 'Plata Vintage', hex: ['#e6e6e6', '#b0b0b0', '#707070'] },
  ];

  const sizeOptions: { size: CollarSize; range: string; defaultCm: number }[] = [
    { size: 'XS', range: '20-27 cm', defaultCm: 24 },
    { size: 'S', range: '26-32 cm', defaultCm: 28 },
    { size: 'M', range: '32-40 cm', defaultCm: 34 },
    { size: 'L', range: '38-48 cm', defaultCm: 44 },
    { size: 'XL', range: '46-60 cm', defaultCm: 54 },
  ];

  const handleAddToCart = async () => {
    let customId: number | undefined;
    try {
      const metalMaterial =
        metal === 'brass'
          ? 'Latón Dorado'
          : metal === 'rosegold'
          ? 'Oro Rosa'
          : metal === 'silver'
          ? 'Plata Vintage'
          : 'Negro Mate';

      const customResult: any = await api.createCustomization({
        productId: species === 'cat' ? 11 : 9,
        text: petName || 'TOBY',
        material: metalMaterial,
        font: font.includes('Garamond') ? 'Elegante' : 'Moderna',
        symbol: charm,
        chainLength: size,
        petPhone: petPhone,
        reflective,
        airtag,
      });
      customId = customResult?.id;
    } catch (err) {
      console.warn('Backend customization sync error, continuing with local record:', err);
    }

    addToCart({
      productId: species === 'cat' ? 11 : 9,
      name: `Collar ${petName || 'Mascota'} (Talla ${size})`,
      price: calculatedPrice,
      quantity: 1,
      details: `${leatherName} · ${metalName.split(' ')[0]} · Placa QR${customId ? ` #${customId}` : ''}`,
    });
  };

  return (
    <div className="w-full pt-6 pb-28">
      <div className="w-full px-5 md:px-8 lg:px-12 py-4">
        {/* Header Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-3.5 py-1 bg-[#b7ebd9] text-[#366759] text-xs rounded-full font-bold flex items-center gap-1 border border-[#b9eddc]">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Taller
                Artesanal Español
              </span>
              <span className="px-3.5 py-1 bg-[#c6e7fe] text-[#18394c] text-xs rounded-full flex items-center gap-1 border border-[#aacbe2]/60 font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#436276]">eco</span> Curtido
                Vegetal Certificado
              </span>
              <span className="px-3.5 py-1 bg-[#ffdad7] text-[#713531] text-xs rounded-full flex items-center gap-1 border border-[#ffb3ad]/60 font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#8d4b47]">palette</span> Paleta
                Atelier Dulce Pastel
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl text-[#211a17] tracking-tight font-bold mt-1">
              Estudio de Confección a Medida
            </h1>
            <p className="text-sm text-[#534342] max-w-2xl">
              Configura el collar definitivo para tu compañero: anatómico, grabado con láser de fibra y
              garantizado por 5 años con acabados pastel artesanales.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-auto bg-white px-5 py-2.5 rounded-full shadow-xs border border-[#d8c1bf]/40">
            <div className="flex items-center gap-2 text-[#366759]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="text-xs font-bold">Ajuste Garantizado 100%</span>
            </div>
            <div className="w-px h-4 bg-[#d8c1bf]/60" />
            <div className="flex items-center gap-2 text-[#d98a84]">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              <span className="text-xs font-bold text-[#5c2522]">Hecho a mano</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Collar Visualizer Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="relative w-full bg-gradient-to-br from-[#fff1eb] via-[#f9ebe5] to-[#c6e7fe]/30 rounded-3xl p-6 shadow-xs border border-[#d8c1bf]/30 flex flex-col items-center justify-between min-h-[550px] overflow-hidden">
              {/* Top View Mode Switcher */}
              <div className="w-full flex items-center justify-between z-10">
                <div className="flex items-center bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-xs border border-[#d8c1bf]/30">
                  <button
                    type="button"
                    onClick={() => setViewMode('neck')}
                    className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 font-bold ${
                      viewMode === 'neck'
                        ? 'bg-[#d98a84] text-white shadow-xs'
                        : 'text-[#534342] hover:text-[#211a17]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">pets</span>
                    <span>En Silueta</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('flat')}
                    className={`px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 font-bold ${
                      viewMode === 'flat'
                        ? 'bg-[#d98a84] text-white shadow-xs'
                        : 'text-[#534342] hover:text-[#211a17]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
                    <span>Plano Taller</span>
                  </button>
                </div>

                {/* Dynamic Pet Species Badge */}
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-xs border border-[#d8c1bf]/30 text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#8d4b47]">
                    {species === 'dog' ? 'pets' : 'cruelty_free'}
                  </span>
                  <span className="font-bold text-[#211a17]">
                    {species === 'dog' ? 'Perro' : 'Gato'} · Cuello {cm} cm
                  </span>
                </div>
              </div>

              {/* Dynamic Interactive SVG Canvas */}
              <div className="w-full flex-1 flex flex-col items-center justify-center relative my-4">
                {viewMode === 'neck' ? (
                  <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center transition-all duration-300">
                    {/* Ambient Silhouette Glow */}
                    <div className="absolute inset-4 rounded-full opacity-40 bg-gradient-to-tr from-[#b9eddc] via-[#ffdad7] to-[#c6e7fe] blur-2xl" />

                    {/* Dog / Pet Silhouette Contour */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-85">
                      <svg className="w-full h-full max-w-[340px] text-[#eee0da]" fill="none" viewBox="0 0 360 360">
                        <path
                          d="M180,60 C235,60 270,105 270,175 C270,250 220,295 180,295 C140,295 90,250 90,175 C90,105 125,60 180,60 Z"
                          fill="currentColor"
                          fillOpacity="0.3"
                        />
                        <circle cx="140" cy="140" fill="#211a17" opacity="0.12" r="8" />
                        <circle cx="220" cy="140" fill="#211a17" opacity="0.12" r="8" />
                        <path d="M165,165 Q180,180 195,165" opacity="0.15" stroke="#211a17" strokeLinecap="round" strokeWidth="3" />
                      </svg>
                    </div>

                    {/* Collar Precision Vector */}
                    <div className="relative z-10 w-full flex items-center justify-center">
                      <svg className="w-full max-w-[340px] drop-shadow-xl overflow-visible" viewBox="0 0 320 220">
                        <defs>
                          <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                            <stop offset="0%" stopColor={leatherHex[0]} />
                            <stop offset="50%" stopColor={leatherHex[1]} />
                            <stop offset="100%" stopColor={leatherHex[2]} />
                          </linearGradient>

                          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={metalHex[0]} />
                            <stop offset="45%" stopColor={metalHex[1]} />
                            <stop offset="100%" stopColor={metalHex[2]} />
                          </linearGradient>

                          <pattern id="stitchPattern" width="12" height="6" patternUnits="userSpaceOnUse">
                            <rect x="2" y="2" width="6" height="2" rx="1" fill="#ffffff" fillOpacity="0.9" />
                          </pattern>
                        </defs>

                        {/* Collar Back Loop */}
                        <path
                          d="M 60 95 C 60 40, 260 40, 260 95"
                          fill="none"
                          opacity="0.75"
                          stroke="url(#leatherGrad)"
                          strokeLinecap="round"
                          strokeWidth="26"
                        />

                        {/* Collar Front Curve */}
                        <path
                          d="M 45 95 C 45 185, 275 185, 275 95"
                          fill="none"
                          stroke="url(#leatherGrad)"
                          strokeLinecap="round"
                          strokeWidth="32"
                        />

                        {/* Reflective Stitching Overlay */}
                        {reflective && (
                          <path
                            d="M 45 95 C 45 185, 275 185, 275 95"
                            fill="none"
                            stroke="url(#stitchPattern)"
                            strokeLinecap="round"
                            strokeWidth="32"
                            opacity="0.95"
                          />
                        )}

                        {/* Edge Burnish Shadow */}
                        <path
                          d="M 45 106 C 45 196, 275 196, 275 106"
                          fill="none"
                          opacity="0.18"
                          stroke="#372f2b"
                          strokeLinecap="round"
                          strokeWidth="2"
                        />

                        {/* Rivets & Keepers */}
                        <circle cx="85" cy="135" r="4.5" fill="url(#metalGrad)" />
                        <circle cx="85" cy="135" r="3.5" fill="none" opacity="0.3" stroke="#372f2b" strokeWidth="0.8" />
                        <rect x="74" y="116" width="9" height="34" rx="3" fill="url(#leatherGrad)" stroke="url(#metalGrad)" strokeWidth="1.5" />

                        {/* Buckle */}
                        <g transform="translate(68, 102)">
                          <rect x="0" y="0" width="22" height="32" rx="5" fill="none" stroke="url(#metalGrad)" strokeWidth="4.5" />
                          <line x1="11" y1="2" x2="11" y2="30" stroke="url(#metalGrad)" strokeLinecap="round" strokeWidth="3.5" />
                        </g>

                        {/* Cat Safety Breakaway Clasp */}
                        {species === 'cat' && (
                          <g transform="translate(52, 92)">
                            <rect x="0" y="0" width="18" height="24" rx="4" fill="#372f2b" />
                            <path d="M6,6 L12,18 M12,6 L6,18" stroke="#ffffff" strokeWidth="1.5" />
                          </g>
                        )}

                        {/* Center Engraved Metal Nameplate */}
                        <g transform="translate(108, 142)">
                          <rect
                            x="0"
                            y="0"
                            width="104"
                            height="32"
                            rx="6"
                            fill="url(#metalGrad)"
                            filter="drop-shadow(0 2px 5px rgba(55,47,43,0.22))"
                          />
                          <circle cx="8" cy="16" r="2.2" fill="#390a0a" opacity="0.65" />
                          <circle cx="96" cy="16" r="2.2" fill="#390a0a" opacity="0.65" />
                          <text
                            x="52"
                            y="16"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#390a0a"
                            fontFamily={font}
                            fontSize="12"
                            fontWeight="700"
                            letterSpacing="1.2"
                          >
                            {petName || 'TOBY'}
                          </text>
                          <text
                            x="52"
                            y="25"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#5c2522"
                            fontFamily={font}
                            fontSize="6.8"
                            fontWeight="600"
                            opacity="0.9"
                          >
                            {petPhone || '+34 612 345 678'}
                          </text>
                        </g>

                        {/* Micro QR Tag */}
                        <g transform="translate(225, 126)">
                          <circle cx="12" cy="12" r="12" fill="url(#metalGrad)" filter="drop-shadow(0 2px 3px rgba(55,47,43,0.2))" />
                          <rect x="6" y="6" width="12" height="12" rx="1.5" fill="#211a17" />
                          <rect x="7" y="7" width="3" height="3" fill="#ffffff" />
                          <rect x="14" y="7" width="3" height="3" fill="#ffffff" />
                          <rect x="7" y="14" width="3" height="3" fill="#ffffff" />
                          <rect x="12" y="12" width="2" height="2" fill="#ffffff" />
                          <circle cx="12" cy="0" r="2" fill="none" stroke="url(#metalGrad)" strokeWidth="1.5" />
                        </g>

                        {/* D-Ring & Charm Ring */}
                        <g transform="translate(160, 168)">
                          <path d="M -9 4 C -9 15, 9 15, 9 4 Z" fill="none" stroke="url(#metalGrad)" strokeWidth="3" />
                          <circle cx="0" cy="17" r="4.5" fill="none" stroke="url(#metalGrad)" strokeWidth="2" />

                          {/* AirTag Holder Case */}
                          {airtag && (
                            <g transform="translate(0, 36)">
                              <circle cx="0" cy="0" r="14" fill="#372f2b" stroke="url(#metalGrad)" strokeWidth="2" />
                              <circle cx="0" cy="0" r="8" fill="#f4e5e0" />
                              <circle cx="0" cy="0" r="4" fill="#8d4b47" />
                            </g>
                          )}

                          {/* Hanging Charm */}
                          {!airtag && (
                            <g transform="translate(0, 34)">
                              {charm === 'bone' && (
                                <path
                                  d="M-8,-2 C-10,-6 -14,-4 -14,-1 C-14,2 -10,3 -8,1 L-3,1 L-3,7 C-5,5 -9,5 -9,8 C-9,11 -5,12 -2,10 L2,10 C5,12 9,11 9,8 C9,5 5,5 3,7 L3,1 L8,1 C10,3 14,2 14,-1 C14,-4 10,-6 8,-2 L3,-2 L3,-7 C5,-5 9,-5 9,-8 C9,-11 5,-12 2,-10 L-2,-10 C-5,-12 -9,-11 -9,-8 C-9,-5 -5,-5 -3,-7 L-3,-2 Z"
                                  fill="url(#metalGrad)"
                                  filter="drop-shadow(0 2px 3px rgba(55,47,43,0.25))"
                                  transform="scale(0.85)"
                                />
                              )}
                              {charm === 'fish' && (
                                <path
                                  d="M -10 0 C -4 -7 6 -7 10 0 C 6 7 -4 7 -10 0 Z M 10 0 L 16 -6 L 14 0 L 16 6 Z"
                                  fill="url(#metalGrad)"
                                  filter="drop-shadow(0 2px 3px rgba(55,47,43,0.25))"
                                />
                              )}
                              {charm === 'acorn' && (
                                <g transform="scale(0.9)">
                                  <path d="M-8,-2 C-8,-7 8,-7 8,-2 Z" fill="url(#metalGrad)" opacity="0.9" />
                                  <path d="M-7,-2 C-7,6 0,10 0,10 C0,10 7,6 7,-2 Z" fill="url(#metalGrad)" />
                                </g>
                              )}
                              {charm === 'bell' && (
                                <g transform="scale(0.9)">
                                  <circle cx="0" cy="0" r="8" fill="url(#metalGrad)" />
                                  <circle cx="0" cy="4" r="1.5" fill="#372f2b" />
                                </g>
                              )}
                            </g>
                          )}
                        </g>
                      </svg>
                    </div>
                  </div>
                ) : (
                  /* Flat Laid View */
                  <div className="relative w-full flex flex-col items-center justify-center py-10">
                    <div className="relative w-full max-w-lg h-24 bg-[#f4e5e0]/80 rounded-2xl p-2 flex items-center justify-center shadow-inner overflow-hidden border border-[#d8c1bf]/40">
                      <div
                        className="w-11/12 h-10 rounded-xl relative flex items-center justify-between px-6 shadow-md transition-colors duration-300"
                        style={{ backgroundColor: leatherHex[0] }}
                      >
                        {reflective && (
                          <div className="absolute inset-x-2 inset-y-1 rounded border-dashed border-white/80 border-t border-b" />
                        )}
                        <div className="w-7 h-12 -ml-3 rounded-lg bg-[#c6e7fe] shadow flex items-center justify-center border border-[#aacbe2]">
                          <div className="w-2 h-8 bg-white/70 rounded-full" />
                        </div>

                        <div
                          className="px-5 py-1.5 rounded-lg text-[#390a0a] shadow flex flex-col items-center border border-amber-300/60"
                          style={{
                            background: `linear-gradient(135deg, ${metalHex[0]}, ${metalHex[1]})`,
                          }}
                        >
                          <span className="text-[13px] font-bold leading-tight" style={{ fontFamily: font }}>
                            {petName || 'TOBY'}
                          </span>
                          <span className="text-[9px] font-mono leading-tight">{petPhone}</span>
                        </div>

                        <div className="w-7 h-7 rounded-full bg-[#b9eddc] flex items-center justify-center shadow text-[#002019] border border-[#b7ebd9]">
                          <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                        </div>

                        <div className="flex items-center gap-2 pr-2">
                          <div className="w-2 h-2 rounded-full bg-[#eee0da] shadow-inner" />
                          <div className="w-2 h-2 rounded-full bg-[#eee0da] shadow-inner" />
                          <div className="w-2 h-2 rounded-full bg-[#eee0da] shadow-inner" />
                          <div className="w-2 h-2 rounded-full bg-[#eee0da] shadow-inner" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#867371] mt-3">
                      Perspectiva plana de taller · Corte anatómico y biselado manual
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Visualizer Metadata */}
              <div className="w-full grid grid-cols-3 gap-2 bg-white/90 backdrop-blur-md rounded-2xl p-3 z-10 shadow-xs border border-[#d8c1bf]/30">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-8 h-8 rounded-full bg-[#b7ebd9] text-[#366759] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#211a17]">Cuero Florentino</span>
                    <span className="text-[11px] text-[#867371]">Curtido vegetal 3.2 mm</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-2 border-l border-[#d8c1bf]/40">
                  <div className="w-8 h-8 rounded-full bg-[#ffdad7] text-[#8d4b47] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#211a17]">Láser Óptico</span>
                    <span className="text-[11px] text-[#867371]">Grabado indeleble</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-2 border-l border-[#d8c1bf]/40">
                  <div className="w-8 h-8 rounded-full bg-[#c6e7fe] text-[#436276] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#211a17]">Ficha Médica QR</span>
                    <span className="text-[11px] text-[#867371]">Sin cuotas mensuales</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Artisan Note */}
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#d8c1bf]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#b7ebd9] text-[#366759] flex items-center justify-center flex-shrink-0 border border-[#b9eddc]">
                  <span className="material-symbols-outlined text-[22px]">palette</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#211a17]">Confeccionado por el maestro guarnicionero</p>
                  <p className="text-xs text-[#534342]">
                    Cada unidad es sellada con cera de abeja natural en los bordes y cosida a doble punzada.
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#366759] font-bold bg-[#b9eddc] px-3 py-1 rounded-full whitespace-nowrap border border-[#9ed1c0]">
                Edición Pastel 2025
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Multi-Step Customizer Configurator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Step 1: Species Selector */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#d8c1bf]/30 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#ffdad7] text-[#390a0a] font-bold flex items-center justify-center text-xs shadow-xs">
                    1
                  </span>
                  <h2 className="text-base text-[#211a17] font-bold">Tipo de Compañero</h2>
                </div>
                <span className="text-xs text-[#366759] font-semibold flex items-center gap-1 bg-[#b9eddc]/50 px-2.5 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">
                    {species === 'dog' ? 'shield' : 'lock_open_right'}
                  </span>
                  <span>{species === 'dog' ? 'Hebilla reforzada' : 'Cierre Antipánico'}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => updateCollarConfig({ species: 'dog' })}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border-2 font-bold text-sm transition-all ${
                    species === 'dog'
                      ? 'bg-[#fff1eb] border-[#d98a84] text-[#211a17] shadow-xs ring-2 ring-[#ffdad7]/40'
                      : 'bg-white border-[#d8c1bf]/30 text-[#534342] hover:text-[#211a17]'
                  }`}
                >
                  <span className="text-xl">🐕</span>
                  <span>Perro (Robusto)</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateCollarConfig({ species: 'cat' })}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border-2 font-bold text-sm transition-all ${
                    species === 'cat'
                      ? 'bg-[#fff1eb] border-[#d98a84] text-[#211a17] shadow-xs ring-2 ring-[#ffdad7]/40'
                      : 'bg-white border-[#d8c1bf]/30 text-[#534342] hover:text-[#211a17]'
                  }`}
                >
                  <span className="text-xl">🐈</span>
                  <span>Gato (Antiahogo)</span>
                </button>
              </div>

              {species === 'cat' && (
                <div className="mt-1 p-3 rounded-xl bg-[#c6e7fe]/40 text-[#18394c] text-xs flex items-start gap-2 border border-[#aacbe2]/50">
                  <span className="material-symbols-outlined text-[18px] text-[#436276] flex-shrink-0 mt-0.5">
                    lock_open_right
                  </span>
                  <span>
                    <strong>Cierre de Seguridad Antipánico incluido:</strong> Se abre de inmediato con un
                    tirón superior a 2.5 kg para evitar enganches en árboles o vallas.
                  </span>
                </div>
              )}
            </div>

            {/* Step 2: Size & Fit Stepper */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#d8c1bf]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#ffdad7] text-[#390a0a] font-bold flex items-center justify-center text-xs shadow-xs">
                    2
                  </span>
                  <h2 className="text-base text-[#211a17] font-bold">Talla &amp; Contorno Anatómico</h2>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Mide con cinta métrica dejando 2 dedos de holgura')}
                  className="text-xs text-[#8d4b47] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-[15px]">help</span> ¿Cómo medir?
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => updateCollarConfig({ size: opt.size, cm: opt.defaultCm })}
                    className={`py-2.5 px-1 rounded-xl text-center font-bold transition-all border ${
                      size === opt.size
                        ? 'bg-[#d98a84] text-white shadow-md border-[#d98a84]'
                        : 'bg-[#fff1eb] text-[#534342] hover:bg-[#f9ebe5] border-[#d8c1bf]/30'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.size}</div>
                    <div className="text-[10px] opacity-80 font-normal">{opt.range}</div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-1 bg-[#fff1eb]/70 p-3.5 rounded-2xl border border-[#d8c1bf]/30">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#534342] font-medium">Circunferencia exacta del cuello:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad7] text-[#8d4b47] font-mono font-bold text-xs border border-[#ffb3ad]">
                    {cm} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={cm}
                  onChange={(e) => updateCollarConfig({ cm: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#d98a84] h-2 bg-[#eee0da] rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#867371]">
                  <span>Cachorros / Felinos (18cm)</span>
                  <span>Recomendado: Whippet, Beagle</span>
                  <span>Molosos (65cm)</span>
                </div>
              </div>
            </div>

            {/* Step 3: Material & Color Tone */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#d8c1bf]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#ffdad7] text-[#390a0a] font-bold flex items-center justify-center text-xs shadow-xs">
                    3
                  </span>
                  <h2 className="text-base text-[#211a17] font-bold">Piel &amp; Color</h2>
                </div>
                <span className="text-xs font-bold text-[#8d4b47] bg-[#ffdad7]/40 px-3 py-1 rounded-full border border-[#ffb3ad]/60">
                  {leatherName}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {leatherOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      updateCollarConfig({
                        leather: opt.id,
                        leatherName: opt.name,
                        leatherHex: opt.hex,
                      })
                    }
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`w-12 h-12 rounded-full p-1 ring-2 transition-all shadow-xs flex items-center justify-center bg-white ${
                        leather === opt.id ? 'ring-[#d98a84]' : 'ring-transparent hover:ring-[#d8c1bf]'
                      }`}
                    >
                      <span className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: opt.hex[0] }} />
                    </div>
                    <span
                      className={`text-[11px] truncate max-w-full font-bold ${
                        leather === opt.id ? 'text-[#8d4b47]' : 'text-[#867371]'
                      }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Hardware Finish & Charms */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#d8c1bf]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#ffdad7] text-[#390a0a] font-bold flex items-center justify-center text-xs shadow-xs">
                    4
                  </span>
                  <h2 className="text-base text-[#211a17] font-bold">Herrajes &amp; Dije Colgante</h2>
                </div>
                <span className="text-xs font-bold text-[#436276] bg-[#c6e7fe]/50 px-3 py-1 rounded-full border border-[#aacbe2]">
                  {metalName}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {metalOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      updateCollarConfig({
                        metal: opt.id,
                        metalName: opt.name,
                        metalHex: opt.hex,
                      })
                    }
                    className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 border-2 transition-all ${
                      metal === opt.id
                        ? 'bg-[#f9ebe5] border-[#d98a84]'
                        : 'bg-[#fff1eb] border-transparent hover:border-[#d8c1bf]/60'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full shadow-xs"
                      style={{
                        background: `linear-gradient(135deg, ${opt.hex[2]}, ${opt.hex[1]}, ${opt.hex[0]})`,
                      }}
                    />
                    <span
                      className={`text-[11px] font-bold text-center leading-tight ${
                        metal === opt.id ? 'text-[#8d4b47]' : 'text-[#867371]'
                      }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#d8c1bf]/30">
                <span className="text-xs text-[#211a17] font-semibold">Dije Colgante Artesanal Incluido:</span>
                <div className="grid grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'bone' as CharmType, icon: 'format_h4', label: 'Huesito' },
                      { id: 'fish' as CharmType, icon: 'phishing', label: 'Pez' },
                      { id: 'acorn' as CharmType, icon: 'nature', label: 'Bellota' },
                      { id: 'bell' as CharmType, icon: 'notifications', label: 'Cascabel' },
                    ] as const
                  ).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => updateCollarConfig({ charm: c.id })}
                      className={`p-2.5 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        charm === c.id
                          ? 'bg-[#f9ebe5] border-[#d98a84] text-[#8d4b47]'
                          : 'bg-[#fff1eb] border-transparent text-[#867371] hover:text-[#211a17]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5: Laser Monogram & Typography */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#d8c1bf]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#ffdad7] text-[#390a0a] font-bold flex items-center justify-center text-xs shadow-xs">
                    5
                  </span>
                  <h2 className="text-base text-[#211a17] font-bold">Grabado Personalizado</h2>
                </div>
                <span className="text-xs bg-[#c6e7fe] text-[#18394c] px-3 py-0.5 rounded-full font-bold border border-[#aacbe2]">
                  Láser Gratuito
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pet-name-input" className="text-xs text-[#534342] font-bold">
                    Nombre de la mascota (Máx. 12 letras)
                  </label>
                  <input
                    id="pet-name-input"
                    type="text"
                    maxLength={12}
                    value={petName}
                    onChange={(e) => updateCollarConfig({ petName: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff1eb] text-[#211a17] text-base font-bold uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d98a84] border border-[#d8c1bf]/40 shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pet-phone-input" className="text-xs text-[#534342] font-bold">
                    Teléfono de contacto / Chip
                  </label>
                  <input
                    id="pet-phone-input"
                    type="text"
                    maxLength={16}
                    value={petPhone}
                    onChange={(e) => updateCollarConfig({ petPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff1eb] text-[#211a17] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#d98a84] border border-[#d8c1bf]/40 shadow-inner"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <label className="text-xs text-[#534342] font-bold">Tipografía del grabado:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => updateCollarConfig({ font: "'Plus Jakarta Sans', sans-serif" })}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      font === "'Plus Jakarta Sans', sans-serif"
                        ? 'bg-[#f9ebe5] border-[#d98a84]'
                        : 'bg-[#fff1eb] border-transparent hover:border-[#d8c1bf]/60'
                    }`}
                  >
                    <span className="font-sans text-sm font-bold text-[#8d4b47]">Moderna</span>
                    <p className="text-[10px] text-[#867371]">Jakarta Sans</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateCollarConfig({ font: "'Georgia', serif" })}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      font === "'Georgia', serif"
                        ? 'bg-[#f9ebe5] border-[#d98a84]'
                        : 'bg-[#fff1eb] border-transparent hover:border-[#d8c1bf]/60'
                    }`}
                  >
                    <span className="font-serif text-sm font-bold italic text-[#211a17]">Artesana</span>
                    <p className="text-[10px] text-[#867371]">Serif Elegante</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateCollarConfig({ font: "'Courier New', monospace" })}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      font === "'Courier New', monospace"
                        ? 'bg-[#f9ebe5] border-[#d98a84]'
                        : 'bg-[#fff1eb] border-transparent hover:border-[#d8c1bf]/60'
                    }`}
                  >
                    <span className="font-mono text-sm font-bold text-[#211a17]">Bauhaus</span>
                    <p className="text-[10px] text-[#867371]">Monospace</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 6: Smart Safety & Tech Add-ons */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#d8c1bf]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#ffdad7] text-[#390a0a] font-bold flex items-center justify-center text-xs shadow-xs">
                    6
                  </span>
                  <h2 className="text-base text-[#211a17] font-bold">Seguridad &amp; Tecnología</h2>
                </div>
                <span className="text-xs text-[#366759] font-bold bg-[#b9eddc]/50 px-2.5 py-0.5 rounded-full">
                  Opcionales de Taller
                </span>
              </div>

              {/* Addon 1: Smart QR (Included) */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#b7ebd9]/50 border border-[#b9eddc]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#366759] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#211a17]">Microplaca QR de Emergencia</span>
                    <span className="text-xs text-[#534342]">
                      Ficha médica, cartilla de vacunas y geolocalización al escanear.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#366759] bg-white px-3 py-1 rounded-full shadow-xs whitespace-nowrap">
                  INCLUIDO
                </span>
              </div>

              {/* Addon 2: Reflective Stitching */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fff1eb] hover:bg-[#f9ebe5] cursor-pointer transition-colors border border-[#d8c1bf]/30">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={reflective}
                    onChange={(e) => updateCollarConfig({ reflective: e.target.checked })}
                    className="w-5 h-5 accent-[#d98a84] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#211a17]">Costura Refractante 3M™ Scotchlite</span>
                    <span className="text-xs text-[#534342]">
                      Visibilidad nocturna de hasta 150 metros en paseos oscuros.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8d4b47] bg-[#ffdad7]/50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  +€4.00
                </span>
              </label>

              {/* Addon 3: Integrated AirTag Case */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fff1eb] hover:bg-[#f9ebe5] cursor-pointer transition-colors border border-[#d8c1bf]/30">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={airtag}
                    onChange={(e) => updateCollarConfig({ airtag: e.target.checked })}
                    className="w-5 h-5 accent-[#d98a84] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#211a17]">
                      Funda Piel para Apple AirTag® / SmartTag
                    </span>
                    <span className="text-xs text-[#534342]">
                      Mismo cuero pastel y herraje remachado a prueba de saltos y agua.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8d4b47] bg-[#ffdad7]/50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  +€8.00
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Atelier Transparency Strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#fff1eb] p-4 rounded-2xl flex items-center gap-3 shadow-xs border border-[#d8c1bf]/30">
            <div className="w-12 h-12 rounded-2xl bg-[#ffdad7] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#8d4b47] text-[28px]">handyman</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#211a17]">Hecho Sobre Pedido</h4>
              <p className="text-xs text-[#534342]">
                Cero sobreproducción. Cortado a la medida de tu compañero en 48 horas.
              </p>
            </div>
          </div>

          <div className="bg-[#fff1eb] p-4 rounded-2xl flex items-center gap-3 shadow-xs border border-[#d8c1bf]/30">
            <div className="w-12 h-12 rounded-2xl bg-[#b9eddc] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#366759] text-[28px]">autorenew</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#211a17]">Reacondicionable</h4>
              <p className="text-xs text-[#534342]">
                ¿Cambio de talla por crecimiento? Reajustamos la tira en nuestro taller.
              </p>
            </div>
          </div>

          <div className="bg-[#fff1eb] p-4 rounded-2xl flex items-center gap-3 shadow-xs border border-[#d8c1bf]/30">
            <div className="w-12 h-12 rounded-2xl bg-[#c6e7fe] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#436276] text-[28px]">package_2</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#211a17]">Packaging Compostable</h4>
              <p className="text-xs text-[#534342]">
                En caja de cartón reciclado con virutas de madera y saquito de lino.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Summary Bar */}
      <aside className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#d8c1bf]/30 shadow-[0_-4px_24px_rgba(141,75,71,0.08)] py-3.5 px-5 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex flex-col">
              <span className="text-[12px] text-[#436276] font-medium flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#366759]" />
                Confección estimada: 48h hábiles
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-[#534342] font-medium">Total personalización:</span>
                <span className="text-2xl font-extrabold text-[#8d4b47] tracking-tight">
                  €{calculatedPrice.toFixed(2)}
                </span>
                <span className="text-xs text-[#867371]">(IVA incl.)</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-[#d8c1bf]/40">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#211a17]">
                  Collar {petName || 'Mascota'} (Talla {size})
                </span>
                <span className="text-[11px] text-[#867371] font-medium">
                  {leatherName} + {metalName.split(' ')[0]} + QR
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => showToast('Diseño guardado en tus bocetos de taller')}
              className="hidden md:flex items-center justify-center p-3.5 rounded-full bg-[#fff1eb] text-[#8d4b47] hover:bg-[#ffdad7] border border-[#d8c1bf]/30 transition-colors shadow-xs"
              title="Guardar diseño como boceto"
            >
              <span className="material-symbols-outlined text-[20px]">favorite_border</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#d98a84] text-white hover:bg-[#8d4b47] text-sm font-bold shadow-md hover:shadow-lg transform active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Añadir al Carrito Artesanal</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
