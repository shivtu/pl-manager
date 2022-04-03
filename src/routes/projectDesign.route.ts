import { Router } from 'express';

import {
  createProjectDesign,
  getProjectDesign,
  updateProjectDesign,
} from '../controllers/projectDesign.controller';

export const projectDesignRouter = Router();
projectDesignRouter.route('/designs/find').get(getProjectDesign);
projectDesignRouter.route('/designs/create').post(createProjectDesign);
projectDesignRouter.route('/designs/update/:id').put(updateProjectDesign);
