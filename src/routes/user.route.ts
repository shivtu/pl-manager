import { Router } from 'express';
import {
  createUser,
  getUsers,
  loginUser,
  resetPassword,
  updateUserPassword,
} from '../controllers/user.controller';
import { createUserProfile } from '../controllers/userProfile.controller';
import { getCurrentLoggedInUer, protect } from '../middleware/auth';

export const userRouter = Router();

userRouter.route('/users/login').post(loginUser);
userRouter.route('/users/password/reset').post(resetPassword);

/**TODO: Reserved only for admin to access */
userRouter.route('/users/me').get(protect, getCurrentLoggedInUer);
userRouter.route('/users/find').get(getUsers);
userRouter.route('/users/password/update/:userId').put(updateUserPassword);
userRouter.route('/users/create').post(createUser);
userRouter.route('/users/profile/create').post(createUserProfile);
