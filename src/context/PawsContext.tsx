import React, { createContext, useContext, useState, useEffect } from 'react';
import { CollarConfig, CartItem, MedicalRecord } from '../types/paws';
import { api } from '../services/apiClient';

export type TabKey =
  | 'estudio-de-diseno'
  | 'catalogo-de-collares'
  | 'ficha-medica-qr'
  | 'resenas-y-galeria-peluda';

interface PawsContextType {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;

  // Customizer state
  collarConfig: CollarConfig;
  updateCollarConfig: (patch: Partial<CollarConfig>) => void;
  calculatedPrice: number;

  // QR Medical Record State
  medicalRecord: MedicalRecord;
  updateMedicalRecord: (patch: Partial<MedicalRecord>) => void;
  toggleLostMode: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'> & { productId?: number; customization?: any }) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  clearCart: () => Promise<void>;
  submitOrder: (orderPayload: {
    customer: { name: string; email: string; phone: string };
    shippingAddress: { address: string; city: string; department: string; postalCode?: string };
    paymentMethod?: string;
  }) => Promise<any>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;

  // Modals
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_COLLAR_CONFIG: CollarConfig = {
  species: 'dog',
  size: 'M',
  cm: 34,
  leather: 'rose',
  leatherName: 'Rosa Pétalo Pastel',
  leatherHex: ['#d98a84', '#b86963', '#8d4b47'],
  metal: 'brass',
  metalName: 'Latón Dorado Macizo',
  metalHex: ['#fff1c7', '#e8c97e', '#bd9a44'],
  charm: 'bone',
  petName: 'TOBY',
  petPhone: '+34 612 345 678',
  font: "'Plus Jakarta Sans', sans-serif",
  reflective: false,
  airtag: false,
  basePrice: 38.5,
};

const DEFAULT_MEDICAL_RECORD: MedicalRecord = {
  id: 'PC-LAT-9921-MAD',
  petName: 'Toby',
  breed: 'Golden Retriever',
  age: '4 años',
  weight: '32 Kg',
  gender: 'Macho Castrado',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDvHIyfkM23K2JEgd8xfrwOu-WLVOI4n_zWfD5pxvMJWvSOC-IecsDO5OpV0TZm3zVOFZQkr3W6yEcub7umHkgaHherTxGoj8LNuES3ZmQ_W1lwqcnnNB4lhhuWFz3iDk4Ct-bkpIOE-n6HRjIJDZTj2HrnANGBVTbG1zTH_U5QYFn0UIta9uZ2RYEkHRPAXx43Nh75860u7gpEW5xteQHCLtROjVJtoqj62t56WEo4',
  isLost: true,
  rewardAmount: 150,
  primaryPhone: '+34 612 345 678',
  chipNumber: '981 098 102 341 238',
  allergies: ['Pollo, harinas de ave y cefalosporinas'],
  medicalConditions: ['Diabetes Canina Tipo 1'],
  medication: 'Caninsulin 12 UI cada 12 horas con comida',
  behaviorNotes: 'Muy amistoso, le asustan los paraguas abiertos',
  vetClinicName: 'Hospital Veterinario Retiro',
  vetClinicPhone: '+34 915 550 199',
  vetDoctor: 'Dr. Javier Morales (Colegiado 4109)',
  serialNumber: 'PC-LAT-9921-MAD',
  lastDetected: 'Ayer a las 18:32 • Parque Retiro',
};

const PawsContext = createContext<PawsContextType | undefined>(undefined);

export const PawsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('estudio-de-diseno');
  const [collarConfig, setCollarConfig] = useState<CollarConfig>(DEFAULT_COLLAR_CONFIG);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord>(DEFAULT_MEDICAL_RECORD);

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      name: 'Collar Siena Artisan (Talla M)',
      price: 36.0,
      quantity: 1,
      details: 'Cuero Coñac · Latón Macizo · Grabado TOBY',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvmRAPwpE3u1Rq120SuFp4gL15DKBHuTqTWpsMp4Jrw_3sD2kqm6sgcf1u_Px0QviyTT9gtOeBuWSmBfL1EJdAwsonHkyaf90fcrMpMstsZC6pyYv7LbAMqXDqXck3aRUZAUEg-6jTwkFqrp7t7aZlAJ1CAZv02lsnS2sWt1y3-K-sQxte4nH6K7QP-9u0w2eagAAIbyOkauEvziFaPlI80_mWPWT2qYZByRHmZul',
    },
    {
      id: 'cart-init-2',
      name: 'Chapa QR de Emergencia Adicional',
      price: 12.0,
      quantity: 1,
      details: 'Latón grabado láser · Enlace médico 24/7',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync with Backend Cart on Load
  useEffect(() => {
    const syncBackendCart = async () => {
      try {
        const backendCart = await api.getCart();
        if (backendCart && backendCart.items) {
          setCart(backendCart.items);
        }
      } catch (err) {
        console.warn('Backend cart init sync:', err);
      }
    };
    syncBackendCart();
  }, []);

  const updateCollarConfig = (patch: Partial<CollarConfig>) => {
    setCollarConfig((prev) => ({ ...prev, ...patch }));
  };

  const updateMedicalRecord = (patch: Partial<MedicalRecord>) => {
    setMedicalRecord((prev) => ({ ...prev, ...patch }));
  };

  const toggleLostMode = () => {
    setMedicalRecord((prev) => {
      const nextLost = !prev.isLost;
      showToast(
        nextLost
          ? '¡Modo Extravío activado! El perfil muestra alerta médica de prioridad.'
          : 'Modo Extravío desactivado. Toby marcado a salvo con su familia.'
      );
      return { ...prev, isLost: nextLost };
    });
  };

  // Dynamic Studio price
  let calculatedPrice = collarConfig.basePrice;
  if (collarConfig.reflective) calculatedPrice += 4.0;
  if (collarConfig.airtag) calculatedPrice += 8.0;

  // Cart operations connected to REST API
  const addToCart = async (item: Omit<CartItem, 'id'> & { productId?: number; customization?: any }) => {
    try {
      const updatedCart = await api.addCartItem({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        details: item.details,
        image: item.image,
        customization: item.customization,
      });
      if (updatedCart && updatedCart.items) {
        setCart(updatedCart.items);
      }
    } catch (err: any) {
      console.warn('Falling back to local cart add:', err);
      const fallbackItem: CartItem = {
        ...item,
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      };
      setCart((prev) => [fallbackItem, ...prev]);
    }
    showToast(`¡${item.name} añadido a tu cesta!`);
    setIsCartOpen(true);
  };

  const removeFromCart = async (id: string) => {
    try {
      const updatedCart = await api.removeCartItem(id);
      if (updatedCart && updatedCart.items) {
        setCart(updatedCart.items);
      }
    } catch (err) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
    showToast('Producto eliminado de la cesta');
  };

  const updateQuantity = async (id: string, delta: number) => {
    const currentItem = cart.find((i) => i.id === id);
    if (!currentItem) return;
    const newQty = currentItem.quantity + delta;

    if (newQty < 1) {
      await removeFromCart(id);
      return;
    }

    try {
      const updatedCart = await api.updateCartItem(id, newQty);
      if (updatedCart && updatedCart.items) {
        setCart(updatedCart.items);
      }
    } catch (err) {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
    } catch (err) {
      console.warn(err);
    }
    setCart([]);
  };

  const submitOrder = async (orderPayload: {
    customer: { name: string; email: string; phone: string };
    shippingAddress: { address: string; city: string; department: string; postalCode?: string };
    paymentMethod?: string;
  }) => {
    const result = await api.createOrder({
      ...orderPayload,
      items: cart,
    });
    setCart([]);
    return result;
  };

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <PawsContext.Provider
      value={{
        activeTab,
        setActiveTab: (tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        collarConfig,
        updateCollarConfig,
        calculatedPrice,
        medicalRecord,
        updateMedicalRecord,
        toggleLostMode,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        submitOrder,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
        isUploadModalOpen,
        setIsUploadModalOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </PawsContext.Provider>
  );
};

export const usePaws = () => {
  const context = useContext(PawsContext);
  if (!context) {
    throw new Error('usePaws must be used within a PawsProvider');
  }
  return context;
};
