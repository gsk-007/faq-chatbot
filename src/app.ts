import express from "express";
import morgan from "morgan";

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

export default app;