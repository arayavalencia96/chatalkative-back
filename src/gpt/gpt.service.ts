import * as fs from 'fs';
import * as path from 'path';

import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import OpenAI from 'openai';

import {
  AudioToTextDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TraslateDto,
} from './dtos';
import { othographyCheckUseCase } from './use-cases/othography-check.use-case';
import {
  audioToTextUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioUseCase,
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

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async getAudio(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/voices',
      `${fileId}.mp3`,
    );
    const exists = fs.existsSync(filePath);
    if (!exists) throw new NotFoundException('File not found');
    return filePath;
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto?: AudioToTextDto,
  ) {
    const { prompt } = audioToTextDto;
    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }
}
