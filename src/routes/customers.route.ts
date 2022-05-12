import { Router } from 'express';
import {
  getCustomers,
  createCustomers,
} from '../controllers/customers.controller';
import { protect } from '../middleware/auth';

export const customerRouter = Router();

customerRouter.route('/customers/find').get(protect, getCustomers);
customerRouter.route('/customers/create').post(protect, createCustomers);
