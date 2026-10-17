import { store } from '../models/store';
import { Product } from '../models/types';

export interface ProductFilters {
  category?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export const getFilteredProducts = (filters: ProductFilters) => {
  let list = [...store.products];

  if (filters.category) {
    const cat = filters.category.toLowerCase().trim();
    list = list.filter((p) => p.category.toLowerCase().includes(cat));
  }

  if (filters.material) {
    const mat = filters.material.toLowerCase().trim();
    list = list.filter((p) => p.material.toLowerCase().includes(mat));
  }

  if (filters.minPrice !== undefined && !isNaN(filters.minPrice)) {
    list = list.filter((p) => p.price >= (filters.minPrice as number));
  }

  if (filters.maxPrice !== undefined && !isNaN(filters.maxPrice)) {
    list = list.filter((p) => p.price <= (filters.maxPrice as number));
  }

  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }

  const total = list.length;
  const page = Math.max(1, Number(filters.page) || 1);
  const limit = Math.max(1, Number(filters.limit) || 12);
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    products: paginated,
    page,
    limit,
    count: paginated.length,
    total,
    totalPages,
  };
};

export const getProductById = (id: number): Product | undefined => {
  return store.products.find((p) => p.id === id);
};

export const createProduct = (data: Partial<Product>): Product => {
  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    throw new Error('El nombre del producto es obligatorio');
  }
  if (data.price === undefined || typeof data.price !== 'number' || data.price < 0) {
    throw new Error('El precio no puede ser negativo ni estar vacío');
  }

  const newProduct: Product = {
    id: store.getNextProductId(),
    name: data.name.trim(),
    description: data.description?.trim() || 'Collar personalizado de alta calidad',
    price: data.price,
    material: data.material?.trim() || 'Plata',
    category: data.category?.trim() || 'Personalizados',
    image: data.image?.trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvmRAPwpE3u1Rq120SuFp4gL15DKBHuTqTWpsMp4Jrw_3sD2kqm6sgcf1u_Px0QviyTT9gtOeBuWSmBfL1EJdAwsonHkyaf90fcrMpMstsZC6pyYv7LbAMqXDqXck3aRUZAUEg-6jTwkFqrp7t7aZlAJ1CAZv02lsnS2sWt1y3-K-sQxte4nH6K7QP-9u0w2eagAAIbyOkauEvziFaPlI80_mWPWT2qYZByRHmZul',
    available: data.available !== undefined ? Boolean(data.available) : true,
    rating: 5.0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.products.unshift(newProduct);
  return newProduct;
};

export const updateProductFull = (id: number, data: Partial<Product>): Product => {
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`El producto con ID ${id} no existe`);
  }

  if (!data.name || !data.name.trim()) {
    throw new Error('El nombre del producto es obligatorio');
  }
  if (data.price === undefined || data.price < 0) {
    throw new Error('El precio no puede ser negativo');
  }

  const current = store.products[index];
  const updated: Product = {
    ...current,
    name: data.name.trim(),
    description: data.description?.trim() || current.description,
    price: data.price,
    material: data.material?.trim() || current.material,
    category: data.category?.trim() || current.category,
    image: data.image?.trim() || current.image,
    available: data.available !== undefined ? Boolean(data.available) : current.available,
    updatedAt: new Date().toISOString(),
  };

  store.products[index] = updated;
  return updated;
};

export const updateProductPartial = (id: number, patch: Partial<Product>): Product => {
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`El producto con ID ${id} no existe`);
  }

  if (patch.name !== undefined && (!patch.name || !patch.name.trim())) {
    throw new Error('El nombre no puede estar vacío');
  }
  if (patch.price !== undefined && patch.price < 0) {
    throw new Error('El precio no puede ser negativo');
  }

  const current = store.products[index];
  const updated: Product = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  store.products[index] = updated;
  return updated;
};

export const deleteProduct = (id: number): boolean => {
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`El producto con ID ${id} no existe`);
  }
  store.products.splice(index, 1);
  return true;
};
