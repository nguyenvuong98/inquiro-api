import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class AgentGenerateResDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'message from user',
  })
  prompt: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'receive response as stream',
  })
  stream: boolean;
}

export class AgentGenerateAuthResDto extends AgentGenerateResDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'workspaceId',
  })
  workspaceId: string;
}

export class SaveUrlDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'new AI url',
  })
  url: string;
}

export class ConversationsDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'workspaceId',
  })
  workspaceId: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'page',
    default: 0
  })
  page: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'pageSize',
    default: 20,
  })
  pageSize: number;
}