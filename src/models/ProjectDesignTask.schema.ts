import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import { IProjectDesignTask } from '../types/types';
import { ProjectComponentType } from '../types/custom-mongoose-schema-types/ProjectComponentType';
import { validateCurrentOwner } from '../utils/validations';

const ProjectDesignTaskSchema = new Schema<IProjectDesignTask>({
  parentProjectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project ID is required'],
  },

  parentProjectName: {
    type: String,
    required: [true, 'Parent project name is required'],
  },

  components: {
    type: [ProjectComponentType],
    default: [],
  },

  // This value will be inserted while creating project-design
  projectRequirements: {
    type: [String],
    required: [
      true,
      'Requirements of the project are required for design phase',
    ],
    validate: (val: Array<String>) => val.length > 0,
  },

  status: {
    type: String,
    enum: PROJECT_STATUS,
    default: PROJECT_STATUS.CREATED,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  completedAt: {
    type: Date,
  },

  currentOwner: {
    type: Object,
    required: [true, 'Project design must be owned by a user'],
    validate: validateCurrentOwner,
  },
});

export const ProjectDesignTaskModel = model(
  'projectdesigntask',
  ProjectDesignTaskSchema
);
