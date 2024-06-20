import { IsString } from 'class-validator';

export class ImgVariationDto {
  @IsString()
  readonly baseImg: string;
}
