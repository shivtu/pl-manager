import { Router } from 'express';
import { getRolesAndAccess } from '../controllers/rolesAndAccess.controller';

export const publicRouter = Router();

publicRouter.route('/roles-access').get(getRolesAndAccess);

publicRouter.route('/welcome').get((req, res, next) => {
  res.send('Welcome!');
});
