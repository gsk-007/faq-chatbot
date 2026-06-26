import { eq } from "drizzle-orm";

import { db } from "../index.js";
import { conversations } from "../schema.js";

export function createConversation() {
  return db
    .insert(conversations)
    .values({})
    .returning()
    .get();
}

export function getConversationById(id: string) {
  return db
    .select()
    .from(conversations)
    .where(eq(conversations.id, id))
    .get();
}

export function updateConversationTitle(
  id: string,
  title: string
) {
  return db
    .update(conversations)
    .set({
      title,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(conversations.id, id))
    .returning()
    .get();
}

export function deleteConversation(id: string) {
  return db
    .delete(conversations)
    .where(eq(conversations.id, id))
    .run();
}