import { Injectable } from '@nestjs/common';
import { AgentGenerateResDto } from './agent.dto';
import { sendTextPrompt } from 'src/share/axios';

@Injectable()
export class AgentService {
  constructor() {}

  async generateResponse(input: AgentGenerateResDto) {
    const { prompt, stream } = input;

    const response = await sendTextPrompt(prompt, stream);
    return { message: response };
  }
}
