import { Schema, model } from 'mongoose';
import { GOV_DOC } from '../types/enums';
import { IUserGovId, IUserProfile } from '../types/types';

const validateUsersGovDocType = (doc: IUserGovId) => {
  try {
    const keys = Object.keys(doc);
    const govDocValues = Object.values(GOV_DOC);
    const isDocTypeFromEnum = govDocValues.includes(doc.docType);
    if (
      keys.length === 2 &&
      doc.docId &&
      typeof doc.docId === 'string' &&
      isDocTypeFromEnum
    ) {
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const UserProfileSchema = new Schema<IUserProfile>({
  userName: {
    type: String,
    required: [true, 'User name is required'],
    maxlength: [50, 'User name cannot exceed 50 charachters'],
    minlength: [3, 'User name cannot be less than 3 charachters'],
    lowercase: true,
  },
  userEmail: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email address',
    ],
  },
  userPhoneNumber: {
    type: Number,
    required: [true, 'User phone number is required'],
    unique: true,
  },
  userAlternateNumber: {
    type: Number,
  },
  userAddress: {
    type: String,
    required: [true, 'User address is required'],
  },
  userGovId: {
    type: Object,
    validate: validateUsersGovDocType,
    unique: [true, 'Goverment ID proofs must be unique'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserProfileModel = model<IUserProfile>(
  'userprofile',
  UserProfileSchema
);
