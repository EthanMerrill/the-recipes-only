/* eslint-disable import/no-anonymous-default-export */

import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

// write a function that asks openai for a recipe
// it takes a prompt and returns the completion

export const getRecipeApi = async (promptText: string) => {
  console.log(`Making a query to the API with the prompt: ${promptText}`)
  const client = axios.create({headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  }})

  const params = {
    'model': 'text-davinci-003',
    'prompt': promptText,
    'max_tokens': 500,
    'temperature': 0.5,
    'top_p': 1,
    'frequency_penalty': 0,
    'presence_penalty': 0,
  }

  const response = await client.post(
    "https://api.openai.com/v1/completions", 
    params
  );

  return response.data.choices[0].text;
};

// write a handler that receives a request with a prompt
// and returns a response with the recipe

export default async (req: NextApiRequest, res: NextApiResponse) => {
   
  const {prompt} = req.body;
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci/completions",
    {
    //   model: "text-davinci-003",
      prompt: prompt,
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

  res.status(200).json({response});
};
