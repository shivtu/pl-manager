import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants';
import { UserModel } from '../models/User.schema';
import { UserProfileModel } from '../models/UserProfile.schema';
import { IReqUser, UserRoleTypes } from '../types/types';
import { ErrorResponse } from '../utils/ErrorResponse';
import { asyncHandler } from './asyncHandler';

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

    // TODO: add the hard coded string to constants or enum file
    const userAccessList = {
      admin: [
        'projects',
        'designs',
        'costs',
        'assembly',
        'production',
        'users',
        'purchases',
      ],
      designer: ['designs'],
      production: ['production'],
      assembly: ['assembly'],
      purchases: ['purchases'],
    };

    const userRole = reqUser.userRole;

    return userAccessList[userRole].includes(accessPath);
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

      const user = await UserModel.findById(decoded._id).select(
        'userProfile userRole userEmail isActive'
      );
      const userProfile = await UserProfileModel.findOne({
        userEmail: user?.userEmail,
      });

      /**Asign a user object to req */
      Object.assign(req, {
        user: {
          userId: userProfile?._id,
          name: userProfile?.userName,
          email: userProfile?.userEmail,
          phoneNumber: userProfile?.userPhoneNumber,
          isActive: user?.isActive,
          userRole: user?.userRole,
        },
      });

      //@ts-ignore
      if (isAuthorized(req.path, req.user)) {
        next();
      } else {
        throw new ErrorResponse(UNAUTHORIZED, 401);
      }
    } catch (error) {
      console.log('ERRRRRR:: ', error);
      throw new ErrorResponse(UNAUTHORIZED, 401);
    }
  }
);

export const getCurrentLoggedInUer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    res.send({ success: true, user: req.user });
  }
);
