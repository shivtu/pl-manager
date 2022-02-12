import { IServerResponse } from '../types/types';

export const createResponse = (res: unknown): IServerResponse => {
  let count: number;
  let response: IServerResponse;
  if (Array.isArray(res)) {
    count = res.length;
    response = {
      success: true,
      count,
      data: res,
    };
  } else {
    response = {
      success: true,
      data: res,
    };
  }

  return response;
};
