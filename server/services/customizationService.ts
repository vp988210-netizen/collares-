import { store } from '../models/store';
import { Customization } from '../models/types';
import {
  ALLOWED_CHAIN_LENGTHS,
  ALLOWED_MATERIALS,
  calculateCustomizationCost,
  normalizeMaterial,
} from '../utils/validation';

export interface CreateCustomizationDto {
  productId: number;
  text: string;
  material: string;
  font?: string;
  symbol?: string;
  chainLength?: string;
  petPhone?: string;
  reflective?: boolean;
  airtag?: boolean;
}

export const createCustomization = (data: CreateCustomizationDto): Customization => {
  if (!data.productId) {
    throw new Error('El productId es obligatorio para crear una personalización');
  }

  const product = store.products.find((p) => p.id === Number(data.productId));
  if (!product) {
    const error: any = new Error(`El producto asociado con ID ${data.productId} no existe`);
    error.statusCode = 404;
    throw error;
  }

  if (!data.text || typeof data.text !== 'string' || !data.text.trim()) {
    throw new Error('El texto personalizado o nombre es obligatorio');
  }

  if (data.text.trim().length > 30) {
    throw new Error('El texto no puede superar los 30 caracteres');
  }

  if (!data.material || !ALLOWED_MATERIALS.some((m) => m.toLowerCase() === data.material.toLowerCase())) {
    throw new Error(`El material "${data.material}" no es válido. Opciones permitidas: Oro, Plata, Oro Rosa`);
  }

  const chain = data.chainLength || '45cm';
  if (!ALLOWED_CHAIN_LENGTHS.some((l) => l.toLowerCase() === chain.toLowerCase())) {
    throw new Error(`La longitud de cadena "${chain}" no está permitida. Opciones: 40cm, 45cm, 50cm, 55cm, XS, S, M, L, XL`);
  }

  // Calculate pricing strictly on server side
  const { customizationCost, finalPrice } = calculateCustomizationCost(
    product.price,
    data.material,
    chain,
    { reflective: data.reflective, airtag: data.airtag }
  );

  const customization: Customization = {
    id: store.getNextCustomizationId(),
    productId: product.id,
    text: data.text.trim(),
    material: normalizeMaterial(data.material),
    font: data.font?.trim() || 'Elegante',
    symbol: data.symbol?.trim() || 'heart',
    chainLength: chain,
    petPhone: data.petPhone?.trim(),
    reflective: Boolean(data.reflective),
    airtag: Boolean(data.airtag),
    basePrice: product.price,
    customizationCost,
    finalPrice,
    createdAt: new Date().toISOString(),
  };

  store.customizations.push(customization);
  return customization;
};

export const getCustomizationById = (id: number): Customization | undefined => {
  return store.customizations.find((c) => c.id === id);
};

export const updateCustomization = (
  id: number,
  data: Partial<CreateCustomizationDto>
): Customization => {
  const index = store.customizations.findIndex((c) => c.id === id);
  if (index === -1) {
    const error: any = new Error(`La personalización con ID ${id} no existe`);
    error.statusCode = 404;
    throw error;
  }

  const current = store.customizations[index];
  const product = store.products.find((p) => p.id === (data.productId || current.productId));
  if (!product) {
    throw new Error('El producto asociado no existe');
  }

  if (data.text !== undefined && (!data.text || data.text.trim().length > 30)) {
    throw new Error('El texto no puede estar vacío ni superar los 30 caracteres');
  }

  const mat = data.material ? normalizeMaterial(data.material) : current.material;
  const chain = data.chainLength || current.chainLength;

  const { customizationCost, finalPrice } = calculateCustomizationCost(
    product.price,
    mat,
    chain,
    {
      reflective: data.reflective !== undefined ? data.reflective : current.reflective,
      airtag: data.airtag !== undefined ? data.airtag : current.airtag,
    }
  );

  const updated: Customization = {
    ...current,
    ...(data.text && { text: data.text.trim() }),
    material: mat,
    chainLength: chain,
    ...(data.font && { font: data.font.trim() }),
    ...(data.symbol && { symbol: data.symbol.trim() }),
    ...(data.petPhone !== undefined && { petPhone: data.petPhone.trim() }),
    ...(data.reflective !== undefined && { reflective: Boolean(data.reflective) }),
    ...(data.airtag !== undefined && { airtag: Boolean(data.airtag) }),
    customizationCost,
    finalPrice,
  };

  store.customizations[index] = updated;
  return updated;
};

export const deleteCustomization = (id: number): boolean => {
  const index = store.customizations.findIndex((c) => c.id === id);
  if (index === -1) {
    const error: any = new Error(`La personalización con ID ${id} no existe`);
    error.statusCode = 404;
    throw error;
  }
  store.customizations.splice(index, 1);
  return true;
};
