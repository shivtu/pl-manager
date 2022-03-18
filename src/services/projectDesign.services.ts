import { ProjectDesignModel } from '../models/ProjectDesign.schema';
import { createResponse } from '../utils/createResponse';
import { IProjectDesign } from '../types/types';
import { getProjectsFromDB } from './project.services';

export const getProjectDesignsFromDB = async (reqQuery: any) => {
  const projectDesigns = await ProjectDesignModel.find(reqQuery);

  return createResponse(projectDesigns);
};

export const createProjectDesignInDB = async (reqBody: IProjectDesign) => {
  const projectId = reqBody.parentProjectId;

  const designForProject = await getProjectsFromDB({ _id: projectId });

  /**Add the project requirements to design task */
  if (designForProject.success) {
    Object.assign(reqBody, {
      projectRequirements: designForProject.result[0].projectRequirements,
      parentProjectName: designForProject.result[0].projectName,
    });
  }

  const newProjectDesign = await ProjectDesignModel.create(reqBody);

  return createResponse(newProjectDesign);
};
