import { ProjectModel } from '../models/Project.schema';
import { createResponse } from '../utils/createResponse';
import { Request } from 'express';
import { IProject } from '../types/types';

// for .body
type RequestBody<T> = Request<{}, {}, T>;
// for .params
type RequestParams<T> = Request<T>;
// for .query
type RequestQuery<T> = Request<{}, {}, {}, T>;

export const getProjectsFromDB = async (reqQuery: any) => {
  const projects = await ProjectModel.find(reqQuery);

  return createResponse(projects);
};

export const createProjectInDB = async (requestBody: IProject) => {
  const newProject = await ProjectModel.create(requestBody);

  return createResponse(newProject);
};
