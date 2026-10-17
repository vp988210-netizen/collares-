import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Instagram, Facebook, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, showToast, setIsDesignSystemOpen } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Por favor introduce un correo válido');
      return;
    }
    setSubscribed(true);
    showToast('¡Gracias por unirte a la comunidad NOVA! Te hemos enviado un 10% de bienvenida.');
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#F4EFEB] text-[#2D2421] border-t border-[#EAE2D9] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#EAE2D9]">
          {/* Col 1: Brand & Story (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex flex-col items-start">
              <span className="font-editorial text-3xl font-bold tracking-widest text-[#2D2421]">
                NOVA
              </span>
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#6E5D57] -mt-1 font-sans">
                Atelier de Joyería Personalizada
              </span>
            </div>
            <p className="font-serif-luxury italic text-base text-[#6E5D57] max-w-sm mt-1">
              «Una joya que cuenta tu historia.»
            </p>
            <p className="text-xs text-[#6E5D57] leading-relaxed max-w-sm">
              Cada collar es forjado a mano por maestros orfebres, transformando nombres, fechas y recuerdos inolvidables en piezas de oro 18K y plata fina.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Visitando @nova.joyas en Instagram');
                }}
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6E5D57] hover:text-[#C68B8B] hover:shadow-xs border border-[#EAE2D9] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Visitando @nova.joyas en TikTok');
                }}
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6E5D57] hover:text-[#C68B8B] hover:shadow-xs border border-[#EAE2D9] transition-all text-xs font-bold"
              >
                <span>TK</span>
              </a>
              <a
                href="#facebook"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Visitando NOVA Joyas en Facebook');
                }}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6E5D57] hover:text-[#C68B8B] hover:shadow-xs border border-[#EAE2D9] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">Explorar</h4>
            <ul className="flex flex-col gap-2 text-xs text-[#6E5D57]">
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentView('collection')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Colección Completa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentView('personalize')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Diseña tu Collar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentView('inspiration')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Inspiración &amp; Historias
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Sobre Nosotros &amp; Taller
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsDesignSystemOpen(true)}
                  className="text-[#C68B8B] hover:underline font-medium"
                >
                  Design System NOVA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">Ayuda &amp; Legal</h4>
            <ul className="flex flex-col gap-2 text-xs text-[#6E5D57]">
              <li>
                <button
                  type="button"
                  onClick={() => showToast('Contáctanos: hola@novajoyas.com · WhatsApp +57 310 000 0000')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Contacto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => showToast('Política de privacidad: Datos 100% protegidos y cifrados')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => showToast('Términos y condiciones de confección artesanal y garantía')}
                  className="hover:text-[#2D2421] transition-colors"
                >
                  Términos y Condiciones
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-serif-luxury text-base font-bold text-[#2D2421]">Newsletter</h4>
            <p className="text-xs text-[#6E5D57] leading-relaxed">
              Recibe inspiración y novedades exclusivas, además de un 10% de bienvenida en tu primera joya.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2.5 bg-white text-xs rounded-full border border-[#EAE2D9] focus:outline-none focus:border-[#C68B8B] focus:ring-1 focus:ring-[#C68B8B] placeholder:text-[#A29A93]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-full bg-[#C68B8B] hover:bg-[#B57A7A] text-white text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Suscrito con éxito!</span>
                  </>
                ) : (
                  <>
                    <span>Suscribirme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7D77]">
          <p>© {new Date().getFullYear()} NOVA Joyería Artesanal. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Metales certificados 925 &amp; 18K</span>
            <span>·</span>
            <span>Hecho con amor y dedicación</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
