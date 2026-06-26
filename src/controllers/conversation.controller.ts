import type { Request, Response } from "express";

import {
  createConversation,
  deleteConversation,
  getConversationById,
  updateConversationTitle,
} from "../db/queries/conversations.js";

import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export function handlerConversationCreate(
  _req: Request,
  res: Response
): void {
  const conversation = createConversation();

  res.status(201).json(conversation);
}

export function handlerConversationGetById(
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

  res.json(conversation);
}

export function handlerConversationUpdate(
  req: Request,
  res: Response
): void {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError("Invalid conversation id.");
  }

  const { title } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    throw new BadRequestError("Conversation title is required.");
  }

  const conversation = updateConversationTitle(
    id,
    title.trim()
  );

  if (!conversation) {
    throw new NotFoundError("Conversation not found.");
  }

  res.json(conversation);
}

export function handlerConversationRemove(
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

  deleteConversation(id);

  res.sendStatus(204);
}