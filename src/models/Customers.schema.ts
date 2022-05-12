import { model, Schema } from 'mongoose';
import { ICustomer } from '../types/types';

const CustomersSchema = new Schema<ICustomer>({
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: Number,
    required: true,
    unique: true,
  },
  customerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  customerAddress: {
    type: String,
  },
  customerOrganization: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  projects: {
    type: [String],
  },
});

export const CustomersModel = model('customers', CustomersSchema);
