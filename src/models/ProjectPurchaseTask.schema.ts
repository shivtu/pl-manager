import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import { IProjectPurchase, IProjectPurchaseTask } from '../types/types';
import { validateCurrentOwner } from '../utils/validations';

const validatePurchaseList = (list: IProjectPurchase[]) => {
  if (Array.isArray(list)) {
    const listValidations = list.map(
      (val) =>
        val.componentName &&
        val.purchaseOrder &&
        typeof val.componentName === 'string' &&
        typeof val.purchaseOrder === 'string' &&
        !val.purchaseStatus &&
        typeof val.purchaseStatus === 'boolean'
    );

    return !listValidations.includes(false);
  }

  return false;
};

const ProjectPurchaseTaskSchema = new Schema<IProjectPurchaseTask>({
  parentProjectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project ID is required'],
  },
  parentProjectName: {
    type: String,
    required: [true, 'Parent project name is required'],
  },
  projectPurchaseList: {
    type: [Object],
    required: [true, 'Project purchase list must have at least one item'],
    validate: [validatePurchaseList, ''],
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

export const ProjectPurchaseTaskModel = model(
  'projectpurchasetask',
  ProjectPurchaseTaskSchema
);
