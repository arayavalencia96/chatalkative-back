import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { othographyCheckUseCase } from './use-cases/othography-check.use-case';
import { OrthographyDto, ProsConsDiscusserDto, TraslateDto } from './dtos';

import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import {
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  traslateUseCase,
} from './use-cases';

@Injectable()
export class GptService {
  private openai: OpenAI;
  private readonly logger = new Logger(GptService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.error(
        'OPENAI_API_KEY is not defined. Please set the environment variable.',
      );
      throw new InternalServerErrorException(
        'OPENAI_API_KEY is not defined. Please set the environment variable.',
      );
    }
    this.openai = new OpenAI({ apiKey: apiKey });
  }

  async othographyCheck(orthographyDto: OrthographyDto) {
    return await othographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async traslate({ prompt, lang }: TraslateDto) {
    return await traslateUseCase(this.openai, { prompt, lang });
  }
}
