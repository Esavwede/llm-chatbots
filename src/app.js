import { config } from "dotenv";
config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

async function generateContent() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "model",
          parts: [
            {
              text: "You are a sentiment analysis system that analyzes the sentiment of a given text as either => Positive | Negative | Neutral",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "today was a great day" }],
        },
        {
          role: "assistant",
          parts: [{ text: "Positive" }],
        },
        {
          role: "user",
          parts: [{ text: "I would likely revisit the store again" }],
        },
      ],
    });

    console.log("Response");
    console.log(response.text);

    console.log("Prompt Execution Metadata");
    console.dir(response.usageMetadata);
  } catch (e) {
    console.log("GEN_AI_ERROR: Error occured while generating content");
    console.error(e);
  }
}

generateContent();
