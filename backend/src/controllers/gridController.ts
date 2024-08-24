import { Request, Response } from 'express';
import { getGridData } from '../services/gridService';
import Joi from 'joi';
import { errorResponse, successResponse } from '../utilities/response';
export const getGrid = async (req: Request, res: Response) => {
  const schema = Joi.object({
    character: Joi.string()
      .pattern(/^[a-z]+$/)
      .max(1)
      .allow(null)
      .messages({
        'string.pattern.base':
          'The field should only contain lowercase alphabetic characters.',
      }),
  }).options({ abortEarly: false, errors: { label: false } });

  const { error } = schema.validate(req.body);
  if (error)
    
    return errorResponse(
      res,
      'Validation error occurred.',
      'VALIDATION_ERROR',
      error.details[0].message,
    );

  const { character } = req.body;
  const gridData = getGridData(character);
  if (gridData) {
    return successResponse(res, 'grid generated', gridData);
  } else {
    return errorResponse(
      res,
      'Something went wrong',
      'SOMETHING_WENT_WRONG',
      '',
    );
  }
};
