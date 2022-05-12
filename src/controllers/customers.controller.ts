import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  getCustomersFromDB,
  createCustomerInDB,
} from '../services/customers.services';

export const getCustomers = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getCustomersFromDB(req.query);
    res.status(200).json(data);
  }
);

export const createCustomers = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await createCustomerInDB(req.body);
    res.status(201).json(data);
  }
);
