import React, { useState } from 'react';
import { usePaws } from '../context/PawsContext';

export const CartModal: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    submitOrder,
    showToast,
  } = usePaws();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<number | string>(1001);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('Medellín');
  const [department, setDepartment] = useState('Antioquia');

  if (!isCartOpen) return null;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    try {
      const order = await submitOrder({
        customer: {
          name: customerName.trim() || 'Cliente Atelier',
          email: customerEmail.trim() || 'cliente@email.com',
          phone: customerPhone.trim() || '3000000000',
        },
        shippingAddress: {
          address: shippingAddress.trim() || 'Calle 10 #20-30',
          city: city.trim() || 'Medellín',
          department: department.trim() || 'Antioquia',
        },
        paymentMethod: 'Tarjeta',
      });

      setConfirmedOrderId(order?.id || 1003);
      setOrderDone(true);
      showToast(`¡Pedido #${order?.id || 1003} creado mediante API REST!`);
    } catch (err: any) {
      showToast(err.message || 'Error al procesar el pedido mediante API');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211a17]/40 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setOrderDone(false);
        }}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#fff8f6] h-full shadow-2xl flex flex-col z-10 border-l border-[#d8c1bf]/40 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#d8c1bf]/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8d4b47] text-[24px]">local_mall</span>
            <span className="text-lg font-bold text-[#211a17]">Tu Cesta Artesanal</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffdad7] text-[#713531] font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCartOpen(false);
              setOrderDone(false);
            }}
            className="p-1.5 rounded-full text-[#534342] hover:bg-[#fff1eb]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {orderDone ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#b7ebd9] text-[#366759] flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-[#211a17]">¡Pedido de Taller Recibido!</h3>
            <div className="px-3 py-1 bg-[#ffdad7] text-[#713531] rounded-full text-xs font-mono font-bold">
              Orden #{confirmedOrderId} · Registrada en API REST
            </div>
            <p className="text-xs text-[#534342] leading-relaxed">
              Hemos registrado las medidas y el grabado láser de tu compañero. La orden #{confirmedOrderId}
              estará cortada y sellada a mano en 48 horas.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                setOrderDone(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#d98a84] text-white text-xs font-bold"
            >
              Seguir en el taller
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20 gap-3">
                  <span className="material-symbols-outlined text-[48px] text-[#d8c1bf]">
                    shopping_basket
                  </span>
                  <p className="text-sm font-bold text-[#211a17]">Tu cesta está vacía</p>
                  <p className="text-xs text-[#534342]">
                    Diseña un collar a medida para tu perro o gato en el Estudio de Diseño.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-[#d8c1bf]/40 flex gap-3 shadow-xs"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover bg-[#fff1eb] flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold text-[#211a17] truncate">{item.name}</h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#867371] hover:text-[#ba1a1a]"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#534342] mt-0.5">{item.details}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 bg-[#fff8f6] px-2 py-0.5 rounded-lg border border-[#d8c1bf]/40">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-xs font-bold px-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-xs font-bold px-1"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#8d4b47]">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total and Checkout */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-[#d8c1bf]/30 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-[#534342]">
                  <span>Envío neutro en carbono</span>
                  <span className="text-[#366759] font-bold">GRATIS</span>
                </div>
                <div className="flex justify-between items-baseline text-base font-bold text-[#211a17]">
                  <span>Total estimado</span>
                  <span className="text-2xl text-[#8d4b47] font-extrabold">
                    €{cartTotal.toFixed(2)}
                  </span>
                </div>

                <form onSubmit={handleOrderSubmit} className="flex flex-col gap-2 pt-2">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nombre completo (ej: Julian Calle)"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] border border-[#d8c1bf]/60 text-xs focus:outline-none focus:border-[#d98a84]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Correo (cliente@email.com)"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] border border-[#d8c1bf]/60 text-xs focus:outline-none focus:border-[#d98a84]"
                    />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Teléfono (3000000000)"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] border border-[#d8c1bf]/60 text-xs focus:outline-none focus:border-[#d98a84]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Dirección (Calle 10 #20-30)"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] border border-[#d8c1bf]/60 text-xs focus:outline-none focus:border-[#d98a84]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ciudad (Medellín)"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] border border-[#d8c1bf]/60 text-xs focus:outline-none focus:border-[#d98a84]"
                    />
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Departamento (Antioquia)"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fff8f6] border border-[#d8c1bf]/60 text-xs focus:outline-none focus:border-[#d98a84]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full mt-2 py-3.5 rounded-full bg-[#d98a84] hover:bg-[#8d4b47] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span>Registrando pedido en API REST...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>Confirmar Pedido (POST /api/orders)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
