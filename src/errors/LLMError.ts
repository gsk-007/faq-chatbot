import { AppError } from "./AppError.js";

export class LLMError extends AppError {
  constructor(
    message = "I'm having trouble responding right now. Please try again."
  ) {
    super(503, message);
  }
}