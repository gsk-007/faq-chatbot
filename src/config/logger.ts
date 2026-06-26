import pino from "pino";
import { config } from "./config.js";

const isDevelopment = config.api.platform === "development";

export const logger = isDevelopment
  ? pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          levelFirst: true,
        },
      },
    })
  : pino();