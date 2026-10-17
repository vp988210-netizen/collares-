import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[API Error]:', err);

  const statusCode = err.statusCode || (err.status && typeof err.status === 'number' ? err.status : 500);
  const message = err.message || 'Error interno del servidor';

  return sendError(res, message, statusCode);
};

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(res, `Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404);
};
