import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { createEnquiryInDB } from '../services/enquiry.services';

export const createEnquiry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await createEnquiryInDB(req.body);
  }
);
