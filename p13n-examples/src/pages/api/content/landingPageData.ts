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
    Given this JSON definition for text on a startup landing page:
    {
      "pageTitle": "Unify",
      "heroSubtitle": "Unleash the full potential of your startup with our universal platform. Unify brings together diverse solutions under one roof, tailored to your needs, irrespective of size or domain.",
      "featuresTitle": "Why Partner with Unify?",
      "featureOne": "Tailored Dashboards - Unify provides a customizable dashboard for real-time data tracking and metrics, aiding in effective decision-making.",
      "featureTwo": "Collaboration Suite - Our platform includes communication and project management tools to enhance team collaboration and project delivery.",
      "featureThree": "Integration Capability - Unify seamlessly integrates with your existing tech stack, reducing disruption and simplifying adoption.",
      "ctaText": "Ready to unify your startup's growth journey?",
      "ctaButtonText": "Schedule a Free Consultation"
    }

    And this JSON definition for a user profile: ${JSON.stringify(userProfile)}

    And this definition for the default color scheme: {
    primaryColor: '#1E90FF',
    descriptionColor: '#666',
    secondaryColor: '#FAFAFA',
    tertiaryColor: '#333',
    quaternaryColor: '#666',
    quinaryColor: '#eee',
    buttonColor: '#1E90FF',
    buttonTextColor: '#fff',
    pageContainerColor: '#FAFAFA'
  }

    Return an updated and heavily customised definition for the landing page, that is as personalized as possible based on the user’s profile, and matches the definition of the original landing page spec.
    
    When updating the description, ensure that it’s the same length / general number of tokens.
    
    Make sure to include details like location, company size, market, job title, or education, but only if they are appropriate, relevant and important.
            
    Return the colorSchema property based on the default schema passed in the product definition, but with the colors changed to match the user’s preferences. Do not return the default colors, come up with something new and unique, that is visually appealing. Do not return the default background and text colors.

    In the response object, add an additional property, image_prompt, and return a prompt that can be passed to Dalle that generate an image that matches the business needs of the viewer, and will act as the visual reference point on the start up landing page. 
    Make sure that the image prompt is as detailed and personalized as possible, based on the user preferences and business needs.
    Maintain the language of a high quality image prompt, because this will be consumed by an image generation AI and not read by a human.
    This isn't addressed to anyone, just a prompt for an AI model.

    Format the response in the following JSON object:
    {
      "pageText": {
        "pageTitle": string,
        "heroSubtitle": string,
        "featuresTitle": string,
        "featureOne": string,
        "featureTwo": string,
        "featureThree":string,
        "ctaText": string,
        "ctaButtonText": string,
      }
      "colorSchema": {
        primaryColor: string,
        descriptionColor: string,
        secondaryColor: string,
        tertiaryColor: string,
        quaternaryColor: string,
        quinaryColor: string,
        buttonColor: string,
        buttonTextColor: string,
        pageContainerColor: string
      },
      "image_prompt": string,
    }
    `

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const response = JSON.parse(completion.data.choices[0].message.content);
  res.status(200).json({ content: response })
}