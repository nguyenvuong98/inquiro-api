import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AgentService } from './agent.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentGenerateResDto, SaveUrlDto } from './agent.dto';

@Controller('agent')
@ApiTags('Agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @ApiOperation({
    operationId: 'Set AI URL',
    description: 'Set AI URL',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Set AI URL finish',
  })
  @Post('/set-ai-url')
  setAIURl(@Body() input: SaveUrlDto): Promise<any> {
    return this.agentService.saveAIUriCache(input.url);
  }

  @ApiOperation({
    operationId: 'Generate response',
    description: 'Generate response',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Finish think',
  })
  @Post('/generate')
  generateResponse(@Body() userRegister: AgentGenerateResDto): Promise<any> {
    return this.agentService.generateResponse(userRegister);
  }
}
