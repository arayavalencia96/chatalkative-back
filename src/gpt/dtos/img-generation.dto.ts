import { IsOptional, IsString } from 'class-validator';

export class ImgGenerationDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  @IsOptional()
  readonly originalImg?: string;

  @IsString()
  @IsOptional()
  readonly maskImg?: string;
}
