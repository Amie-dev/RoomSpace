import Newroom from "../model/roomAndData.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const setDataFiles = asyncHandler(async (req, res) => {
  const { uniqueId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  // Step 1: Check if the room exists
  const room = await Newroom.findOne({ uniqueId });
  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  let newData;
  if (req.file) {
    newData = {
      datatype: "file",
      content: req.file.path,
    };
  } else if (req.body.content) {
    newData = {
      datatype: "string",
      content: req.body.content,
    };
  } else {
    return res.status(400).json({ error: "No content provided" });
  }
  console.log(newData.datatype);
  console.log(newData);
  
  await room.dataField.push(newData);
  await room.save();

  // Step 4: Respond
  res.status(201).json(new ApiResponse(201, newData, "Data linked to room"));
});

export const getDataFiels = asyncHandler(async (req, res) => {
  const { uniqueId } = req.params;
  if (!uniqueId) {
    throw new ApiError(400, "UniqueId is required");
  }

  const room = await Newroom.findOne({ uniqueId });
  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, room.dataField, "Data are fatched succesfully"));
});
