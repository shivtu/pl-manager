import { NextFunction, Request, Response } from 'express';
import { rolesAndAccess } from '../static-data/rolesAndAccess.data';
import { createResponse } from '../utils/createResponse';

export const getRolesAndAccessData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return createResponse({ ...rolesAndAccess });
};
