import { ProjectAssemblyTaskModel } from './models/ProjectAssemblyTask.schema';
import { ProjectDesignTaskModel } from './models/ProjectDesignTask.schema';
import { ProjectProductionTaskModel } from './models/ProjectProductionTask.schema';
import { ProjectPurchaseTaskModel } from './models/ProjectPurchaseTask.schema';
import { ProjectTestTaskModel } from './models/ProjectTestTask.schema';

export const BASE_URI = '/api/v1/pl-manager';
export const UNAUTHORIZED = 'unauthorized';
export const BAD_REQUEST = 'Bad request';
export const PROJECT_TASK_MODELS = [
  ProjectDesignTaskModel,
  ProjectPurchaseTaskModel,
  ProjectProductionTaskModel,
  ProjectAssemblyTaskModel,
  ProjectTestTaskModel,
];
