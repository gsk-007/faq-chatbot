import {
  createMessage,
  getRecentMessages,
} from "../db/queries/messages.js";

import { APP } from "../config/constants.js";
import { generateReply } from "./llm.service.js";

export async function chat(
  conversationId: string,
  content: string
): Promise<string> {
  createMessage(
    conversationId,
    "user",
    content
  );

  const history = getRecentMessages(
    conversationId,
    APP.MAX_CONTEXT_MESSAGES
  );

  const reply = await generateReply(history);

  createMessage(
    conversationId,
    "assistant",
    reply
  );

  return reply;
}