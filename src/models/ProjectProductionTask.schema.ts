import { Schema, model } from 'mongoose';
import { IProjectProductionTask } from '../types/types';

const ProjectProductionTaskSchema = new Schema<IProjectProductionTask>({
  parentProjectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project ID is required'],
  },
  parentProjectName: {
    type: String,
    required: [true, 'Parent project name is required'],
  },
  productionTask: {
    type: String,
    required: true,
  },
});

export const ProjectProductionTaskModel = model(
  'projectproductiontask',
  ProjectProductionTaskSchema
);
