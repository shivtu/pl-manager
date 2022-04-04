import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { getRolesAndAccessData } from '../services/rolesAndAccess.services';

export const getRolesAndAccess = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const data = getRolesAndAccessData(req, res, next);
    res.status(200).json(data);
  }
);
