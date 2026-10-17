export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/[^\d]/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

export const ALLOWED_MATERIALS = [
  'Plata',
  'Oro',
  'Oro Rosa',
  'Latón',
  'Latón Dorado',
  'Negro Mate',
  'Plata Vintage',
  'oro',
  'plata',
  'oro-rosa',
  'brass',
  'black',
  'rosegold',
  'silver',
];

export const ALLOWED_CHAIN_LENGTHS = [
  '40cm',
  '45cm',
  '50cm',
  '55cm',
  '40 cm',
  '45 cm',
  '50 cm',
  '55 cm',
  'XS',
  'S',
  'M',
  'L',
  'XL',
];

export const ALLOWED_ORDER_STATUSES = [
  'pending',
  'confirmed',
  'production',
  'shipped',
  'delivered',
  'cancelled',
];

export const normalizeMaterial = (mat: string): string => {
  const m = mat.trim().toLowerCase();
  if (m === 'oro' || m === 'gold' || m === 'brass' || m.includes('laton') || m.includes('latón')) return 'Oro';
  if (m === 'plata' || m === 'silver' || m.includes('vintage')) return 'Plata';
  if (m.includes('rosa') || m === 'rosegold') return 'Oro Rosa';
  return mat.trim();
};

export const calculateCustomizationCost = (
  basePrice: number,
  material: string,
  chainLength?: string,
  extras?: { reflective?: boolean; airtag?: boolean }
): { customizationCost: number; finalPrice: number } => {
  let cost = 0;
  const normMat = normalizeMaterial(material);

  if (normMat === 'Oro') {
    cost += 40000;
  } else if (normMat === 'Oro Rosa') {
    cost += 35000;
  } else {
    cost += 15000; // Plata
  }

  if (chainLength && (chainLength.includes('50') || chainLength.includes('55') || chainLength === 'L' || chainLength === 'XL')) {
    cost += 5000;
  }

  if (extras?.reflective) cost += 10000;
  if (extras?.airtag) cost += 20000;

  return {
    customizationCost: cost,
    finalPrice: basePrice + cost,
  };
};
