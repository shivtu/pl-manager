import { createResponse } from '../utils/createResponse';
import { UserProfileModel } from '../models/UserProfile.schema';
import { IUserProfile } from '../types/types';

export const getuserProfilesFromDB = async (reqQuery: any) => {
  const userProfiles = await UserProfileModel.find(reqQuery);

  return createResponse(userProfiles);
};

export const createUserProfileInDB = async (reqBody: IUserProfile) => {
  const newUserProfile = await UserProfileModel.create(reqBody);

  return createResponse(newUserProfile);
};
