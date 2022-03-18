import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import {
  IProjectAssembly,
  IProjectAssemblyParentProjectRef,
} from '../types/types';
import { validateCurrentOwner } from '../utils/validations';
import { ProjectModel } from './Project.schema';

const validateForProjectType = async (
  val: IProjectAssemblyParentProjectRef
) => {
  const parentProject = await ProjectModel.findById(val.projectId);
  return parentProject?.projectName === val.projectName;
};

const ProjectAssemblySchema = new Schema<IProjectAssembly>({
  parentProject: {
    type: Object,
    required: true,
    validate: [
      validateForProjectType,
      'Project assembly task must have a parent project',
    ],
  },

  currentOwner: {
    type: Object,
    required: [true, 'A project must be owned by someone'],
    validate: validateCurrentOwner,
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

export const ProjectAssemblyModel = model('project', ProjectAssemblySchema);
