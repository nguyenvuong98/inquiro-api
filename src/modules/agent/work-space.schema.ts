import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { DbModel } from 'src/share/constants';

export type WorkSpaceDocument = HydratedDocument<WorkSpace>;

@Schema({ collection: DbModel.WORK_SPACE, timestamps: true })
export class WorkSpace {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop({ type: Object })
  workSpaceObj: Record<string, any>;;
}

export const WorkSpaceSchema = SchemaFactory.createForClass(WorkSpace);
