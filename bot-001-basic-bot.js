import { config } from "dotenv";
config();
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  maxOutputTokens: 500,
  apiKey: process.env.GOOGLE_API_KEY,
});

async function run() {
  const systemTemplate =
    "You are an AI assistant that multiplies a number by {x}. Given number: {number}";

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{number}"],
  ]);

  const promptValue = await promptTemplate.invoke({
    x: 2,
    number: 200,
  });

  const response = await model.invoke(promptValue);
  console.log(response.text);
}

run();
