import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  content: string
}

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userProfile = req.body.userProfile;

  const prompt = `
    Given this JSON definition for a product:
    {
      title: "Stylish Swim Trunks",
      description: "These stylish swim trunks are perfect for your summer outings. Made with high quality material, they offer both comfort and durability. Available in different sizes and colors.",
      size: "small, medium, large",
      color: "blue, red, green",
      font: "inter, roboto, montserrat, open sans, oswald",
      colorSchema: {
        backgroundColor: '#eee',
        pageContainerColor: #FAFAFA,
        titleColor: '#333',
        descriptionColor: '#666',
        buttonColor: '#1E90FF',
        buttonHoverColor: '#2388D1',
        buttonTextColor: '#fff'
      }
    }

    And this JSON definition for a user profile: ${JSON.stringify(userProfile)}

    Return an updated and heavily customised product definition, that is as personalized as possible based on the user’s profile, and matches the definition of the original product spec.
    
    When updating the description, ensure that it’s the same length / general number of tokens.
    
    Make sure to include details like location, hobbies, and age, but only if they are relevant and important.
    
    In the description, don't talk to them in the third person, address them directly. Use the language and tone of a product description on an ecommerce page.
    
    Make sure to pick a size and color based on the profile preferences, and don’t just return the entire list.
    
    Return the colorSchema property based on the default schema passed in the product definition, but with the colors changed to match the user’s preferences. Do not return the default colors, come up with something new and unique, that is visually appealing. Do not return the default background and text colors.

    In the response object, add an additional property, image_prompt, and return a prompt that can be passed to Dalle that generate an image that matches the description, and will act as the visual reference point on the product page. Make sure that the image prompt is as detailed and personalized as possible, based on the selected user preferences. Maintain the language of a high quality image prompt, because this will be consumed by an image generation AI and not read by a human. This isn't addressed to anyone, just a prompt for an AI model. Don't talk about this in the description.

    Example of an image prompt based on user's preferences:
    "Imagine a clothing model doing ${userProfile.hobbies}, and wearing a pair of stylish swim trunks in ${userProfile.color} color and ${userProfile.size} size, that perfectly fits a ${userProfile.age}-year-old man from ${userProfile.location}. The material is high quality and offers both comfort and durability."

    Return a font based on the user's age and demographic. If the user is young, use a modern font like Inter or Roboto. If the user is older, use a more traditional font like Montserrat or Open Sans. If the user is older than 50, use a font like Oswald.

    Additionally, return a list of 3 recommended products, with a title and an extremely short description, that are based on the user's preferences.

    Format the response in the following JSON object:
    {
      title: string,
      description: string,
      size: "small", "medium", or "large",
      color: "blue", "red", or "green",
      image_prompt: string,
      font: string,
      colorSchema: {
        backgroundColor: string,
        pageContainerColor: string,
        titleColor: string,
        descriptionColor: string,
        buttonColor: string,
        buttonHoverColor: string,
        buttonTextColor: string
      }
      recommendedProducts: [
        {
          title: string,
          description: string,
        },
        {
          title: string,
          description: string,
        },
        {
          title: string,
          description: string,
        }
      ]
    }
    `

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const response = JSON.parse(completion.data.choices[0].message.content);
  res.status(200).json({ content: response })
}