import { IsString } from 'class-validator';

export class TraslateDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  readonly lang: string;
}
