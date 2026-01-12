import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { WorkSpaceRepository } from './work-space.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSpace, WorkSpaceSchema } from './work-space.schema';
import { Conversation, ConversationSchema } from './coversation.schema';
import { ConversationRepository } from './conversation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkSpace.name, schema: WorkSpaceSchema },
      { name: Conversation.name, schema: ConversationSchema }
    ]),
  ],
  controllers: [AgentController],
  providers: [AgentService, WorkSpaceRepository, ConversationRepository],
})
export class AgentModule {}
