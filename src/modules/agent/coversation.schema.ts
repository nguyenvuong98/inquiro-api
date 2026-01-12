import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { getNewTimeStamp } from '../../share/helper';
import { DbModel } from 'src/share/constants';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ collection: DbModel.CONVERSATION, timestamps: true })
export class Conversation {
  @Prop()
  userId: string;

  @Prop()
  userMessage: string;

  @Prop()
  botMessage: string;

  @Prop()
  workspaceId: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
