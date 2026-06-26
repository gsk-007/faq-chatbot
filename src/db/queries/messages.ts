import { asc, desc, eq } from "drizzle-orm";

import { db } from "../index.js";
import { messages } from "../schema.js";

export function createMessage(
  conversationId: string,
  sender: "user" | "assistant",
  content: string
) {
  return db
    .insert(messages)
    .values({
      conversationId,
      sender,
      content,
    })
    .returning()
    .get();
}

export function getMessagesByConversationId(
  conversationId: string
) {
  return db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(asc(messages.createdAt))
    .all();
}

export function getRecentMessages(
  conversationId: string,
  limit: number
) {
  return db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(desc(messages.createdAt))
    .limit(limit)
    .all()
    .reverse();
}