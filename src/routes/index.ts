import { Router } from "express";

import conversationRoutes from "./conversation.routes.js";
import messageRoutes from "./message.routes.js";

const router = Router();

router.use("/conversations", conversationRoutes);

router.use("/conversations/:id/messages", messageRoutes)

export default router;