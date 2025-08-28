import Newroom from "../model/roomAndData.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import logger from "../utils/logger.js";
export const setDataFiles = asyncHandler(async (req, res) => {
  const { uniqueId } = req.params;
  const { content } = req.body;
  const file = req.file;

 
  if (!content && !file) {
    logger.warn(`[DATA] No content or file provided for room ${uniqueId}`);
    throw new ApiError(400, "Either content or file must be provided");
  }


  const room = await Newroom.findOne({ uniqueId });
  if (!room) {
    logger.error(`[DATA] Room not found for uniqueId: ${uniqueId}`);
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
    logger.success(
      `[DATA] File uploaded for room ${uniqueId}: ${cloudinaryResponse.url}`,
    );
  } else {
    newData = {
      datatype: "string",
      content: content.trim(),
    };
    logger.success(`[DATA] Text content added for room ${uniqueId}`);
  }


  room.dataField.push(newData);
  await room.save();
  logger.info(`[DATA] Data saved to room ${uniqueId}`);

<<<<<<< HEAD

  res.status(201).json(new ApiResponse(201, newData, "Data linked to room successfully"));
=======
  // Step 5: Respond
  res
    .status(201)
    .json(new ApiResponse(201, newData, "Data linked to room successfully"));
>>>>>>> origin/main
});

export const getDataFiels = asyncHandler(async (req, res) => {
  const { uniqueId } = req.params;

  if (!uniqueId) {
    logger.warn(`[DATA] No uniqueId provided for data fetch`);
    throw new ApiError(400, "Unique ID is required");
  }

  const room = await Newroom.findOne({ uniqueId });
  if (!room) {
    logger.error(`[DATA] Room not found for uniqueId: ${uniqueId}`);
    throw new ApiError(404, "Room not found");
  }

  logger.info(`[DATA] Data fetched for room ${uniqueId}`);
  res
    .status(200)
    .json(new ApiResponse(200, room.dataField, "Data fetched successfully"));
});
