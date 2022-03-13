import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/types';

const UserSchema = new Schema<IUser>({
  userEmail: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  userRole: {
    type: String,
    required: true,
  },
  newPassword: {
    type: Boolean,
    default: true,
    select: false,
  },
  userProfile: {
    type: Schema.Types.ObjectId,
    ref: 'userprofile',
    required: true,
    unique: true,
  },
});

UserSchema.pre('save', async function (this) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**findOneAndUpdate is used for findByIdAndUpdate */
UserSchema.pre('findOneAndUpdate', async function (this: any) {
  const salt = await bcrypt.genSalt(10);
  this._update.password = await bcrypt.hash(this._update.password, salt);
});

/**Sign JWT and return */
UserSchema.methods.getSignedJWTTokens = function (this) {
  const JWTOptions: jwt.SignOptions = {
    expiresIn: process.env.JWT_EXPIRE, // 1 day
  };

  return jwt.sign(
    {
      userEmail: this.userEmail,
      userRole: this.userRole,
      isActive: this.isActive,
      _id: this._id,
    },
    `${process.env.JWT_SECRET}`,
    JWTOptions
  );
};

/**Match user entered password to hashed password */
UserSchema.methods.matchPassword = async function (
  userEnteredPassword: string
) {
  return bcrypt.compare(userEnteredPassword, this.password);
};

export const UserModel = model('user', UserSchema);
