import { Schema, model } from 'mongoose';
import { PROJECT_STAGE, PROJECT_STATUS, PROJECT_TYPE } from '../types/enums';
import { IProject } from '../types/types';
import { validateCurrentOwner } from '../utils/validations';

const validaterequirementList = (requirementList: string[]) => {
  return (
    Array.isArray(requirementList) &&
    requirementList.length &&
    requirementList.every((r) => typeof r === 'string' && r)
  );
};

const ProjectSchema = new Schema<IProject>({
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
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    unique: true,
    uppercase: true,
  },
  summary: {
    type: String,
    required: [true, 'Project summary is required'],
  },
  description: {
    type: String,
  },
  projectType: {
    type: String,
    enum: PROJECT_TYPE,
    required: true,
  },
  projectRequirements: {
    type: [String],
    required: [true, 'Project requirements must be defined'],
    validate: validaterequirementList,
  },
  currentOwner: {
    type: Object,
    required: [true, 'A project must be owned by someone'],
    validate: validateCurrentOwner,
  },
  stage: {
    type: String,
    enum: PROJECT_STAGE,
    default: PROJECT_STAGE.GENESIS,
  },
  status: {
    type: String,
    enum: PROJECT_STATUS,
    required: [true, 'Project must have a status'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

export const ProjectModel = model('project', ProjectSchema);
