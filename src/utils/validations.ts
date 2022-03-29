import { ProjectModel } from '../models/Project.schema';
import { UserProfileModel } from '../models/UserProfile.schema';
import { ICurrentOwner, IProject } from '../types/types';

export const validateCurrentOwner = async (currentOwner: ICurrentOwner) => {
  const owner = await UserProfileModel.findById(currentOwner.userId);
  return (
    owner?._id.toString() === currentOwner.userId &&
    owner.userName === currentOwner.userName &&
    owner.userEmail === currentOwner.userEmail &&
    owner.userPhoneNumber === currentOwner.userPhoneNumber
  );
};

export const isValidProjectId = async (projectId: IProject) => {
  try {
    const project = await ProjectModel.findById(projectId);
    return Boolean(project);
  } catch (error) {
    return false;
  }
};
