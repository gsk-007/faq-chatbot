import express from "express";
import path from "node:path"
import morgan from "morgan";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

import routes from "./routes/index.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

app.use(morgan('dev'))


app.get("/health", (_, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    message: "Server is healthy 🚀",
  });
});

app.use("/api", routes);

// 404
app.use(notFound)

// global error handler
app.use(errorHandler)

export default app;