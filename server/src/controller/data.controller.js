import Newroom from "../model/roomAndData.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const setDataFiles = asyncHandler(async (req, res) => {
  const { uniqueId } = req.params;
  const { content } = req.body;
  const file = req.file;

 
  if (!content && !file) {
    throw new ApiError(400, "Either content or file must be provided");
  }


  const room = await Newroom.findOne({ uniqueId });
  if (!room) {
    throw new ApiError(404, "Room not found");
  }

 
  let newData;
  if (file) {
    const cloudinaryResponse = await uploadOnCloudinary(file.path);
    newData = {
      datatype: "file",
      content: cloudinaryResponse.url,
      public_id: cloudinaryResponse.public_id,
    };
  } else {
    newData = {
      datatype: "string",
      content: content.trim(),
    };
  }


  room.dataField.push(newData);
  await room.save();


  res.status(201).json(new ApiResponse(201, newData, "Data linked to room successfully"));
});


export const getDataFiels = asyncHandler(async (req, res) => {
  const { uniqueId } = req.params;

  if (!uniqueId) {
    throw new ApiError(400, "Unique ID is required");
  }

  const room = await Newroom.findOne({ uniqueId });
  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  res.status(200).json(new ApiResponse(200, room.dataField, "Data fetched successfully"));
});

