import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [GptModule, ConfigModule.forRoot()],
  controllers: [],
})
export class AppModule {}
