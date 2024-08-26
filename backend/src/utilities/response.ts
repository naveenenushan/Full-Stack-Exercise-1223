import {  Response } from 'express';

export const successResponse = (res: Response, message: string, data: any) => {
  return res.status(200).json({
    status: 'success',
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  errorCode: string,
  errors: any,
) => {
  return res.status(400).json({
    status: 'error',
    message,
    errorCode,
    errors,
  });
};
