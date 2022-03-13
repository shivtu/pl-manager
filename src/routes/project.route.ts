import { Router } from 'express';
import {
  createProject,
  getProjects,
  updateProject,
} from '../controllers/project.controller';
import { protect } from '../middleware/auth';

export const projectRouter = Router();
projectRouter.route('/projects/find').get(protect, getProjects);
projectRouter.route('/projects/create').post(protect, createProject);
projectRouter.route('/projects/update/:projectId').put(updateProject);
