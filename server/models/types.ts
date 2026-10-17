export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  material: string;
  category: string;
  image: string;
  available: boolean;
  speciesCategory?: 'perro' | 'gato' | 'both' | 'humano';
  rating?: number;
  reviewCount?: number;
  badge1?: string;
  badge2?: string;
  width?: string;
  colors?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount?: number;
}

export interface Customization {
  id: number;
  productId: number;
  text: string;
  material: string;
  font: string;
  symbol: string;
  chainLength: string;
  petPhone?: string;
  reflective?: boolean;
  airtag?: boolean;
  basePrice: number;
  customizationCost: number;
  finalPrice: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId?: number;
  name: string;
  price: number;
  quantity: number;
  details?: string;
  image?: string;
  customization?: Partial<Customization>;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  shipping: number;
  total: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'production'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  department: string;
  postalCode?: string;
  notes?: string;
}

export interface Order {
  id: number;
  customer: OrderCustomer;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  createdAt: string;
}

export interface Favorite {
  productId: number;
  addedAt: string;
}
