import mongoose, { Schema } from 'mongoose';

export class RoleAndAccessGroupsTypes extends mongoose.SchemaType {
  key: string;
  options: object;

  constructor(key: string, options: object) {
    super(key, options);
    this.key = key;
    this.options = options;
  }

  isAccessGroupStringArray = (accessGroupList: string[]) =>
    accessGroupList.every((group) => typeof group === 'string' && group);

  // `cast()` takes a parameter that can be anything. You need to
  // validate the provided `val` and throw a `CastError`
  cast(val: any) {
    if (
      val.role &&
      typeof val.role === 'string' &&
      val.accessGroups.length &&
      Array.isArray(val.accessGroups) &&
      this.isAccessGroupStringArray(val.accessGroups)
    ) {
      return {
        role: val.role,
        accessGroups: val.accessGroups,
      };
    } else {
      throw Error;
    }
  }
}

//@ts-ignore
mongoose.Schema.Types.RoleAndAccessGroupsTypes = RoleAndAccessGroupsTypes;
