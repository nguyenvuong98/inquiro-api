import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { AgentService } from './agent.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentGenerateAuthResDto, AgentGenerateResDto, ConversationsDto, SaveUrlDto, WorkspaceDto } from './agent.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Req } from '@nestjs/common';
import { USER_PAYLOAD_HEADER_NAME } from 'src/share/constants';
import { get } from 'http';

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
  generateResponse(@Body() input: AgentGenerateResDto): Promise<any> {
    return this.agentService.generateResponse(input);
  }

  @ApiOperation({
    operationId: 'Generate response',
    description: 'Generate response',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Finish think',
  })
  @Post('/auth/generate')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  generateAuth(@Body() input: AgentGenerateAuthResDto, @Req() request: Request): Promise<any> {
    return this.agentService.generateAuthResponse(input, request[USER_PAYLOAD_HEADER_NAME].id);
  }

  @ApiOperation({
    operationId: 'Create workspace',
    description: 'Create workspace',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create workspace successfully.',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/workspace')
  Logout(@Req() request: Request) {
    return this.agentService.createWorkSpace(request[USER_PAYLOAD_HEADER_NAME]);
  }

  @ApiOperation({
    operationId: 'Get list conversation by workspaceId',
    description: 'Get list conversation by workspaceId',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully.',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/coversation')
  conversationList(@Req() request: Request, @Query() input: ConversationsDto) {
    return this.agentService.getConversationList(input, request[USER_PAYLOAD_HEADER_NAME].id);
  }

  @ApiOperation({
    operationId: 'Get list workspace by user',
    description: 'Get list workspace by user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully.',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('/workspace')
  workspaceList(@Req() request: Request, @Query() input: WorkspaceDto) {
    return this.agentService.getWorkSpaceList(input, request[USER_PAYLOAD_HEADER_NAME].id);
  }
}
