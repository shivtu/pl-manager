import { Schema, model } from 'mongoose';
import { RoleAndAccessGroupsTypes } from '../types/custom-mongoose-schema-types/RoleAndAccessGroupsTypes';
import { IUserRolesAndAccessGroups } from '../types/types';

const UserRolesAndAccessGroupsSchema = new Schema<IUserRolesAndAccessGroups>({
  rolesAndAccess: {
    type: [RoleAndAccessGroupsTypes],
    required: true,
  },
});

export const UserRolesAndAccessGroupsModel = model<IUserRolesAndAccessGroups>(
  'userrolesandaccessgroups',
  UserRolesAndAccessGroupsSchema
);
