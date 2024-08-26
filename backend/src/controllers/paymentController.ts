import { Request, Response } from 'express';
import Joi from 'joi';
import { errorResponse, successResponse } from '../utilities/response';
import { savePaymentData, getPaymentsData } from '../services/paymentService';
import { TPayment } from '../types/paymentType';
export const addPayment = async (req: Request, res: Response) => {
  const schema = Joi.object({
    amount: Joi.number().min(1).required(),
    name: Joi.string().min(1).required(),
    code: Joi.number().min(0).max(100).required(),
    grid: Joi.array().required(),
  }).options({ abortEarly: false, errors: { label: false } });

  const { error: schemaError } = schema.validate(req.body);

  if (schemaError)
    return errorResponse(
      res,
      'Validation error occurred.',
      'VALIDATION_ERROR',
      schemaError.details,
    );

  const { amount, grid, code, name } = req.body;
  try {
    const flatArray = grid.flat();
    //validating grid data
    if (flatArray.length !== 100) {
      return errorResponse(
        res,
        'Grid data is not valid',
        'GRID_DATA_INVALID',
        '',
      );
    }
    //if needed we can use the code generation logic to validate grid with the code

    const paymentData: TPayment = {
      amount: amount,
      grid: grid,
      code: code,
      name: name,
    };

    const savedPayment = await savePaymentData(paymentData);

    if (savedPayment) {
      return successResponse(res, 'payment saved', savedPayment);
    } else {
      console.error(savedPayment);
      return errorResponse(
        res,
        'Something went wrong',
        'SOMETHING_WENT_WRONG',
        '',
      );
    }
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      'Something went wrong',
      'SOMETHING_WENT_WRONG',
      error,
    );
  }
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await getPaymentsData();

    return successResponse(res, 'payments list', payments);
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      'Something went wrong',
      'SOMETHING_WENT_WRONG',
      error,
    );
  }
};
