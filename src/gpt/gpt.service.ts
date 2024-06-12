import { Injectable } from '@nestjs/common';
import { othographyCheckUseCase } from './use-cases/othography-check.use-case';
import { OrthographyDto } from './dtos';

import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
  async othographyCheck(orthographyDto: OrthographyDto) {
    return await othographyCheckUseCase(this.openai, {
      prompt: orthographyDto.propmt,
    });
  }
}
