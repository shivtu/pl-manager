import { Router } from 'express';
import {
  createUser,
  getUsers,
  updateUserPassword,
} from '../controllers/user.controller';
import { createUserProfile } from '../controllers/userProfile.controller';
import { protect } from '../middleware/auth';

export const userRouter = Router();

/**TODO: Reserved only for admin to access */
userRouter.route('/users/find').get(protect, getUsers);
userRouter
  .route('/users/password/update/:userId')
  .put(protect, updateUserPassword);
userRouter.route('/users/create').post(protect, createUser);
userRouter.route('/users/profile/create').post(protect, createUserProfile);
