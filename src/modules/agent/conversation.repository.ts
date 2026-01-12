import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/share/base.repository';
import { Conversation } from './coversation.schema';

@Injectable()
export class ConversationRepository extends BaseRepository {
  constructor(@InjectModel(Conversation.name) model: Model<Conversation>) {
    super(model);
  }
  
}
