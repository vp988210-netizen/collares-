import React from 'react';
import { usePaws } from '../context/PawsContext';

export const Footer: React.FC = () => {
  const { setActiveTab, showToast } = usePaws();

  return (
    <footer className="w-full bg-[#fff1eb] text-[#534342] mt-16 border-t border-[#d8c1bf]/30 shadow-[0_1px_8px_rgba(141,75,71,0.03)]">
      <div className="w-full px-5 md:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                alt="Paws &amp; Craft Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiFNht2d7TXV1S5I3KifYFv5xK1kaI8JgUbye9jw1H6_dPHuLBH3Ja2EzPnuE8cpmdMCSCve3ffCCeDIDQjhOI69Zh7rXUm-boNPJYqAPhWQL8EX1WZub56lkFKimcWrgeS1FZOUFUKfHgREDhpms7XCRX6oB98decwQ-rVNSQ52c2vhJgVvWqd3TwZBjY7ciJm45mxF1D_diobJgeWJvUlxhbSWmBoWv0EEyNgSrN"
              />
              <span className="text-xl text-[#211a17] font-bold">Paws &amp; Craft</span>
            </div>
            <p className="text-sm text-[#534342] leading-relaxed">
              Taller artesanal dedicado a vestir con orgullo, ternura y longevidad a los compañeros más nobles del hogar.
            </p>
            <div className="flex items-center gap-1.5 text-[#366759] bg-[#b9eddc]/50 px-3 py-1.5 rounded-full w-fit">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span className="text-xs font-bold">Pieles curtidas de forma vegetal y herrajes macizos</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg text-[#211a17] font-bold">Garantía &amp; Taller</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#534342]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#436276]">shield_lock</span>
                <span>Garantía de cuero artesanal de 5 años</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#8d4b47]">straighten</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('catalogo-de-collares')}
                  className="hover:text-[#8d4b47] transition-colors underline decoration-[#d8c1bf] text-left"
                >
                  Guía anatómica de tallas por raza
                </button>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#366759]">recycling</span>
                <span>Herrajes de latón 100% reacondicionables</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#867371]">local_shipping</span>
                <span>Envíos libres de plástico y neutros en carbono</span>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg text-[#211a17] font-bold">Seguridad &amp; Tecnología</h4>
            <div
              onClick={() => setActiveTab('ficha-medica-qr')}
              className="p-4 bg-[#f9ebe5] rounded-2xl flex flex-col gap-2 border border-[#d8c1bf]/30 cursor-pointer hover:border-[#d98a84] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#8d4b47]">
                <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                <span className="text-sm font-bold text-[#211a17]">Placas de Emergencia QR</span>
              </div>
              <p className="text-xs text-[#534342] leading-relaxed">
                Cada collar incluye grabado opcional con micro-código QR enlazado a la ficha médica y contacto de rescate.
              </p>
            </div>
            <a
              href="/api/docs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#8d4b47] hover:underline font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Especificación API REST (/api/docs)</span>
            </a>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg text-[#211a17] font-bold">Comunidad Atelier</h4>
            <p className="text-sm text-[#534342]">
              Acompáñanos en nuestro diario de taller y conoce los paseos de nuestra manada.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => showToast('Instagram: @pawsandcraft')}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#534342] hover:bg-[#ffdad7] hover:text-[#8d4b47] transition-colors shadow-xs border border-[#d8c1bf]/30"
              >
                <span className="material-symbols-outlined text-[18px]">camera</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Canal de Taller en Vídeo')}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#534342] hover:bg-[#ffdad7] hover:text-[#8d4b47] transition-colors shadow-xs border border-[#d8c1bf]/30"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Contacto: hola@pawsandcraft.es')}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#534342] hover:bg-[#ffdad7] hover:text-[#8d4b47] transition-colors shadow-xs border border-[#d8c1bf]/30"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </button>
            </div>
            <p className="text-xs text-[#867371] pt-1">Hecho a mano con amor en Madrid y Barcelona</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-8 border-t border-[#d8c1bf]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#867371]">
          <p>© 2025 Paws &amp; Craft S.L. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => showToast('Aviso de Privacidad')} className="hover:text-[#8d4b47] transition-colors">
              Privacidad
            </button>
            <button type="button" onClick={() => showToast('Términos de Confección')} className="hover:text-[#8d4b47] transition-colors">
              Términos de Confección
            </button>
            <button type="button" onClick={() => showToast('Guía de Cuidado del Cuero')} className="hover:text-[#8d4b47] transition-colors">
              Cuidado del Cuero
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
