import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import { IProjectNetCost } from '../types/types';
import { validateCurrentOwner } from '../utils/validations';
// import { CurrentOwnerModel } from './commonSchemas/CurrentOwnerSchema';

const ProjectNetCostSchema = new Schema<IProjectNetCost>({
  parentProjectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project ID is required'],
  },
  parentProjectName: {
    type: String,
    required: [true, 'Parent project name is required'],
  },
  componentName: {
    type: String,
    required: [
      true,
      'Component name is required to add a nest cost for that component',
    ],
    componentBaseCost: {
      type: Number,
      required: [
        true,
        'Component base cost is required to add margins and overhead',
      ],
    },
    componentMargin: {
      type: Number,
      required: true,
      default: 0,
    },
    componentOverHead: {
      type: Number,
      default: 0,
    },
    componentNetCost: {
      type: Number,
      required: [true, 'Component net cost has not been calculated'],
    },
    currentOwner: {
      type: Object,
      required: [true, 'Project cost must be assigned to an owner'],
      validate: validateCurrentOwner,
    },
    status: {
      enum: PROJECT_STATUS,
      required: [true, 'Status of the project net cost must be defined'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
});

export const ProjectNetCostModel = model(
  'projectnetcost',
  ProjectNetCostSchema
);
