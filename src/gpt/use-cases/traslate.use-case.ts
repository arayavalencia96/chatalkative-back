import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const traslateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 200,
  });
};
