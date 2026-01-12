import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { AgentGenerateAuthResDto, AgentGenerateResDto, ConversationsDto, WorkspaceDto } from './agent.dto';
import { sendTextPrompt } from 'src/share/axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AI_URI_CACHE } from 'src/share/constants';
import { WorkSpaceRepository } from './work-space.repository';
import { ConversationRepository } from './conversation.repository';

@Injectable()
export class AgentService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly workSpaceRepository: WorkSpaceRepository,
    private readonly conversationRepository: ConversationRepository,) {}

  async saveAIUriCache(url: string) {
    await this.cacheManager.set(AI_URI_CACHE, url);
    global.cacheUrl = url;

    return true;
  }
  
  async generateResponse(input: AgentGenerateResDto) {
    const { prompt, stream } = input;

    const response = await sendTextPrompt(prompt, stream, global.cacheUrl);
    return { message: response };
  }

  async createWorkSpace(req: any) {
    const workSpace = await this.workSpaceRepository.create({userId: req.id});

    return workSpace;
  }

 

  async generateAuthResponse(input: AgentGenerateAuthResDto, userId: string) {
    const { prompt, stream, workspaceId } = input;

    const workspace = await this.workSpaceRepository.findOne({userId: userId, _id: workspaceId});

    if (!workspace) {
      throw new BadRequestException('Workspace not exists');
    }

    if (!workspace.title) {
      this.updateWorkspace(workspaceId, {title: prompt});
    }
    const response = await sendTextPrompt(prompt, stream, global.cacheUrl);

    //create conversation history
    const coversationBody = {
      workspaceId: workspaceId,
      userId,
      userMessage: prompt,
      botMessage: response,
    }
    this.conversationRepository.create(coversationBody)
    return { message: response };
  }

  private async updateWorkspace(workspaceId: string, body: any) {
    await this.workSpaceRepository.updateOne({_id: workspaceId}, body);
    return true;
  }

  async getConversationList(input: ConversationsDto, userId: string) {
    const { workspaceId, page, pageSize } = input;
    const response = await this.conversationRepository.findPanigation({workspaceId, userId}, page, pageSize);

    return response;
  }

  async getWorkSpaceList(input: WorkspaceDto, userId: string) {
    const { page, pageSize } = input;
    const workSpace = await this.workSpaceRepository.findPanigation({userId}, page, pageSize);

    return workSpace;
  }
}
