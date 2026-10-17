import { store } from '../models/store';
import { Category } from '../models/types';

export const getAllCategories = (): Category[] => {
  return store.categories.map((cat) => ({
    ...cat,
    productCount: store.products.filter(
      (p) => p.category.toLowerCase() === cat.name.toLowerCase()
    ).length,
  }));
};

export const getCategoryById = (id: number): Category | undefined => {
  const cat = store.categories.find((c) => c.id === id);
  if (!cat) return undefined;
  return {
    ...cat,
    productCount: store.products.filter(
      (p) => p.category.toLowerCase() === cat.name.toLowerCase()
    ).length,
  };
};

export const createCategory = (data: Partial<Category>): Category => {
  if (!data.name || !data.name.trim()) {
    throw new Error('El nombre de la categoría es obligatorio');
  }

  const exists = store.categories.some(
    (c) => c.name.toLowerCase() === data.name!.trim().toLowerCase()
  );
  if (exists) {
    const error: any = new Error(`La categoría "${data.name}" ya existe`);
    error.statusCode = 409;
    throw error;
  }

  const newCat: Category = {
    id: store.getNextCategoryId(),
    name: data.name.trim(),
    slug:
      data.slug?.trim() ||
      data.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
    description: data.description?.trim() || '',
  };

  store.categories.push(newCat);
  return newCat;
};

export const updateCategory = (id: number, data: Partial<Category>): Category => {
  const index = store.categories.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error(`La categoría con ID ${id} no existe`);
  }

  if (data.name && !data.name.trim()) {
    throw new Error('El nombre de la categoría no puede estar vacío');
  }

  const current = store.categories[index];
  const updated: Category = {
    ...current,
    ...(data.name && { name: data.name.trim() }),
    ...(data.slug && { slug: data.slug.trim() }),
    ...(data.description !== undefined && { description: data.description.trim() }),
  };

  store.categories[index] = updated;
  return updated;
};

export const deleteCategory = (id: number): boolean => {
  const index = store.categories.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error(`La categoría con ID ${id} no existe`);
  }
  store.categories.splice(index, 1);
  return true;
};
