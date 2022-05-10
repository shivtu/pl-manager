import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createProjectInDB,
  getProjectsFromDB,
  getProjectTasksFromDB,
} from '../services/project.services';
import { PROJECT_STAGE } from '../types/enums';

export const getProjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await getProjectsFromDB(req.query);

    res.status(200).json(data);
  }
);

export const createProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    /**Add genisis to project stage automatically while creating the project */
    req.body.stage = PROJECT_STAGE.GENESIS;

    const data = await createProjectInDB(req.body);

    res.status(201).json(data);
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(req.body);
  }
);

export const getProjectTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectTasks = await getProjectTasksFromDB(
      req.params.parentProjectId
    );

    res.status(200).send(projectTasks);
  }
);
