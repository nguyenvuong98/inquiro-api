import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AgentService } from './agent.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentGenerateResDto } from './agent.dto';

@Controller('agent')
@ApiTags('Agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @ApiOperation({
    operationId: 'Generate response',
    description: 'Generate response',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Finish think',
  })
  @Post('/generate')
  registerUser(@Body() userRegister: AgentGenerateResDto): Promise<any> {
    return this.agentService.generateResponse(userRegister);
  }
}
