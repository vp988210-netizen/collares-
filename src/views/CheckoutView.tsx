import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckoutFormData } from '../types';
import { CreditCard, ShieldCheck, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, shippingCost, cartTotal, setCurrentView, clearCart, setLastOrder } = useApp();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Camila Ospina Restrepo',
    email: 'camila.ospina@gmail.com',
    phone: '+57 312 456 7890',
    address: 'Calle 10A # 34 - 28, Apto 502',
    city: 'Medellín',
    department: 'Antioquia',
    postalCode: '050021',
    paymentMethod: 'tarjeta',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvv: '•••',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `NOV-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderId,
      date: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: [...cart],
      total: cartTotal,
      subtotal: cartSubtotal,
      shipping: shippingCost,
      customer: { ...formData },
    };

    setTimeout(() => {
      setLastOrder(orderData);
      clearCart();
      setIsSubmitting(false);
      setCurrentView('order-success');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full py-24 px-4 text-center max-w-md mx-auto flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#F6ECEC] text-[#C68B8B] flex items-center justify-center text-2xl font-serif">
          ♡
        </div>
        <h2 className="font-editorial text-2xl font-bold text-[#2D2421]">No hay productos en tu bolsa</h2>
        <p className="text-xs text-[#6E5D57]">
          Personaliza tu primer collar antes de proceder al pago.
        </p>
        <button
          type="button"
          onClick={() => setCurrentView('collection')}
          className="mt-2 px-8 py-3 rounded-full bg-[#C68B8B] text-white font-semibold text-xs tracking-wider uppercase shadow-xs hover:bg-[#B57A7A]"
        >
          Explorar collares
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => setCurrentView('collection')}
          className="inline-flex items-center gap-1.5 text-xs text-[#6E5D57] hover:text-[#2D2421] mb-6 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Seguir comprando</span>
        </button>

        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C68B8B] font-bold">
            Paso Final · Confección de Joyas
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#2D2421] font-bold">
            Finalizar Pedido
          </h1>
        </div>

        {/* 2-Column Split: Form Left + Order Summary Right */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Left (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* 1. Datos de Contacto y Envío */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE2D9] shadow-xs flex flex-col gap-4">
              <h2 className="font-serif-luxury text-xl font-bold text-[#2D2421] pb-2 border-b border-[#F4EFEB]">
                Información de Entrega
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="checkout-full-name" className="text-xs font-bold text-[#2D2421]">Nombre completo</label>
                  <input
                    id="checkout-full-name"
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-medium focus:outline-none focus:border-[#C68B8B]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-email" className="text-xs font-bold text-[#2D2421]">Correo electrónico</label>
                  <input
                    id="checkout-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-medium focus:outline-none focus:border-[#C68B8B]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-phone" className="text-xs font-bold text-[#2D2421]">Teléfono de contacto</label>
                  <input
                    id="checkout-phone"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-medium focus:outline-none focus:border-[#C68B8B]"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="checkout-address" className="text-xs font-bold text-[#2D2421]">Dirección de residencia / oficina</label>
                  <input
                    id="checkout-address"
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-medium focus:outline-none focus:border-[#C68B8B]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-city" className="text-xs font-bold text-[#2D2421]">Ciudad</label>
                  <input
                    id="checkout-city"
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-medium focus:outline-none focus:border-[#C68B8B]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-department" className="text-xs font-bold text-[#2D2421]">Departamento / Estado</label>
                  <input
                    id="checkout-department"
                    required
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-medium focus:outline-none focus:border-[#C68B8B]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkout-postal-code" className="text-xs font-bold text-[#2D2421]">Código postal</label>
                  <input
                    id="checkout-postal-code"
                    required
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D9] text-xs font-medium focus:outline-none focus:border-[#C68B8B]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Método de Pago */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE2D9] shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#F4EFEB]">
                <h2 className="font-serif-luxury text-xl font-bold text-[#2D2421]">
                  Método de Pago Seguro
                </h2>
                <span className="text-[11px] text-[#8FA89B] font-semibold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Cifrado 256-bit
                </span>
              </div>

              {/* Payment selector buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'tarjeta', label: 'Tarjeta', sub: 'Crédito / Débito' },
                  { id: 'pse', label: 'PSE', sub: 'Transferencia' },
                  { id: 'nequi', label: 'Nequi', sub: 'Pago móvil' },
                  { id: 'daviplata', label: 'Daviplata', sub: 'Billetera' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: pm.id as any })}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      formData.paymentMethod === pm.id
                        ? 'border-[#C68B8B] bg-[#FDFBF7] text-[#C68B8B] shadow-xs ring-1 ring-[#C68B8B]'
                        : 'border-[#EAE2D9] text-[#6E5D57] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#2D2421]">{pm.label}</div>
                    <div className="text-[10px] text-[#A29A93] mt-0.5">{pm.sub}</div>
                  </button>
                ))}
              </div>

              {/* Conditional card details */}
              {formData.paymentMethod === 'tarjeta' && (
                <div className="mt-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D9] flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#2D2421] font-semibold">
                    <CreditCard className="w-4 h-4 text-[#C68B8B]" />
                    <span>Tarjeta de Crédito o Débito</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3 flex flex-col gap-1">
                      <label htmlFor="checkout-card-number" className="text-[11px] text-[#6E5D57] font-semibold">Número de tarjeta</label>
                      <input
                        id="checkout-card-number"
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-[#EAE2D9] text-xs font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="checkout-card-expiry" className="text-[11px] text-[#6E5D57] font-semibold">Vencimiento</label>
                      <input
                        id="checkout-card-expiry"
                        type="text"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-[#EAE2D9] text-xs font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="checkout-card-cvv" className="text-[11px] text-[#6E5D57] font-semibold">CVV</label>
                      <input
                        id="checkout-card-cvv"
                        type="text"
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                        className="w-full px-3 py-2 bg-white rounded-xl border border-[#EAE2D9] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(formData.paymentMethod === 'pse' || formData.paymentMethod === 'nequi' || formData.paymentMethod === 'daviplata') && (
                <div className="mt-2 p-3.5 rounded-2xl bg-[#EBF1EE] border border-[#8FA89B]/40 text-xs text-[#3E322E] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#789286] flex-shrink-0" />
                  <span>
                    Al presionar "Realizar pedido", se generará la confirmación inmediata del pago con <strong>{formData.paymentMethod.toUpperCase()}</strong>.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Right (5 cols, sticky) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE2D9] shadow-sm flex flex-col gap-6 lg:sticky lg:top-28">
            <h2 className="font-serif-luxury text-xl font-bold text-[#2D2421] pb-2 border-b border-[#F4EFEB]">
              Resumen del Pedido
            </h2>

            {/* Itemized List */}
            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs pb-3 border-b border-[#FAF7F2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-[#F4EFEB] flex-shrink-0 border border-[#EAE2D9]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-sm font-bold text-[#2D2421] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#C68B8B] font-semibold">
                      Grabado: «{item.customization.text}»
                    </p>
                    <p className="text-[10px] text-[#A29A93] capitalize">
                      {item.customization.material.replace('-', ' ')} · {item.customization.length} · Cantidad: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-[#2D2421] font-sans">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="flex flex-col gap-2 text-xs text-[#6E5D57] pt-2 border-t border-[#F4EFEB]">
              <div className="flex justify-between">
                <span>Subtotal joyas</span>
                <span className="font-mono text-[#2D2421] font-semibold">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío nacional asegurado</span>
                <span className="font-mono text-[#2D2421] font-semibold">
                  {shippingCost === 0 ? <span className="text-[#8FA89B] font-bold">GRATIS</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estuche de terciopelo y cinta</span>
                <span className="text-[#8FA89B] font-bold">INCLUIDO</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2D2421] pt-3 border-t border-[#EAE2D9]">
                <span className="font-serif-luxury">Total a pagar</span>
                <span className="font-sans text-xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#C68B8B] hover:bg-[#B57A7A] disabled:opacity-75 text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Procesando pedido...</span>
                </>
              ) : (
                <span>Realizar pedido</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#A29A93]">
              <ShieldCheck className="w-4 h-4 text-[#8FA89B]" />
              <span>Compra 100% garantizada por NOVA Atelier</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
