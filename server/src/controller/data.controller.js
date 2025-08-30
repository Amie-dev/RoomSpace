import { dbLife } from "../const.js";
import Newroom from "../model/roomAndData.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import logger from "../utils/logger.js";

// Utility function to check room age
const cleanExpiredData = async (room) => {
  // dbLife is in s 
  const FIVE_HOURS = dbLife*1000 -120000; // 5 hours in ms
  // console.log(FIVE_HOURS);
  // console.log(dbLife);
  
  const now = Date.now();

  if (now - room.createdAt.getTime() >= FIVE_HOURS) {
    console.log("Hell0 oiii");
    
    // find all files stored in Cloudinary
    const files = room.dataField.filter((file) => file.datatype === "file");
    // console.log(files);
    
    // delete all files in parallel (better performance than for-await)
    if (files.length >= 0) {
      await Promise.all(
        files.map((file) => deleteFromCloudinary(file.public_id))
      );
    }

    // clear all data in DB
    room.dataField = [];
    await room.save();

    return true;
  }

  return false;
};

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


  // Step 5: Respond
  res
    .status(201)
    .json(new ApiResponse(201, newData, "Data linked to room successfully"));
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

  // cleanup if older than 5 hours
  const cleared = await cleanExpiredData(room);

  // console.log(cleared);
  
  logger.info(`[DATA] Data fetched for room ${uniqueId}`);
   res.status(200).json(
    new ApiResponse(
      200,
      room.dataField,
      cleared
        ? "Data was older than 5 hours and has been cleared"
        : "Data fetched successfully"
    )
  );
});
