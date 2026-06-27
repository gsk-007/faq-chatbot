import { APP } from "../config/constants.js";
import { BadRequestError } from "../errors/BadRequestError.js";

export function sanitizeMessage(content: unknown): string {
  if (typeof content !== "string") {
    throw new BadRequestError("Message content is required.");
  }

  const sanitized = content
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, APP.MAX_MESSAGE_LENGTH);

  if (sanitized.length === 0) {
    throw new BadRequestError("Message cannot be empty.");
  }

  return sanitized;
}


export async function randomDelay(
  minMs = 0,
  maxMs = 5_000
): Promise<void> {
  const delay =
    Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}