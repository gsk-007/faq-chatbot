import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { NotFoundError } from "../errors/NotFoundError.js";

export function notFound(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next(new NotFoundError("Route not found"));
}