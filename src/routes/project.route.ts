import { Router } from 'express';
import {
  createProject,
  getProjects,
  updateProject,
} from '../controllers/project.controller';

export const projectRouter = Router();
projectRouter.route('/').get(getProjects);
projectRouter.route('/').post(createProject);
projectRouter.route('/update/:projectId').put(updateProject);
