import {
  createMessage,
  getRecentMessages,
} from "../db/queries/messages.js";

import { APP } from "../config/constants.js";

export function chat(
  conversationId: string,
  content: string
): string {
  createMessage(
    conversationId,
    "user",
    content
  );

  // Placeholder
  const reply =
    "This is a placeholder AI response.";

  createMessage(
    conversationId,
    "assistant",
    reply
  );

  return reply;
}