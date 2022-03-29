import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import { IProjectAssembly } from '../types/types';
import { validateCurrentOwner } from '../utils/validations';

const ProjectAssemblychema = new Schema<IProjectAssembly>({
  parentProjectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project ID is required'],
  },

  parentProjectName: {
    type: String,
    required: [true, 'Parent project name is required'],
  },

  assemblyNotes: {
    type: String,
  },

  currentOwner: {
    type: Object,
    required: [true, 'A project design task must be owned by someone'],
    validate: validateCurrentOwner,
  },

  status: {
    type: String,
    enum: PROJECT_STATUS,
    required: [true, 'Project design task must have a status'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

export const ProjectAssemblyModel = model(
  'projectassembly',
  ProjectAssemblychema
);
