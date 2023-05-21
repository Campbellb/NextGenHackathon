import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  image: any
}

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  const { prompt } = body;
  console.log('prompt', prompt)
  const response = await openai.createImage({
    prompt: `
    Based on the following prompt: "${prompt}", generate a beautiful, colorful, engaging photorealistic product image, like would be found in a catalog. Ensure to fulfill the prompt as accurately as possible. Do not include any text or designs.
    `,
    n: 2,
    size: "1024x1024",
  });

  res.status(200).json({ image: response.data.data })
}