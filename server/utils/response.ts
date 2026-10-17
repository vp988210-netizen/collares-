import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  extra?: { message?: string; pagination?: any }
) => {
  const responseBody: ApiResponse<T> = {
    success: true,
    data,
    ...(extra?.message && { message: extra.message }),
    ...(extra?.pagination && { pagination: extra.pagination }),
  };
  return res.status(statusCode).json(responseBody);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400,
  errors?: string[]
) => {
  const responseBody: ApiResponse = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(responseBody);
};
