import { Router } from 'express';
import { getRolesAndAccess } from '../controllers/rolesAndAccess.controller';

export const publicRouter = Router();

publicRouter.route('/public/roles-access').get(getRolesAndAccess);
publicRouter.route('/public/welcome').get((req, res, next) => {
  res.send('Welcome!');
});
