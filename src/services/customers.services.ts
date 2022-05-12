import { CustomersModel } from '../models/Customers.schema';
import { ICustomer } from '../types/types';
import { createResponse } from '../utils/createResponse';

export const getCustomersFromDB = async (reqQuery: any) => {
  const customers = await CustomersModel.find(reqQuery);

  return createResponse(customers);
};

export const createCustomerInDB = async (reqBody: ICustomer) => {
  const newCustomer = await CustomersModel.create(reqBody);
  return createResponse(newCustomer);
};
