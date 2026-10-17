import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { sendError, sendSuccess } from '../utils/response';

export const getProducts = (req: Request, res: Response) => {
  try {
    const filters = {
      category: req.query.category as string,
      material: req.query.material as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      search: req.query.search as string,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };

    const result = productService.getFilteredProducts(filters);
    return sendSuccess(res, result.products, 200, {
      pagination: {
        page: result.page,
        limit: result.limit,
        count: result.count,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 500);
  }
};

export const getProductById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return sendError(res, 'El parámetro ID debe ser un número entero', 400);
    }

    const product = productService.getProductById(id);
    if (!product) {
      return sendError(res, `El producto con ID ${id} no fue encontrado`, 404);
    }

    return sendSuccess(res, product);
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 500);
  }
};

export const createProduct = (req: Request, res: Response) => {
  try {
    const product = productService.createProduct(req.body);
    return sendSuccess(res, product, 201, {
      message: 'Producto creado exitosamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const updateProduct = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return sendError(res, 'El ID debe ser numérico', 400);
    }

    const product = productService.updateProductFull(id, req.body);
    return sendSuccess(res, product, 200, {
      message: 'Producto actualizado completamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const patchProduct = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return sendError(res, 'El ID debe ser numérico', 400);
    }

    const product = productService.updateProductPartial(id, req.body);
    return sendSuccess(res, product, 200, {
      message: 'Producto modificado parcialmente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 400);
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return sendError(res, 'El ID debe ser numérico', 400);
    }

    productService.deleteProduct(id);
    return sendSuccess(res, { id, deleted: true }, 200, {
      message: 'Producto eliminado correctamente',
    });
  } catch (err: any) {
    return sendError(res, err.message, err.statusCode || 404);
  }
};
