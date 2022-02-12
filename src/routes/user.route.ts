import { Router } from 'express';
import {
  createUser,
  getUsers,
  loginUser,
  updateUserPassword,
} from '../controllers/user.controller';
import { getCurrentLoggedInUer } from '../middleware/auth';

export const userRouter = Router();

userRouter.route('/').get(getUsers);
userRouter.route('/me').get(getCurrentLoggedInUer);
/**TODO: Reserved only for admin to access */
userRouter.route('/update/:userId').put(updateUserPassword);
userRouter.route('/login').post(loginUser);
userRouter.route('/password/reset').post();
userRouter.route('/').post(createUser);
