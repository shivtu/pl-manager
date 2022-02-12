import { Router } from 'express';
import {
  createUserProfile,
  getuserProfiles,
} from '../controllers/userProfile.controller';

export const userProfileRouter = Router();
userProfileRouter.route('/').get(getuserProfiles);
userProfileRouter.route('/').post(createUserProfile);
