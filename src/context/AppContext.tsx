import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CustomizationOptions, Product } from '../types';
import { PRODUCTS } from '../data/products';

type ViewType =
  | 'home'
  | 'collection'
  | 'personalize'
  | 'product-detail'
  | 'inspiration'
  | 'about'
  | 'checkout'
  | 'order-success';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProduct: Product | null;
  openProductDetail: (productId: string) => void;
  
  // Customizer
  customizerDraft: CustomizationOptions;
  setCustomizerDraft: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
  updateCustomizerDraft: (patch: Partial<CustomizationOptions>) => void;
  startCustomizationForProduct: (productId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartSubtotal: number;
  shippingCost: number;

  // Wishlist
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isFavoritesOpen: boolean;
  setIsFavoritesOpen: (open: boolean) => void;

  // Modals & Drawers
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isDesignSystemOpen: boolean;
  setIsDesignSystemOpen: (open: boolean) => void;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;

  // Checkout & Order
  lastOrder: any | null;
  setLastOrder: (order: any) => void;
}

const DEFAULT_CUSTOMIZER: CustomizationOptions = {
  necklaceType: 'nombre',
  material: 'oro',
  chain: 'delicada',
  text: 'JULIAN',
  fontStyle: 'caligrafica',
  symbol: 'corazon',
  length: '45cm',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('collar-nombre');
  const [customizerDraft, setCustomizerDraft] = useState<CustomizationOptions>(DEFAULT_CUSTOMIZER);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nova_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state persisted to localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nova_favorites');
      return saved ? JSON.parse(saved) : ['collar-nombre', 'collar-corazon'];
    } catch {
      return ['collar-nombre', 'collar-corazon'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<any | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nova_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCustomizerDraft = (patch: Partial<CustomizationOptions>) => {
    setCustomizerDraft((prev) => ({ ...prev, ...patch }));
  };

  const startCustomizationForProduct = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      let defaultText = 'JULIAN';
      if (prod.category === 'inicial') defaultText = 'M';
      else if (prod.category === 'fecha') defaultText = '12.05.2024';
      else if (prod.category === 'corazon') defaultText = 'AMOR';
      else if (prod.category === 'zodiacal') defaultText = 'LEO';

      setCustomizerDraft({
        necklaceType: prod.category,
        material: prod.materialDefault,
        chain: 'delicada',
        text: defaultText,
        fontStyle: prod.category === 'fecha' ? 'romana' : 'caligrafica',
        symbol: prod.category === 'corazon' ? 'corazon' : 'ninguno',
        length: '45cm',
      });
    }
    setCurrentView('personalize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setCart((prev) => [newItem, ...prev]);
    showToast(`¡"${item.name}" agregado a tu bolsa!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Producto eliminado de tu bolsa');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Eliminado de tus favoritos');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Guardado en tus favoritos ♡');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 5.0;
  const cartTotal = cartSubtotal + shippingCost;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView: (view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedProduct,
        openProductDetail,
        customizerDraft,
        setCustomizerDraft,
        updateCustomizerDraft,
        startCustomizationForProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartSubtotal,
        shippingCost,
        favorites,
        toggleFavorite,
        isFavorite,
        isFavoritesOpen,
        setIsFavoritesOpen,
        isSearchOpen,
        setIsSearchOpen,
        isDesignSystemOpen,
        setIsDesignSystemOpen,
        toast,
        showToast,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
