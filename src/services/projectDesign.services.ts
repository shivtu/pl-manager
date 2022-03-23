import { ProjectDesignModel } from '../models/ProjectDesign.schema';
import { createResponse } from '../utils/createResponse';
import { IProjectDesign } from '../types/types';
import { getProjectsFromDB } from './project.services';
import { ErrorResponse } from '../utils/ErrorResponse';

export const getProjectDesignsFromDB = async (reqQuery: any) => {
  const projectDesigns = await ProjectDesignModel.find(reqQuery);

  return createResponse(projectDesigns);
};

export const createProjectDesignInDB = async (reqBody: IProjectDesign) => {
  const projectId = reqBody.parentProjectId;

  const parentProject = await getProjectsFromDB({ _id: projectId });

  /**Add the project requirements to design task */
  if (parentProject.result.length) {
    Object.assign(reqBody, {
      projectRequirements: parentProject.result[0].projectRequirements,
      parentProjectName: parentProject.result[0].projectName,
    });
  } else {
    throw new ErrorResponse('Cannot find parent project', 401);
  }

  const newProjectDesign = await ProjectDesignModel.create(reqBody);

  return createResponse(newProjectDesign);
};
