export interface ColorToken {
  name: string;
  role: string;
  hex: string;
  textDark?: boolean;
}

export const DESIGN_SYSTEM = {
  brand: {
    name: 'NOVA',
    tagline: 'Una joya que cuenta tu historia.',
    attributes: ['Elegante', 'Emocional', 'Moderna', 'Minimalista', 'Premium', 'Fácil de utilizar'],
  },
  palette: {
    primary: [
      { name: 'Blanco Cálido / Ivory', role: 'Fondo principal', hex: '#FDFBF7', textDark: true },
      { name: 'Beige Claro / Avena', role: 'Superficies y tarjetas', hex: '#F4EFEB', textDark: true },
      { name: 'Beige Medio', role: 'Bordes y divisores suaves', hex: '#EAE2D9', textDark: true },
    ],
    accents: [
      { name: 'Rosa Empolvado', role: 'Acento principal & botones activos', hex: '#C68B8B', textDark: false },
      { name: 'Rosa Suave', role: 'Fondos suaves y contenedores', hex: '#F6ECEC', textDark: true },
      { name: 'Dorado Sutil', role: 'Detalles de orfebrería y brillos', hex: '#C5A880', textDark: false },
      { name: 'Dorado Champán', role: 'Gradientes de oro 18K', hex: '#E5C384', textDark: true },
    ],
    neutrals: [
      { name: 'Marrón Oscuro', role: 'Títulos y textos principales', hex: '#2D2421', textDark: false },
      { name: 'Marrón Café Suave', role: 'Subtítulos y metadatos', hex: '#6E5D57', textDark: false },
      { name: 'Verde Salvia Muy Suave', role: 'Color secundario armónico', hex: '#8FA89B', textDark: false },
    ],
  },
  typography: {
    display: {
      family: 'Cormorant Garamond, Playfair Display, serif',
      characteristics: 'Serif de alta gama, delicado contraste, tracking sutil, elegancia editorial.',
      usage: 'Títulos de marca, hero, nombres de producto y citas emocionales.',
    },
    body: {
      family: 'Plus Jakarta Sans, sans-serif',
      characteristics: 'Geométrica limpia, legibilidad cristalina a cualquier escala.',
      usage: 'Botones, formularios, precios tabulares y textos descriptivos.',
    },
    script: {
      family: 'Alex Brush, cursive',
      characteristics: 'Caligrafía orfebre fluida para grabados caligráficos.',
      usage: 'Vista previa de collares con nombres y firmas.',
    },
  },
  geometry: {
    radii: {
      button: '9999px (Pill suave)',
      card: '1.25rem (20px)',
      input: '0.875rem (14px)',
      tag: '9999px',
    },
    shadows: {
      subtle: '0 2px 12px -2px rgba(45, 36, 33, 0.05)',
      card: '0 8px 24px -4px rgba(45, 36, 33, 0.06)',
      floating: '0 16px 36px -8px rgba(45, 36, 33, 0.12)',
    },
  },
  principles: [
    { number: '01', title: 'Espacio y Respiración', desc: 'Mucho espacio en blanco, cero saturación visual, márgenes y paddings generosos.' },
    { number: '02', title: 'Interactividad Real', desc: 'Cada control actualiza la vista previa y el precio dinámicamente; sin controles falsos.' },
    { number: '03', title: 'Lujo Minimalista', desc: 'Detalles dorados refinados, sin colores estridentes ni degradados agresivos.' },
  ],
};
