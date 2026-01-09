import { Injectable, Inject } from '@nestjs/common';
import { AgentGenerateResDto } from './agent.dto';
import { sendTextPrompt } from 'src/share/axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AI_URI_CACHE } from 'src/share/constants';

@Injectable()
export class AgentService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

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
}
