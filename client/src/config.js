// Centralized configuration for RoomSpace client

// Use Vite environment variable if available, otherwise fallback to localhost:4000
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
