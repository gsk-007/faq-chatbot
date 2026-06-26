import { Router } from "express";

import conversationRoutes from "./conversation.routes.js";

const router = Router();

router.use("/conversations", conversationRoutes);

export default router;