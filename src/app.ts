import express from "express";
import morgan from "morgan";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


app.get("/health", (_, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    message: "Server is healthy 🚀",
  });
});

// 404
app.use(notFound)

// global error handler
app.use(errorHandler)

export default app;