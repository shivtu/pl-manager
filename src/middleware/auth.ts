import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler';
import { ErrorResponse } from '../utils/ErrorResponse';
import { UserModel } from '../models/User.schema';
import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from '../constants';

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string;

    const reqHeadersAuth = req.headers.authorization;

    if (reqHeadersAuth && reqHeadersAuth.startsWith('Bearer ')) {
      token = reqHeadersAuth.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    /**Make sure token exists */
    //@ts-ignore
    if (!token) return next(new ErrorResponse(UNAUTHORIZED, 401));

    try {
      //@ts-ignore
      const decoded: jwt.JwtPayload = jwt.verify(
        token,
        `${process.env.JWT_SECRET}`
      );

      const user = await UserModel.findById(decoded._id);
      /**Asign a user object to req */
      Object.assign(req, { user });

      next();
    } catch (error) {
      throw new ErrorResponse(UNAUTHORIZED, 401);
    }
  }
);

export const getCurrentLoggedInUer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    res.send({ success: true, data: req.user });
  }
);
