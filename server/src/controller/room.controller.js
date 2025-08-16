
import Newroom from "../model/roomAndData.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";


export const createRoom = asyncHandler(async (req, res) => {
  let { roomName, description } = req.body ;

  if (!roomName) {
    throw new ApiError(400, "Room Name is required");
  }

  if (!description) {
    description = roomName;
  }

  const uniqueId = Math.floor(1000 + Math.random() * 9000);

  const room = await Newroom.create({
    roomName,
    description,
    uniqueId,
  });

  console.log("Room created:", room);

  res.status(201).json(new ApiResponse(
    201,
    room,
    "Room created successfully"
  ));
});


export const getRoom=asyncHandler(async(req,res)=>{
    const room=await Newroom.find().select(" -dataField")
    res.json(new ApiResponse(100,room,"bhjshdbhsjhdn"))
})

