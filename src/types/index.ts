export type MaterialType = 'plata' | 'oro' | 'oro-rosa';
export type ChainType = 'delicada' | 'clasica' | 'gruesa';
export type NecklaceType = 'nombre' | 'inicial' | 'corazon' | 'fecha' | 'zodiacal' | 'pareja' | 'mama' | 'familia';
export type FontStyleType = 'caligrafica' | 'serif' | 'sans' | 'romana';
export type SymbolType = 'corazon' | 'estrella' | 'infinito' | 'luna' | 'flor' | 'destello' | 'ninguno';
export type ChainLength = '40cm' | '45cm' | '50cm' | '55cm';

export interface CustomizationOptions {
  necklaceType: NecklaceType;
  material: MaterialType;
  chain: ChainType;
  text: string;
  fontStyle: FontStyleType;
  symbol: SymbolType;
  length: ChainLength;
}

export interface Product {
  id: string;
  name: string;
  category: NecklaceType;
  price: number;
  originalPrice?: number;
  materialDefault: MaterialType;
  availableMaterials: MaterialType[];
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  craftTime: string;
  rating: number;
  reviewCount: number;
  isCustomizable: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  customization: CustomizationOptions;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  necklaceText: string;
  material: string;
}

export interface InspirationStory {
  id: string;
  title: string;
  category: 'Para ti' | 'Para mamá' | 'Para pareja' | 'Para amigas' | 'Para recordar' | 'Para regalar';
  necklaceName: string;
  quote: string;
  story: string;
  author: string;
  city: string;
  image: string;
  material: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  postalCode: string;
  paymentMethod: 'tarjeta' | 'pse' | 'nequi' | 'daviplata';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  notes?: string;
}
