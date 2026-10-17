export type SpeciesType = 'dog' | 'cat';
export type CollarSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type LeatherColor = 'rose' | 'mint' | 'sky' | 'cognac' | 'lavender';
export type HardwareFinish = 'brass' | 'black' | 'rosegold' | 'silver';
export type CharmType = 'bone' | 'fish' | 'acorn' | 'bell';

export interface CollarConfig {
  species: SpeciesType;
  size: CollarSize;
  cm: number;
  leather: LeatherColor;
  leatherName: string;
  leatherHex: [string, string, string];
  metal: HardwareFinish;
  metalName: string;
  metalHex: [string, string, string];
  charm: CharmType;
  petName: string;
  petPhone: string;
  font: string;
  reflective: boolean;
  airtag: boolean;
  basePrice: number;
}

export interface ProductCatalogItem {
  id: string;
  name: string;
  speciesCategory: 'perro' | 'gato' | 'both';
  categoryTitle: string;
  material: string;
  badge1?: string;
  badge2?: string;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
  description: string;
  width: string;
  colors: string[];
  price: number;
}

export interface ReviewItem {
  id: string;
  petName: string;
  ownerName: string;
  breed: string;
  city: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  collarModel: string;
  collarSize: string;
  image: string;
  alt: string;
  species: 'golden' | 'gatos' | 'collie' | 'teckel' | 'bulldog';
  modelKey: string;
  verified: boolean;
  specialTag?: string;
  likes: number;
}

export interface MedicalRecord {
  id: string;
  petName: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  avatar: string;
  isLost: boolean;
  rewardAmount: number;
  primaryPhone: string;
  chipNumber: string;
  allergies: string[];
  medicalConditions: string[];
  medication: string;
  behaviorNotes: string;
  vetClinicName: string;
  vetClinicPhone: string;
  vetDoctor: string;
  serialNumber: string;
  lastDetected: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  image?: string;
}
