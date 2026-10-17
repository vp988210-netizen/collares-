import { store } from '../models/store';
import { Product } from '../models/types';

export const getFavorites = (): Product[] => {
  return store.favorites
    .map((fav) => store.products.find((p) => p.id === fav.productId))
    .filter(Boolean) as Product[];
};

export const addFavorite = (productId: number): Product[] => {
  const pId = Number(productId);
  const product = store.products.find((p) => p.id === pId);
  if (!product) {
    const error: any = new Error(`El producto con ID ${productId} no existe`);
    error.statusCode = 404;
    throw error;
  }

  const exists = store.favorites.some((f) => f.productId === pId);
  if (!exists) {
    store.favorites.push({
      productId: pId,
      addedAt: new Date().toISOString(),
    });
  }

  return getFavorites();
};

export const removeFavorite = (productId: number): Product[] => {
  const pId = Number(productId);
  const index = store.favorites.findIndex((f) => f.productId === pId);
  if (index === -1) {
    const error: any = new Error(`El producto con ID ${productId} no estaba en favoritos`);
    error.statusCode = 404;
    throw error;
  }

  store.favorites.splice(index, 1);
  return getFavorites();
};
