import mongoose from "mongoose";

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

// ⏳ TTL: delete docs 1 hour (3600s) after createdAt
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60*60*10 });


const Newroom=model("Newroom", roomSchema);
export default Newroom
