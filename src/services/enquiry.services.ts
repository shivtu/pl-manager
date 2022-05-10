import { EnquiryModel } from '../models/Enquiry.schema';
import { IEnquiry } from '../types/types';
import { createResponse } from '../utils/createResponse';

export const createEnquiryInDB = async (requestBody: IEnquiry) => {
  // const newEnquiry = await EnquiryModel.create(requestBody);
  // return createResponse(newEnquiry);
};
