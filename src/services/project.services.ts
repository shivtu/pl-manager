import { ProjectModel } from '../models/Project.schema';
import { createResponse } from '../utils/createResponse';
import { Request } from 'express';
import { IProject } from '../types/types';
import { PROJECT_TASK_MODELS } from '../constants';

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

export const getProjectTasksFromDB = async (id: string) => {
  const taskObject: { [key: string]: any } = {};

  const tasks = PROJECT_TASK_MODELS.map(async (task) => {
    const eachTask = await task.findOne({
      parentProjectId: id,
    });
    taskObject[task.modelName] = eachTask;
    return eachTask;
  });

  // Await all promises to resolve
  await Promise.all(tasks);

  return createResponse(taskObject);
};
