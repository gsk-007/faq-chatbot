import { Router } from "express";

import {
  handlerMessageCreate,
  handlerMessageGetByConversationId,
} from "../controllers/message.controller.js";

import { asyncHandler } from "../errors/async-handler.js";

const router = Router({ mergeParams: true });

router.get(
  "/",
  asyncHandler(
    handlerMessageGetByConversationId
  )
);

router.post(
  "/",
  asyncHandler(handlerMessageCreate)
);

export default router;