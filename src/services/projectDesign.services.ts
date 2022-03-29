import { ProjectDesignModel } from '../models/ProjectDesign.schema';
import { createResponse } from '../utils/createResponse';
import { IProjectDesign } from '../types/types';
import { ErrorResponse } from '../utils/ErrorResponse';
import { ProjectModel } from '../models/Project.schema';

export const getProjectDesignsFromDB = async (reqQuery: any) => {
  const projectDesigns = await ProjectDesignModel.find(reqQuery);

  return createResponse(projectDesigns);
};

export const createProjectDesignInDB = async (reqBody: IProjectDesign) => {
  const projectId = reqBody.parentProjectId;

  const parentProject = await ProjectModel.findById(projectId);

  /**Add the project requirements to design task */
  if (parentProject) {
    Object.assign(reqBody, {
      projectRequirements: parentProject.projectRequirements,
      parentProjectName: parentProject.projectName,
    });
  } else {
    throw new ErrorResponse('Cannot find parent project', 400);
  }

  const newProjectDesign = await ProjectDesignModel.create(reqBody);

  return createResponse(newProjectDesign);
};
