import mongoose from 'mongoose';
import { IProjectDesignComponent } from '../types';

export class ProjectComponentType extends mongoose.SchemaType {
  key: string;
  options: object;

  constructor(key: string, options: object) {
    super(key, options);
    this.key = key;
    this.options = options;
  }

  // `cast()` takes a parameter that can be anything. You need to
  // validate the provided `val` and throw a `CastError`
  cast(val: any): IProjectDesignComponent {
    if (val.componentName && val.componentBaseCost && val.processes) {
      return {
        componentName: val.componentName,
        componentBaseCost: val.componentBaseCost,
        processes: val.processes,
      };
    } else {
      throw Error;
    }
  }
}

//@ts-ignore
mongoose.Schema.Types.ProjectComponentType = ProjectComponentType;
