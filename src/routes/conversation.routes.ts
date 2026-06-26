import { Router } from "express";

import {handlerConversationCreate, handlerConversationGetById, handlerConversationUpdate, handlerConversationRemove} from "../controllers/conversation.controller.js";

import { asyncHandler } from "../errors/async-handler.js";

const router = Router();

router.post(
  "/",
  asyncHandler(handlerConversationCreate)
);

router.get(
  "/:id",
  asyncHandler(handlerConversationGetById)
);

router.patch(
  "/:id",
  asyncHandler(handlerConversationUpdate)
);

router.delete(
  "/:id",
  asyncHandler(handlerConversationRemove)
);

export default router;