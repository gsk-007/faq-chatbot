import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { logger } from "../config/logger.js";
import { AppError } from "../errors/AppError.js";
import { config } from "../config/config.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err.message);
  if (config.api.platform == "development") {
    logger.error(err.stack)
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    ...(config.api.platform == "development" && {
      details: err.message,
    }),
  });
}