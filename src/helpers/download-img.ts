import { InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

export const downloadImg = async (url: string, fullPath: boolean = false) => {
  const res = await fetch(url);
  if (!res.ok)
    throw new InternalServerErrorException('Downloading image failed');
  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });
  const imageName = `${new Date().getTime()}.png`;
  const buffer = Buffer.from(await res.arrayBuffer());
  const completePath = path.join(folderPath, imageName);
  await sharp(buffer).png().ensureAlpha().toFile(completePath);
  return fullPath ? completePath : imageName;
};

export const downloadBase64ImageAsPng = async (
  base64Image: string,
  fullPath: boolean = false,
) => {
  base64Image = base64Image.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageName = `${new Date().getTime()}-64.png`;
  const completePath = path.join(folderPath, imageName);

  await sharp(imageBuffer).png().ensureAlpha().toFile(completePath);

  return fullPath ? completePath : imageName;
};
