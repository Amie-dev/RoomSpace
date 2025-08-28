import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roomRouter from "./router/room.router.js";
import dataRouter from "./router/data.router.js";
import { dbConnected } from "./DB/db.js";
import logger from "./utils/logger.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGINE,
    credentials: true,
  }),
);

app.use("/api/v1/room", roomRouter);
app.use("/api/v1/data", dataRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  logger.info(`[Health] Health check requested. DB connected: ${dbConnected}`);
  res.json({ dbConnected });
});

export default app;
