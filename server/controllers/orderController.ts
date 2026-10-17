import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { sendError, sendSuccess } from '../utils/response';

export const getOrders = (_req: Request, res: Response) => {
  try {
    const orders = orderService.getAllOrders();
    return sendSuccess(res, orders);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const getOrderById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'El ID de pedido debe ser numérico', 400);

    const order = orderService.getOrderById(id);
    if (!order) {
      return sendError(res, `El pedido #${id} no fue encontrado`, 404);
    }

    return sendSuccess(res, order);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const createOrder = (req: Request, res: Response) => {
  try {
    const order = orderService.createOrder(req.body);
    return sendSuccess(res, order, 201, {
      message: `¡Pedido #${order.id} registrado con éxito! Confección en taller iniciada.`,
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const updateOrderStatus = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'El ID de pedido debe ser numérico', 400);

    const { status } = req.body;
    if (!status) return sendError(res, 'El nuevo estado del pedido es requerido', 400);

    const order = orderService.updateOrderStatus(id, status);
    return sendSuccess(res, order, 200, {
      message: `Estado del pedido #${id} actualizado a "${status}"`,
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};
