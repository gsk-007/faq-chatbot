import type { Request, Response } from "express";

import { getConversationById } from "../db/queries/conversations.js";
import { getMessagesByConversationId } from "../db/queries/messages.js";

import { chat } from "../services/chat.service.js";

import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { sanitizeMessage } from "../utils/message.js";

export function handlerMessageGetByConversationId(
  req: Request,
  res: Response
): void {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError("Invalid conversation id.");
  }

  const conversation =
    getConversationById(id);

  if (!conversation) {
    throw new NotFoundError(
      "Conversation not found."
    );
  }

  res.json(
    getMessagesByConversationId(id)
  );
}

export function handlerMessageCreate(
  req: Request,
  res: Response
): void {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError("Invalid conversation id.");
  }

  const conversation = getConversationById(id);

  if (!conversation) {
    throw new NotFoundError("Conversation not found.");
  }

  const content = sanitizeMessage(req.body.content);

  const reply = chat(
    id,
    content.trim()
  );

  res.status(201).json({
    reply,
  });
}