import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createProjectDesignInDB,
  getProjectDesignsFromDB,
  updateProjectDesignInDB,
} from '../services/projectDesign.services';

export const getProjectDesign = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await getProjectDesignsFromDB(req.query);
    res.status(200).json(data);
  }
);

export const createProjectDesign = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await createProjectDesignInDB(req.body);
    res.status(201).json(data);
  }
);

export const updateProjectDesign = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await updateProjectDesignInDB(req.body, req.params.id);
    res.status(201).json(data);
  }
);
