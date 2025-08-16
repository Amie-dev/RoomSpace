import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    uniqueId: {
      type: Number,
      required: true,
      unique: true,
    },
    dataField: {
      type: Schema.Types.ObjectId,
      ref: "Data",
    },
  },
  {
    timestamps: true,
  }
);

// roomSchema.pre("save", function (next) {
//   if (!this.uniqueId) {
//     this.uniqueId = Math.floor(1000 + Math.random() * 9000);
//   }
//   next();
// });


const Room = mongoose.model("Room", roomSchema);
export default Room;
