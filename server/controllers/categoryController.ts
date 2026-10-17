import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import { sendError, sendSuccess } from '../utils/response';

export const getCategories = (_req: Request, res: Response) => {
  try {
    const categories = categoryService.getAllCategories();
    return sendSuccess(res, categories);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const getCategoryById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    const category = categoryService.getCategoryById(id);
    if (!category) return sendError(res, `Categoría con ID ${id} no encontrada`, 404);

    return sendSuccess(res, category);
  } catch (err: any) {
    return sendError(res, err.message, 500);
  }
};

export const createCategory = (req: Request, res: Response) => {
  try {
    const category = categoryService.createCategory(req.body);
    return sendSuccess(res, category, 201, { message: 'Categoría creada exitosamente' });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const updateCategory = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    const category = categoryService.updateCategory(id, req.body);
    return sendSuccess(res, category, 200, { message: 'Categoría actualizada' });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const deleteCategory = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return sendError(res, 'ID inválido', 400);

    categoryService.deleteCategory(id);
    return sendSuccess(res, { id, deleted: true }, 200, { message: 'Categoría eliminada' });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 404);
  }
};
