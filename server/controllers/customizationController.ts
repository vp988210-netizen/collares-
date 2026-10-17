import { Request, Response } from 'express';
import * as customizationService from '../services/customizationService';
import { sendError, sendSuccess } from '../utils/response';

export const createCustomization = (req: Request, res: Response) => {
  try {
    const customization = customizationService.createCustomization(req.body);
    return sendSuccess(res, customization, 201, {
      message: 'Personalización de collar creada exitosamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const getCustomizationById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    const customization = customizationService.getCustomizationById(id);
    if (!customization) {
      return sendError(res, `Personalización con ID ${id} no encontrada`, 404);
    }

    return sendSuccess(res, customization);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const updateCustomization = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    const customization = customizationService.updateCustomization(id, req.body);
    return sendSuccess(res, customization, 200, {
      message: 'Personalización actualizada exitosamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const deleteCustomization = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    customizationService.deleteCustomization(id);
    return sendSuccess(res, { id, deleted: true }, 200, {
      message: 'Personalización eliminada correctamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 404);
  }
};
