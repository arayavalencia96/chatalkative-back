import * as fs from 'fs';
import OpenAI from 'openai';
import { downloadBase64ImageAsPng, downloadImg } from 'src/helpers';

interface Options {
  prompt: string;
  originalImg?: string;
  maskImg?: string;
}

export const imgGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, maskImg, originalImg } = options;

  if (!maskImg || !originalImg) {
    const response = await openai.images.generate({
      prompt,
      model: 'dall-e-2',
      n: 1,
      size: '1024x1024',
      response_format: 'url',
      quality: 'standard',
    });
    const fileName = await downloadImg(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/img-generated/${fileName}`;
    return {
      url: url,
      openaiURL: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  const imgPath = await downloadImg(originalImg, true);
  const maskPath = await downloadBase64ImageAsPng(maskImg, true);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt,
    image: fs.createReadStream(imgPath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImg(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/img-generation/${fileName}`;
  return {
    url: url,
    openaiURL: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
