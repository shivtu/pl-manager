import { ProjectDesignTaskModel } from '../models/ProjectDesignTask.schema';
import { createResponse } from '../utils/createResponse';
import { IProjectDesignComponent, IProjectDesignTask } from '../types/types';
import { ErrorResponse } from '../utils/ErrorResponse';
import { ProjectModel } from '../models/Project.schema';

export const getProjectDesignTaskFromDB = async (reqQuery: any) => {
  const projectDesigns = await ProjectDesignTaskModel.find(reqQuery);

  return createResponse(projectDesigns);
};

export const createProjectDesignTaskInDB = async (
  reqBody: IProjectDesignTask
) => {
  const projectId = reqBody.parentProjectId;

  const projectDesign = await ProjectDesignTaskModel.findOne({
    parentProjectId: projectId,
  });

  // Only one design task per project allowed
  if (Boolean(projectDesign))
    throw new ErrorResponse('Design task already exists', 400);

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

  const newProjectDesign = await ProjectDesignTaskModel.create(reqBody);

  return createResponse(newProjectDesign);
};

export const updateProjectDesignTaskInDB = async (
  reqBody: IProjectDesignComponent[],
  designTaskId: string
) => {
  const updatedProjectDesign = await ProjectDesignTaskModel.findByIdAndUpdate(
    designTaskId,
    { $addToSet: { components: reqBody } },
    { new: true }
  );

  return createResponse(updatedProjectDesign);
};
