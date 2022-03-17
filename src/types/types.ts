import { ProjectComponentType } from './custom-mongoose-schema-types/ProjectComponentType';
import { RoleAndAccessGroupsTypes } from './custom-mongoose-schema-types/RoleAndAccessGroupsTypes';
import { GOV_DOC, PROJECT_STAGE, PROJECT_STATUS, PROJECT_TYPE } from './enums';

export interface ICurrentOwner {
  userId: string;
  name: string;
  email: string;
  phoneNumber: number;
}

export interface IProject {
  projectName: string;
  summary: string;
  description?: string;
  projectType: PROJECT_TYPE;
  createdAt: Date;
  completedAt: Date;
  currentOwner: ICurrentOwner;
  status: PROJECT_STATUS;
  stage: PROJECT_STAGE;
  projectRequirements: string[];
}

export interface IProjectComponent {
  componentName: string;
  componentBaseCost: number;
  processes: string[];
}

export interface IProjectDesign {
  projectId: IProject;
  components: ProjectComponentType[];
  projectRequirements: string[];
  status: PROJECT_STATUS;
  createdAt: Date;
  completedAt: Date;
  currentOwner: ICurrentOwner;
}

export interface IProjectNetCost {
  projectId: IProject;
  componentName: string;
  componentBaseCost: number;
  componentMargin: number;
  componentOverHead: number;
  componentNetCost: number;
  currentOwner: ICurrentOwner;
  status: PROJECT_STATUS;
  createdAt: Date;
  completedAt: Date;
}

export interface IProjectPurchase {
  componentName: string;
  purchaseOrder: string;
  purchaseStatus: boolean;
  purchaseOrderCreatedAt: Date;
  puchaseOrderCompletedAt: Date;
}

export interface IProjectPurchaseList {
  projectId: IProject;
  projectPurchaseList: [IProjectPurchase];
  createdAt: Date;
  completedAt: Date;
  status: PROJECT_STATUS;
  currentOwner: ICurrentOwner;
}

export interface IProjectProductionTask {
  projectId: IProject;
  productionTask: string;
}

export interface IUserGovId {
  docType: GOV_DOC;
  docId: string;
}

export interface IUserProfile {
  userName: string;
  userEmail: string;
  userPhoneNumber: number;
  userAlternateNumber?: number;
  userAddress: string;
  userGovId?: IUserGovId;
  createdAt: Date;
}

export interface IUserRolesAndAccessGroups {
  rolesAndAccess: RoleAndAccessGroupsTypes[];
}

export type UserRoleTypes =
  | 'admin'
  | 'designer'
  | 'production'
  | 'assembly'
  | 'purchases';

export interface IUser {
  userName: string;
  userEmail: string;
  password: string;
  isActive: boolean;
  userRole: UserRoleTypes;
  newPassword: boolean;
  userProfile: String;
}

export interface IUserAccess {
  admin: string[];
  designer: string[];
  production: string[];
  assembly: string[];
  purchases: string[];
}

export interface IServerResponse {
  success: boolean;
  count?: number;
  result: any;
}

export interface IReqUser {
  userRole: UserRoleTypes;
  _id: string;
  userEmail: string;
  isActive: boolean;
}
