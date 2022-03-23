import { UserProfileModel } from '../models/UserProfile.schema';
import { ICurrentOwner } from '../types/types';

export const validateCurrentOwner = async (currentOwner: ICurrentOwner) => {
  const owner = await UserProfileModel.findById(currentOwner.userId);
  return (
    owner?._id.toString() === currentOwner.userId &&
    owner.userName === currentOwner.userName &&
    owner.userEmail === currentOwner.userEmail &&
    owner.userPhoneNumber === currentOwner.userPhoneNumber
  );
};
