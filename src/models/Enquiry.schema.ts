import { model, Schema } from 'mongoose';
import { IEnquiry } from '../types/types';
import { validateCurrentOwner } from '../utils/validations';

const EnquirySchema = new Schema<IEnquiry>({
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: Number,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Object,
    required: true,
    validate: validateCurrentOwner,
  },
  currentOwner: {
    type: Object,
    required: true,
    validate: validateCurrentOwner,
  },
  approvedBy: {
    type: Object,
    required: false,
    validate: validateCurrentOwner,
  },
});

export const EnquiryModel = model('enquiry', EnquirySchema);
