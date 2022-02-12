import { Request, Response, NextFunction, CookieOptions } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createUserInDB,
  getUserFromDB,
  updateUserPasswordInDB,
  resetUserPasswordInDB,
  getUserLoginData,
} from '../services/user.services';

/**TODO: To be accessed only by admin */
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await getUserFromDB(req.query);

    res.status(200).json(data);
  }
);

/**TODO: To be accessed only by admin */
export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await createUserInDB(req.body);

    res.status(201).json(data);
  }
);

/**TODO: To be accessed only by admin */
export const updateUserPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await updateUserPasswordInDB(req.params.userId, req.body);
    res.status(201).json({ success: true });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = await getUserLoginData(req.body);
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + `${process.env.JWT_COOKIE_EXPIRE}`), // 1 day, same as jwt token expire
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // false for dev environment
    };
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .send({ success: true, token });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await resetUserPasswordInDB(req.body);
    res.status(201).json(data);
  }
);
