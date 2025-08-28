import express from "express";
import dotenv from "dotenv";
import { connectDB, dbConnected } from "./DB/db.js";
import app from "./app.js";
import Newroom from "./model/roomAndData.model.js";
import logger from "./utils/logger.js";

dotenv.config();

const port = process.env.PORT || 4000;

connectDB()
  .then(async () => {
    await Newroom.syncIndexes();
    logger.success("[DB] Indexes synced for Newroom collection");
    app.listen(port, () => {
      logger.success(`[Server] Started at port ${port}`);
    });
  })
  .catch((e) => {
    logger.error(`[Startup] ${e.message || e}`);
  });

// Middleware to block requests if DB is not connected
app.use((req, res, next) => {
  if (!dbConnected) {
    return res.status(503).json({
      success: false,
      message: "Service unavailable: Database not connected.",
    });
  }
  next();
});
