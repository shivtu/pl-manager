import { Router } from 'express';

import {
  createProjectDesign,
  getProjectDesign,
} from '../controllers/projectDesign.controller';

export const projectDesignRouter = Router();
projectDesignRouter.route('/').get(getProjectDesign);
projectDesignRouter.route('/').post(createProjectDesign);
