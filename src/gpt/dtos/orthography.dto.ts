import { IsInt, IsOptional, IsString } from 'class-validator';

export class OrthographyDto {
  @IsString()
  readonly propmt: string;

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number;
}
