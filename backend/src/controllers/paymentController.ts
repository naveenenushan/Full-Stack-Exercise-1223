import { Request, Response } from 'express';
import Joi from 'joi';
import { errorResponse, successResponse } from '../utilities/response';
import { savePaymentData } from '../services/paymentService';
import { TPayment } from '../types/paymentType';
export const addPayment = async (req: Request, res: Response) => {
  const schema = Joi.object({
    amount: Joi.number().min(1).required(),
    name: Joi.string().min(1).required(),
    code: Joi.string().min(1).required(),
    grid: Joi.array().required(),
  }).options({ abortEarly: false, errors: { label: false } });

  const { error } = schema.validate(req.body);

  if (error)
    return errorResponse(
      res,
      'Validation error occurred.',
      'VALIDATION_ERROR',
      error.details,
    );

  const { amount, grid, code, name } = req.body;

 
  const paymentData: TPayment = {
    amount: amount,
    grid: grid,
    code: code,
    name: name,
  };

  const savedPayment = savePaymentData(paymentData);
  if (savedPayment) {
    return successResponse(res, 'payment saved', savedPayment);
  } else {
    return errorResponse(
      res,
      'Something went wrong',
      'SOMETHING_WENT_WRONG',
      '',
    );
  }
};
