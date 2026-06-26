import type { ResponseInputItem } from "openai/resources/responses/responses";

import { openai } from "../config/openai.js";
import { config } from "../config/config.js";
import { APP } from "../config/constants.js";
import {
  STORE_FAQ,
  SYSTEM_PROMPT,
} from "../config/prompt.js";

import { LLMError } from "../errors/LLMError.js";

type HistoryMessage = {
  sender: "user" | "assistant";
  content: string;
};

export async function generateReply(
  history: HistoryMessage[]
): Promise<string> {
  const input: ResponseInputItem[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "system",
      content: STORE_FAQ,
    },
    ...history.map((message) => ({
      role: message.sender,
      content: message.content,
    })),
  ];

  try {
    const response = await openai.responses.create(
      {
        model: config.openai.model,
        input,
        temperature: APP.TEMPERATURE,
        max_output_tokens: APP.MAX_OUTPUT_TOKENS,
      },
      {
        signal: AbortSignal.timeout(APP.LLM_TIMEOUT),
      }
    );

    return response.output_text;
  } catch {
    throw new LLMError();
  }
}