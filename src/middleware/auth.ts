import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants';
import { UserProfileModel } from '../models/UserProfile.schema';
import { IReqUser, UserRoleTypes } from '../types/types';
import { ErrorResponse } from '../utils/ErrorResponse';
import { asyncHandler } from './asyncHandler';
import { rolesAndAccess } from '../static-data/rolesAndAccess.data';

const isAuthorized = (reqPath: string, reqUser: IReqUser): boolean => {
  if (reqUser.isActive) {
    const reqPathArray = Array.from(reqPath).slice(1);

    const slashAtIndex = reqPathArray.findIndex((v) => v === '/');

    //@ts-ignore
    const accessPath: UserRoleTypes = reqPathArray
      .slice(0, slashAtIndex)
      .toString()
      .split(',')
      .join('');

    const userRole = reqUser.userRole;

    return rolesAndAccess[userRole].includes(accessPath);
  }

  return false;
};

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string;

    const reqHeadersAuth = req.headers.authorization;

    if (reqHeadersAuth && reqHeadersAuth.startsWith('Bearer ')) {
      token = reqHeadersAuth.split(' ')[1];
    }

    if (req.cookies.token) {
      token = req.cookies.token;
    }

    /**Make sure token exists */
    //@ts-ignore
    if (!token) return next(new ErrorResponse(UNAUTHORIZED, 401));

    try {
      //@ts-ignore
      const decoded: JwtPayload = jwt.verify(
        token,
        `${process.env.JWT_SECRET}`
      );

      const userProfile = await UserProfileModel.findOne({
        userEmail: decoded?.userEmail,
      });

      /**Asign a user object to req */
      Object.assign(req, { userProfile });

      //@ts-ignore
      if (isAuthorized(req.path, req.userProfile)) {
        next();
      } else {
        throw new ErrorResponse(UNAUTHORIZED, 401);
      }
    } catch (error) {
      console.log('ERROR:: ', error);
      throw new ErrorResponse(UNAUTHORIZED, 401);
    }
  }
);

export const getCurrentLoggedInUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    res.send({ success: true, user: req.userProfile });
  }
);
