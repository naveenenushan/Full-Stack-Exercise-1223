import { Request, Response } from 'express';
import { successResponse } from '../utilities/response';
export const checkHealth = async (req: Request, res: Response) => {
  return successResponse(res, 'server running', 'ok');
};
