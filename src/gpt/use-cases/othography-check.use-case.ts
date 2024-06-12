import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const othographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
    response_format: { type: 'json_object' },
  });

  const jsonRes = JSON.parse(completion.choices[0].message.content);
  return jsonRes;
};
