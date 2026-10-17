import { Request, Response } from 'express';
import * as favoriteService from '../services/favoriteService';
import { sendError, sendSuccess } from '../utils/response';

export const getFavorites = (_req: Request, res: Response) => {
  try {
    const favorites = favoriteService.getFavorites();
    return sendSuccess(res, favorites);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const addFavorite = (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return sendError(res, 'Debe especificar el productId a agregar a favoritos', 400);
    }

    const favorites = favoriteService.addFavorite(Number(productId));
    return sendSuccess(res, favorites, 201, {
      message: 'Producto guardado en favoritos',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const removeFavorite = (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return sendError(res, 'productId es requerido', 400);
    }

    const favorites = favoriteService.removeFavorite(Number(productId));
    return sendSuccess(res, favorites, 200, {
      message: 'Producto retirado de favoritos',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 404);
  }
};
