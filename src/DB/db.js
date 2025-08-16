import mongoose from "mongoose";
import { db_Name } from "../const.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${db_Name}`);
    console.log(`DB connections succesfull`);
  } catch (error) {
    console.log("MongoDB Connections fails", error);
    process.exit(1);
  }
};

export default connectDB
