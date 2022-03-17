import { Schema, model } from 'mongoose';
import { PROJECT_STATUS } from '../types/enums';
import { IProjectDesign, IProjectComponent } from '../types/types';
import { ProjectComponentType } from '../types/custom-mongoose-schema-types/ProjectComponentType';
import { validateCurrentOwner } from '../utils/validations';

const minProjectComponents = (val: Array<IProjectComponent>) =>
  val.length !== 0;

const ProjectDesignSchema = new Schema<IProjectDesign>({
  projectId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent project is required to create a design task'],
  },
  components: {
    type: [ProjectComponentType],
    // required: [true, 'Desing components of a project are required'],
    // validate: [
    //   minProjectComponents,
    //   'There must be atleast one component in design phase',
    // ],
  },
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

export const ProjectDesignModel = model('projectdesign', ProjectDesignSchema);
