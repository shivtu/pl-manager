import { Types, Document } from 'mongoose';
import { IUser } from '../types/types';

export const matchPassword = async (
  user:
    | (Document<unknown, any, IUser> &
        IUser & {
          _id: Types.ObjectId;
        })
    | null,
  password: string
) => {
  /**We can ts-ingnore the below line since matchPassword is assigned to UserSchema
   *in User.schema.ts file */
  //@ts-ignore
  const matched = user.matchPassword(password);

  return matched;
};
