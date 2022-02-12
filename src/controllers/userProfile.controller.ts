import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createUserProfileInDB,
  getuserProfilesFromDB,
} from '../services/userProfile.services';

export const getuserProfiles = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await getuserProfilesFromDB(req.query);

    res.status(200).json(data);
  }
);

export const createUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await createUserProfileInDB(req.body);

    res.status(201).json(data);
  }
);
