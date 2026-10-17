import { Request, Response } from 'express';
import * as cartService from '../services/cartService';
import { sendError, sendSuccess } from '../utils/response';

export const getCart = (_req: Request, res: Response) => {
  try {
    const cart = cartService.getCart();
    return sendSuccess(res, cart);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const addItem = (req: Request, res: Response) => {
  try {
    const cart = cartService.addItemToCart(req.body);
    return sendSuccess(res, cart, 201, {
      message: 'Producto añadido a la cesta correctamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const updateItem = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return sendError(res, 'Debe especificar la cantidad', 400);
    }

    const cart = cartService.updateCartItemQuantity(id, quantity);
    return sendSuccess(res, cart, 200, {
      message: 'Cantidad de producto actualizada en la cesta',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const removeItem = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = cartService.removeCartItem(id);
    return sendSuccess(res, cart, 200, {
      message: 'Producto retirado de la cesta',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 404);
  }
};

export const clearCart = (_req: Request, res: Response) => {
  try {
    const cart = cartService.clearCart();
    return sendSuccess(res, cart, 200, {
      message: 'Cesta vaciada completamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};
