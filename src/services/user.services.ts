import { createResponse } from '../utils/createResponse';
import { UserModel } from '../models/User.schema';
import { IUser, IUserProfile } from '../types/types';
import { ErrorResponse } from '../utils/ErrorResponse';
import { matchPassword } from '../utils/userHelper';
import { UNAUTHORIZED } from '../constants';
import { UserProfileModel } from '../models/UserProfile.schema';
import { FilterQuery } from 'mongoose';

/**TODO: To be accessed only by admin */
export const getUserFromDB = async (reqQuery: any) => {
  const users = await UserModel.find(reqQuery).populate({
    path: 'userProfile',
    select:
      'userPhoneNumber userAlternateNumber userAddress userGovId createdAt',
  });

  return createResponse(users);
};

export const createUserProfileInDB = async (reqBody: IUserProfile) => {
  const newUserProfile = UserProfileModel.create(reqBody);
  return newUserProfile;
};

/**TODO: To be accessed only by admin */
export const createUserInDB = async (reqBody: IUser) => {
  const newUser = await UserModel.create(reqBody);

  return createResponse(newUser);
};

/**TODO: To be accessed only by admin */
export const updateUserPasswordInDB = async (userId: string, reqBody: any) => {
  await UserModel.findByIdAndUpdate(userId, {
    password: reqBody.password,
    newPassword: false,
  });

  return { sucess: true };
};

export const resetUserPasswordInDB = async (reqBody: {
  userEmail: FilterQuery<IUser>;
  currentPassword: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ userEmail: reqBody.userEmail }).select(
    'password'
  );
  const match = await matchPassword(user, reqBody.currentPassword);

  if (!user) {
    throw new ErrorResponse(UNAUTHORIZED, 401);
  }

  if (!match) {
    throw new ErrorResponse(UNAUTHORIZED, 400);
  }

  await UserModel.findByIdAndUpdate(user, {
    password: reqBody.password,
    newPassword: false,
  });

  return { sucess: true };
};

const getUserByEmailFromDB = async (email: string) => {
  const user = await UserModel.findOne({
    userEmail: email,
  }).select('userEmail password newPassword');
  return user;
};

/**Login user and send JWT token with cookies */
export const getUserLoginDataFromDB = async (reqBody: any) => {
  const user = await getUserByEmailFromDB(reqBody.userEmail);

  if (user?.newPassword)
    throw new ErrorResponse('User must reset password before first login', 400);

  if (!user) throw new ErrorResponse(UNAUTHORIZED, 401);

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
