import { Request, Response } from 'express';
import * as customerService from '../services/customerService';
import { sendError, sendSuccess } from '../utils/response';

export const getCustomers = (_req: Request, res: Response) => {
  try {
    const customers = customerService.getAllCustomers();
    return sendSuccess(res, customers);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const getCustomerById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    const customer = customerService.getCustomerById(id);
    if (!customer) return sendError(res, `Cliente con ID ${id} no encontrado`, 404);

    return sendSuccess(res, customer);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const createCustomer = (req: Request, res: Response) => {
  try {
    const customer = customerService.createCustomer(req.body);
    return sendSuccess(res, customer, 201, { message: 'Cliente registrado correctamente' });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const updateCustomer = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    const customer = customerService.updateCustomer(id, req.body);
    return sendSuccess(res, customer, 200, { message: 'Cliente actualizado correctamente' });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const deleteCustomer = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    customerService.deleteCustomer(id);
    return sendSuccess(res, { id, deleted: true }, 200, { message: 'Cliente eliminado' });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 404);
  }
};
