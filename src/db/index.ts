import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { config } from "../config/config.js";

const sqlite = new Database(config.db.url);

export const db = drizzle(sqlite);

export default db;