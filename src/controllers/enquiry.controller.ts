import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { createEnquiryInDB } from '../services/enquiry.services';

export const createEnquiry = asyncHandler(
  async (req: Request, res: Response) => {
    //@ts-ignore
    const reqUser = req.userProfile;
    const data = await createEnquiryInDB(req.body, reqUser);
    res.status(201).json(data);
  }
);
