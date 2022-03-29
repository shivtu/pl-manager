import { ProjectAssemblyModel } from './models/ProjectAssembly.schema';
import { ProjectDesignModel } from './models/ProjectDesign.schema';
import { ProjectProductionTaskModel } from './models/ProjectProductionTask.schema';
import { ProjectPurchasesModel } from './models/ProjectPurchases.schema';
import { ProjectTestModel } from './models/ProjectTest.schema';

export const BASE_URI = '/api/v1/pl-manager';
export const UNAUTHORIZED = 'unauthorized';
export const BAD_REQUEST = 'Bad request';
export const PROJECT_TASK_MODELS = [
  ProjectDesignModel,
  ProjectPurchasesModel,
  ProjectProductionTaskModel,
  ProjectAssemblyModel,
  ProjectTestModel,
];
