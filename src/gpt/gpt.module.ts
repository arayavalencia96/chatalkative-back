import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [GptController],
  providers: [GptService, ConfigService],
})
export class GptModule {}
