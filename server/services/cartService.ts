import { store } from '../models/store';
import { Cart, CartItem } from '../models/types';

export interface AddCartItemDto {
  productId?: number;
  name: string;
  price?: number;
  quantity?: number;
  details?: string;
  image?: string;
  customization?: any;
}

export const getCart = (): Cart => {
  store.recalculateCart();
  return store.cart;
};

export const addItemToCart = (data: AddCartItemDto): Cart => {
  if (!data.name || !data.name.trim()) {
    throw new Error('El nombre del producto es obligatorio');
  }

  const quantity = data.quantity !== undefined ? Number(data.quantity) : 1;
  if (isNaN(quantity) || quantity < 1) {
    throw new Error('La cantidad debe ser mayor o igual a 1');
  }

  // Determine item price: if associated with product, verify in catalog
  let itemPrice = Number(data.price);
  if (data.productId) {
    const prod = store.products.find((p) => p.id === Number(data.productId));
    if (prod) {
      itemPrice = data.customization?.finalPrice || prod.price;
    }
  }

  if (isNaN(itemPrice) || itemPrice < 0) {
    throw new Error('El precio del producto es inválido o negativo');
  }

  // Check if same item & customization exists in cart
  const existingIndex = store.cart.items.findIndex((item) => {
    if (data.productId && item.productId === data.productId) {
      if (
        item.details === data.details &&
        JSON.stringify(item.customization) === JSON.stringify(data.customization)
      ) {
        return true;
      }
    }
    return item.name === data.name && item.details === data.details;
  });

  if (existingIndex > -1) {
    store.cart.items[existingIndex].quantity += quantity;
  } else {
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: data.productId ? Number(data.productId) : undefined,
      name: data.name.trim(),
      price: itemPrice,
      quantity,
      details: data.details?.trim() || '',
      image: data.image?.trim() || '',
      customization: data.customization,
    };
    store.cart.items.unshift(newItem);
  }

  store.recalculateCart();
  return store.cart;
};

export const updateCartItemQuantity = (id: string, quantity: number): Cart => {
  const numQty = Number(quantity);
  if (isNaN(numQty) || numQty < 1) {
    throw new Error('La cantidad no puede ser menor a 1');
  }

  const item = store.cart.items.find((i) => i.id === id);
  if (!item) {
    const error: any = new Error(`El producto en carrito con ID "${id}" no existe`);
    error.statusCode = 404;
    throw error;
  }

  item.quantity = numQty;
  store.recalculateCart();
  return store.cart;
};

export const removeCartItem = (id: string): Cart => {
  const index = store.cart.items.findIndex((i) => i.id === id);
  if (index === -1) {
    const error: any = new Error(`El producto en carrito con ID "${id}" no existe`);
    error.statusCode = 404;
    throw error;
  }

  store.cart.items.splice(index, 1);
  store.recalculateCart();
  return store.cart;
};

export const clearCart = (): Cart => {
  store.cart.items = [];
  store.recalculateCart();
  return store.cart;
};
