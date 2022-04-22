import { Router } from 'express';

import {
  createProjectDesignTask,
  getProjectDesignTask,
  updateProjectDesignTask,
} from '../controllers/projectDesign.controller';

export const projectDesignTaskRouter = Router();
projectDesignTaskRouter.route('/designs/find').get(getProjectDesignTask);
projectDesignTaskRouter.route('/designs/create').post(createProjectDesignTask);
projectDesignTaskRouter
  .route('/designs/update/:id')
  .put(updateProjectDesignTask);
