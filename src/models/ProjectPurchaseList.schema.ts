import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import { IProjectPurchase, IProjectPurchaseList } from '../types/types';
import { validateCurrentOwner } from '../utils/validations';
// import { CurrentOwnerModel } from './commonSchemas/CurrentOwnerSchema';

const ProjectPurchaseSchema = new Schema<IProjectPurchase>({
  componentName: {
    type: String,
    required: [true, 'Component name is required'],
  },
  purchaseOrder: {
    type: String,
  },
  purchaseStatus: {
    type: Boolean,
    default: false,
  },
});

const ProjectPurchaseListSchema = new Schema<IProjectPurchaseList>({
  projectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project is required to create a design task'],
  },
  projectPurchaseList: {
    type: [ProjectPurchaseSchema],
    required: [true, 'Project purchase list must have at least one item'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: PROJECT_STATUS,
  },
  currentOwner: {
    type: Object,
    required: [true, 'Project purchases must be assigned to a user'],
    validate: validateCurrentOwner,
  },
});

export const ProjectPurchaseListModel = model(
  'projectpurchaselist',
  ProjectPurchaseListSchema
);
