import { createResponse } from '../utils/createResponse';
import { UserModel } from '../models/User.schema';
import { IUser } from '../types/types';
import { ErrorResponse } from '../utils/ErrorResponse';
import { matchPassword } from '../utils/userHelper';
import { UNAUTHORIZED } from '../constants';
import { CookieParseOptions } from 'cookie-parser';

/**TODO: To be accessed only by admin */
export const getUserFromDB = async (reqQuery: any) => {
  const users = await UserModel.find(reqQuery).populate({
    path: 'userProfile',
    select:
      'userPhoneNumber userAlternateNumber userAddress userGovId createdAt',
  });

  return createResponse(users);
};

/**TODO: To be accessed only by admin */
export const createUserInDB = async (reqBody: IUser) => {
  const newUser = await UserModel.create(reqBody);

  return createResponse(newUser);
};

/**TODO: To be accessed only by admin */
export const updateUserPasswordInDB = async (userId: string, reqBody: any) => {
  const updatedPassword = await UserModel.findByIdAndUpdate(userId, {
    password: reqBody.password,
    newPassword: false,
  }).select('newPassword');

  return updatedPassword;
};

export const resetUserPasswordInDB = async (reqBody: {
  userId: string;
  oldPassword: string;
  password: string;
}) => {
  const user = await UserModel.findById(reqBody.userId).select('password');
  const match = await matchPassword(user, reqBody.password);

  if (!user) {
    throw new ErrorResponse(UNAUTHORIZED, 401);
  }

  if (!match) {
    throw new ErrorResponse(UNAUTHORIZED, 400);
  }

  const updatedUserPassword = await updateUserPasswordInDB(reqBody.userId, {
    password: reqBody.password,
  });

  return { sucess: true };
};

const getUserByEmailFromDB = async (email: string) => {
  const loginData = await UserModel.findOne({
    userEmail: email,
  }).select('userEmail password newPassword');
  return loginData;
};

/**Login user and send JWT token with cokkie */
export const getUserLoginData = async (reqBody: any) => {
  const user = await getUserByEmailFromDB(reqBody.userEmail);

  if (user?.newPassword)
    throw new ErrorResponse('User must reset password before first login', 400);

  if (!user) throw new ErrorResponse(UNAUTHORIZED, 400);

  /**Check if password matches */
  const matched = await matchPassword(user, reqBody.password);

  if (matched) {
    /**We can ts-ingnore the below line since getSignedJWTTokens is assigned to UserSchema
     *in User.schema.ts file */
    //@ts-ignore
    const token = user.getSignedJWTTokens();

    return token;
  }

  throw new ErrorResponse(UNAUTHORIZED, 401);
};
