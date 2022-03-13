import { Router } from 'express';
import {
  createUserProfile,
  getCurrentUserProfile,
  getuserProfiles,
} from '../controllers/userProfile.controller';
import { protect } from '../middleware/auth';

export const userProfileRouter = Router();
userProfileRouter.route('/users/profiles').get(getuserProfiles);
userProfileRouter.route('/').post(createUserProfile);
userProfileRouter
  .route('/users/profile/me')
  .get(protect, getCurrentUserProfile);
