import Newroom from "../model/roomAndData.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import logger from "../utils/logger.js";

export const createRoom = asyncHandler(async (req, res) => {
  let { roomName, description } = req.body;

  if (!roomName) {
    logger.error("[RoomController] Room Name is required for creation.");
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

  logger.success(`[RoomController] Room created: ${roomName} (${uniqueId})`);

  res.status(201).json(new ApiResponse(201, room, "Room created successfully"));
});

export const getRoom = asyncHandler(async (req, res) => {
  try {
    const room = await Newroom.find().select(" -dataField");
    logger.info(`[RoomController] Fetched ${room.length} rooms`);
    res.json(new ApiResponse(100, room, "Rooms fetched successfully"));
  } catch (error) {
    logger.error(`[RoomController] Error fetching rooms: ${error.message}`);
    throw error;
  }
});
