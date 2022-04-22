import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createProjectDesignTaskInDB,
  getProjectDesignTaskFromDB,
  updateProjectDesignTaskInDB,
} from '../services/projectDesignTask.services';

export const getProjectDesignTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await getProjectDesignTaskFromDB(req.query);
    res.status(200).json(data);
  }
);

export const createProjectDesignTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await createProjectDesignTaskInDB(req.body);
    res.status(201).json(data);
  }
);

export const updateProjectDesignTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await updateProjectDesignTaskInDB(req.body, req.params.id);
    res.status(201).json(data);
  }
);
