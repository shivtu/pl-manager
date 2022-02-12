import { ProjectDesignModel } from '../models/ProjectDesign.schema';
import { createResponse } from '../utils/createResponse';
import { IProjectDesign } from '../types/types';

export const getProjectDesignsFromDB = async (reqQuery: any) => {
  const projectDesigns = await ProjectDesignModel.find(reqQuery);

  return createResponse(projectDesigns);
};

export const createProjectDesignInDB = async (reqBody: IProjectDesign) => {
  const newProjectDesign = await ProjectDesignModel.create(reqBody);

  return createResponse(newProjectDesign);
};
