import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shippingCost,
    cartTotal,
    setCurrentView,
  } = useApp();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2D2421]/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 border-l border-[#EAE2D9] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE2D9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-xl font-bold text-[#2D2421]">
              Tu Bolsa de Joyas
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F6ECEC] text-[#C68B8B] font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-[#6E5D57] hover:bg-[#F4EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF7F2] px-5 py-3 border-b border-[#EAE2D9] text-xs">
          {cartSubtotal >= 50 ? (
            <div className="flex items-center gap-1.5 text-[#8FA89B] font-medium">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>¡Felicidades! Tienes <strong>Envío Nacional Gratuito</strong></span>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <span className="text-[#6E5D57]">
                Te faltan <strong>${(50 - cartSubtotal).toFixed(2)}</strong> para tener <strong>Envío Gratis</strong>
              </span>
              <div className="w-full bg-[#EAE2D9] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C68B8B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (cartSubtotal / 50) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-3">
              <div className="w-16 h-16 rounded-full bg-[#F6ECEC] flex items-center justify-center text-[#C68B8B] text-2xl font-serif">
                ♡
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#2D2421]">
                Tu bolsa está vacía
              </h4>
              <p className="text-xs text-[#6E5D57] max-w-xs leading-relaxed">
                Descubre nuestra colección o crea un collar único grabado con tu historia.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('personalize');
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#C68B8B] text-white text-xs font-semibold shadow-xs hover:bg-[#B57A7A]"
              >
                Diseñar mi collar ahora
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-2xl border border-[#EAE2D9] shadow-xs flex gap-3 relative"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4EFEB] flex-shrink-0 border border-[#EAE2D9]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-luxury text-sm font-bold text-[#2D2421] truncate">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A29A93] hover:text-[#C68B8B] transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details Chips */}
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#6E5D57] mt-1">
                      <span className="font-bold text-[#C68B8B]">
                        «{item.customization.text}»
                      </span>
                      <span>·</span>
                      <span className="capitalize">{item.customization.material.replace('-', ' ')}</span>
                      <span>·</span>
                      <span>{item.customization.length}</span>
                      {item.customization.symbol !== 'ninguno' && (
                        <>
                          <span>·</span>
                          <span className="capitalize">Dije {item.customization.symbol}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 bg-[#F4EFEB] rounded-full px-2 py-0.5 border border-[#EAE2D9]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-xs text-[#2D2421] font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold font-mono w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-xs text-[#2D2421] font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-sans font-bold text-sm text-[#2D2421]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EAE2D9] flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 text-xs text-[#6E5D57]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#2D2421] font-medium">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Envío asegurado</span>
                <span className="font-mono text-[#2D2421] font-medium">
                  {shippingCost === 0 ? (
                    <span className="text-[#8FA89B] font-bold">GRATIS</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2D2421] pt-2 border-t border-[#EAE2D9]">
                <span className="font-serif-luxury">Total</span>
                <span className="font-sans">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#2D2421] hover:bg-[#433530] text-white rounded-full font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Continuar compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#A29A93] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8FA89B]" />
              <span>Garantía de confección artesanal &amp; pagos seguros</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
