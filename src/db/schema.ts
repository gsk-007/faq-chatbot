import {
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { sql } from "drizzle-orm";


//
// Conversations
//

export const conversations = sqliteTable("conversations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  title: text("title")
    .default("New Conversation")
    .notNull(),

  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

//
// Messages
//
export const messages = sqliteTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  conversationId: text("conversation_id")
    .references(() => conversations.id, {
      onDelete: "cascade",
    })
    .notNull(),

  sender: text("sender", {
    enum: ["user", "assistant"],
  }).notNull(),

  content: text("content").notNull(),

  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});