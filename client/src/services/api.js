import axios from "axios";
import { API_BASE_URL } from "../config";
import { toast } from "sonner"; // Import toast

const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- Error Handling (moved from errorHandler.js) ---
let lastNetworkErrorTime = 0;
const NETWORK_ERROR_DELAY = 5000; // 5 seconds

export const handleError = (error, operation) => {
  if (
    error.code === "ERR_NETWORK" ||
    error.message.includes("Network Error") ||
    error.message.includes("CORS") ||
    error.message.includes("Cross-Origin")
  ) {
    const now = Date.now();
    if (operation === "fetch rooms" || operation === "fetch room data") {
      if (now - lastNetworkErrorTime > NETWORK_ERROR_DELAY) {
        toast.error(
          `Server connection issue. Please make sure the server is running on ${API_BASE_URL}.`,
        );
        lastNetworkErrorTime = now;
      }
    } else {
      toast.error(
        `Server connection issue. Please make sure the server is running on ${API_BASE_URL}.`,
      );
    }
    return true;
  } else {
    const errorCode = error.response?.data?.code || error.response?.data?.error?.code || error.code;

    if (errorCode === "LIMIT_FILE_SIZE") {
      toast.error(`File is too large. Maximum allowed size is 5MB.`);
    } else {
      toast.error(`Failed to ${operation}. Please try again.`);
    }
    return false;
  }
};

export const clearErrorToast = () => {
  lastNetworkErrorTime = 0;
};
// --- End Error Handling ---

// --- API Functions ---

export const fetchRooms = async () => {
  try {
    const response = await api.get("/api/v1/room");
    clearErrorToast();
    return response.data.data;
  } catch (error) {
    handleError(error, "fetch rooms");
    throw error; // Re-throw to allow component to handle loading states etc.
  }
};

export const fetchRoomData = async (uniqueId) => {
  try {
    const response = await api.get(`/api/v1/data/${uniqueId}/get-data`);
    clearErrorToast();
    return response.data.data;
  } catch (error) {
    handleError(error, "fetch room data");
    throw error;
  }
};

export const createRoom = async (roomName, description) => {
  try {
    const response = await api.post("/api/v1/room/create-room", {
      roomName,
      description,
    });
    clearErrorToast();
    return response.data.data;
  } catch (error) {
    handleError(error, "create room");
    throw error;
  }
};

export const sendMessage = async (uniqueId, formData) => {
  try {
    const response = await api.post(
      `/api/v1/data/set-data/${uniqueId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    clearErrorToast();
    return response.data.data;
  } catch (error) {
    handleError(error, "send message");
    throw error;
  }
};