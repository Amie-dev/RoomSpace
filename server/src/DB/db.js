import mongoose from "mongoose";
import { db_Name } from "../const.js";
import logger from "../utils/logger.js";

let dbConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${db_Name}`, {
      autoIndex: true,
    });
    dbConnected = true;
    logger.success(`[DB] Connection successful`);
  } catch (error) {
    dbConnected = false;
    logger.error(`[DB] Connection failed: ${error.message}`);
    // Don't exit, just log and keep running
  }
};

export { connectDB, dbConnected };
