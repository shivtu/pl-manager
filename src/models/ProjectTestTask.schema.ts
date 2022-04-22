import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import { IProjectTestTask } from '../types/types';
import { validateCurrentOwner } from '../utils/validations';
import { ProjectModel } from './Project.schema';

const ProjectTestTaskSchema = new Schema<IProjectTestTask>({
  parentProjectId: {
    type: Object,
    required: [true, 'Parent project ID is required'],
  },

  currentOwner: {
    type: Object,
    required: [true, 'A project test must be owned by someone'],
    validate: validateCurrentOwner,
  },

  status: {
    type: String,
    enum: PROJECT_STATUS,
    required: [true, 'Project test must have a status'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

export const ProjectTestTaskModel = model(
  'projecttesttask',
  ProjectTestTaskSchema
);
