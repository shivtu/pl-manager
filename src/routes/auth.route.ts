import { Router } from 'express';
import { loginUser, resetPassword } from '../controllers/user.controller';
import { getCurrentLoggedInUser, protect } from '../middleware/auth';

export const authRouter = Router();

authRouter.route('/auth/login').post(loginUser);
authRouter.route('/auth/password/reset').post(resetPassword);
authRouter.route('/auth/me').get(protect, getCurrentLoggedInUser);
