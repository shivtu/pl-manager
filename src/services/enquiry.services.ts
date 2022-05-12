import { Types } from 'mongoose';
import { CustomersModel } from '../models/Customers.schema';
import { EnquiryModel } from '../models/Enquiry.schema';
import { UserModel } from '../models/User.schema';
import { ICurrentOwner, IEnquiry, IUserProfile } from '../types/types';
import { createResponse } from '../utils/createResponse';
import { ErrorResponse } from '../utils/ErrorResponse';

export const createEnquiryInDB = async (
  requestBody: IEnquiry,
  reqUser: IUserProfile & {
    _id: Types.ObjectId;
  }
) => {
  // const newEnquiry = await EnquiryModel.create(requestBody);
  // return createResponse(newEnquiry);
  if (!requestBody.customerId) {
    throw new ErrorResponse(
      'A customer ID is required to create new enquiry',
      400
    );
  }
  const customer = await CustomersModel.findById(requestBody.customerId);
  if (!customer) {
    throw new ErrorResponse('Customer not found', 400);
  }

  const createdBy: ICurrentOwner = {
    userId: reqUser._id.toString(),
    userName: reqUser.userName,
    userEmail: reqUser.userEmail,
    userPhoneNumber: reqUser.userPhoneNumber,
  };
  // add the customer details from customer table
  requestBody.customerName = customer.customerName;
  requestBody.customerAddress = customer.customerAddress;
  requestBody.customerPhone = customer.customerPhone;
  requestBody.customerEmail = customer.customerEmail;
  requestBody.createdBy = createdBy;

  const newEnquiry = await EnquiryModel.create(requestBody);

  return createResponse(newEnquiry);
};
