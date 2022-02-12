import { Schema, model } from 'mongoose';
import { IProjectProductionTask } from '../types/types';

const ProjectProductionTaskSchema = new Schema<IProjectProductionTask>({
  projectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project is required to create a design task'],
  },
  productionTask: {
    type: String,
    required: true,
  },
});

export const IProjectProductionTaskModel = model(
  'projectproductiontask',
  ProjectProductionTaskSchema
);
