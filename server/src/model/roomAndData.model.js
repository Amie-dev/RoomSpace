import mongoose from "mongoose";
import { dbLife } from "../const.js";

const { Schema, model } = mongoose;

// Subdocument schema for dataField entries
const dataFieldSchema = new Schema(
  {
    datatype: {
      type: String, // "string" | "file"
      enum: ["string", "file"],
      // required: true,
    },
    content: {
      type: String, // actual string or file path/URL
      required: true,
    },
    public_id:{
      type:String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Prevents automatic _id generation for subdocuments
);

// Main Room schema
const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    dataField: [dataFieldSchema],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   expires: 3600, // TTL: 1 hour (in seconds)
    // },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// import dotenv from "dotenv";
// dotenv.config()

// const dbLife = Number(process.env.DB_LIFE) || 18000; // fallback 5h (18000s)
// ⏳ TTL: delete docs 1 hour (3600s) after createdAt
console.log(dbLife);
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: dbLife });


const Newroom=model("Newroom", roomSchema);
export default Newroom
