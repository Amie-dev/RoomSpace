import mongoose, { Schema } from "mongoose";

const dataFieldSchema = new Schema(
  {
    type: {
      type: String, // "string" | "file"
      required: true,
      enum: ["string", "file"], // optional: restrict to valid types
    },
    content: {
      type: String,
      required: true, // could be actual text or file path/URL
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // optional: disables automatic _id for subdocuments
);

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  dataField: [dataFieldSchema],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
