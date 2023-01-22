/* eslint-disable import/no-anonymous-default-export */

import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

// write a function that asks openai for a recipe
// it takes a prompt and returns the completion

export const getRecipeApi = async (prompt: string) => {
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci/completions",
    {
    //   model: "text-davinci-003",
      prompt: 'Recipe for apple fritters',
      max_tokens: 500,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    //   stop: ["\n"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text;
};

// write a handler that receives a request with a prompt
// and returns a response with the recipe

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {prompt} = req.body;

  const recipe = await getRecipeApi(prompt);

  res.status(200).json({recipe});
};
