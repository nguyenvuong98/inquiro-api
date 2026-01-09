import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

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

export class SaveUrlDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'new AI url',
  })
  url: string;
}
