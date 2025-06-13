import { config } from "dotenv";
config();
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
  ChatMessagePromptTemplate,
} from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  maxOutputTokens: 500,
});

async function run() {
  try {
    console.log("Started");

    // const prompt = "hi";
    // const messages = [
    //   {
    //     role: "system",
    //     content:
    //       "you translate a word to french. Only return the exact translation and nothing else",
    //   },
    //   { role: "user", content: "translate: cat" },
    // ];

    // const systemMessage = new SystemMessage(
    //   "You are an AI assistant that multiplies a given number by 2"
    // );

    // const humanMessage2 = new HumanMessage("10");
    // const aiMessage2 = new AIMessage("20");

    // const humanMessage3 = new HumanMessage("1");
    // const aiMessage3 = new AIMessage("2");

    // const humanMessage4 = new HumanMessage("5");
    // const aiMessage4 = new AIMessage("10");

    // const humanMessage5 = new HumanMessage("6");
    // const aiMessage5 = new AIMessage("12");

    // const humanMessage6 = new HumanMessage("1000");
    // const aiMessage6 = new AIMessage("2000");

    // const humanMessage7 = new HumanMessage("250");

    // const allMessages = [
    //   systemMessage,
    //   humanMessage2,
    //   aiMessage2,
    //   humanMessage3,
    //   aiMessage3,
    //   humanMessage4,
    //   aiMessage4,
    //   humanMessage5,
    //   aiMessage5,
    //   humanMessage6,
    //   aiMessage6,
    //   humanMessage7,
    // ];

    /** Prompt Templates */

    /** 001: ChatPromptTemplate  */
    const systemTemplate =
      "You are an AI that multiplies a number given to you by {multiplier}";

    const userTemplate = "number:{number}";

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", userTemplate],
    ]);

    const promptValue = await promptTemplate.invoke({
      multiplier: "5",
      number: 5,
    });

    /** 002: SystemMessagePrompt Template & UserMessagePromptTemplate */
    const systemChatMessagePromptTemplate =
      SystemMessagePromptTemplate.fromTemplate(systemTemplate);
    const userChatMessagePromptTemplate =
      HumanMessagePromptTemplate.fromTemplate(userTemplate);

    const activeSystemMessage = await systemChatMessagePromptTemplate.format({
      multiplier: 5,
    });
    const activeUserMessage = await userChatMessagePromptTemplate.format({
      number: 4,
    });

    /**3: ChatMessagePromptTemplate */

    const sysMessageTemplate = ChatMessagePromptTemplate.fromTemplate(
      systemTemplate,
      "system"
    );
    const huMessageTemplate = ChatMessagePromptTemplate.fromTemplate(
      userTemplate,
      "human"
    );

    const sysPrompt = await sysMessageTemplate.format({ multiplier: 5 });
    const huPrompt = await huMessageTemplate.format({ number: 0 });

    const { text } = await model.invoke([sysPrompt, huPrompt]);

    console.log(`GenAI result: ${text}`);
    console.log("Ended");
  } catch (e) {
    console.log("GenAI Error");
    console.error(e);
  }
}

run();
