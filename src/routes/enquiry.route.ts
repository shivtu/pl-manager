import { Router } from 'express';
import { createEnquiry } from '../controllers/enquiry.controller';
import { protect } from '../middleware/auth';

export const enquiryRouter = Router();

enquiryRouter.route('/enquiry/create').post(protect, createEnquiry);
