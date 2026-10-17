import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Package, Sparkles, ArrowRight, Heart } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastOrder, setCurrentView } = useApp();

  return (
    <div className="w-full pt-10 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#EAE2D9] shadow-sm p-6 sm:p-10 flex flex-col items-center text-center">
          {/* Animated check badge */}
          <div className="w-16 h-16 rounded-full bg-[#EBF1EE] text-[#789286] flex items-center justify-center mb-4 shadow-xs">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
            ¡Pedido Confirmado con Éxito!
          </span>

          <h1 className="font-editorial text-3xl sm:text-4xl text-[#2D2421] font-bold mt-1">
            Tu joya comenzará a forjarse hoy
          </h1>

          <p className="text-sm text-[#6E5D57] max-w-md mt-2 leading-relaxed">
            Hemos recibido los detalles de tu personalización. Nuestros maestros orfebres cuidarán cada milímetro de grabado para que sea perfecto.
          </p>

          {/* Order Details Card */}
          <div className="w-full bg-[#FAF7F2] rounded-2xl p-5 border border-[#EAE2D9] mt-8 text-left flex flex-col gap-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EAE2D9]">
              <div>
                <span className="text-[#A29A93] block">Número de Pedido</span>
                <span className="text-sm font-bold font-mono text-[#2D2421]">
                  {lastOrder?.orderId || '#NOV-849201'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#A29A93] block">Fecha de Compra</span>
                <span className="font-medium text-[#2D2421]">
                  {lastOrder?.date || 'Hoy'}
                </span>
              </div>
            </div>

            {/* Customer & Shipping Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[#A29A93] font-bold block mb-1">Destinatario</span>
                <p className="font-semibold text-[#2D2421]">{lastOrder?.customer.fullName || 'Camila Ospina'}</p>
                <p className="text-[#6E5D57]">{lastOrder?.customer.address || 'Calle 10A # 34-28'}</p>
                <p className="text-[#6E5D57]">
                  {lastOrder?.customer.city || 'Medellín'}, {lastOrder?.customer.department || 'Antioquia'}
                </p>
                <p className="text-[#6E5D57]">{lastOrder?.customer.phone || '+57 312 456 7890'}</p>
              </div>

              <div>
                <span className="text-[#A29A93] font-bold block mb-1">Tiempos Estimados</span>
                <div className="flex items-center gap-2 text-[#2D2421] font-semibold">
                  <Package className="w-4 h-4 text-[#C68B8B]" />
                  <span>Confección: 3 - 5 días hábiles</span>
                </div>
                <div className="flex items-center gap-2 text-[#6E5D57] mt-1">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Entrega en estuche de terciopelo rosa</span>
                </div>
                <div className="mt-2 text-[#789286] font-medium bg-[#EBF1EE] p-2 rounded-xl inline-block">
                  Enviaremos la guía a: {lastOrder?.customer.email || 'tu correo'}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => setCurrentView('collection')}
              className="px-8 py-3 rounded-full bg-[#2D2421] text-white hover:bg-[#433530] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center gap-2"
            >
              <span>Volver a la tienda</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('inspiration')}
              className="px-6 py-3 rounded-full bg-white text-[#2D2421] border border-[#EAE2D9] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#C68B8B]" />
              <span>Ver historias de la comunidad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
