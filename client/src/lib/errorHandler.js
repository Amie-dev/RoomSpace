import { toast } from 'sonner';

// Keep track of recent errors to avoid duplicates from automatic processes
let lastNetworkErrorTime = 0;
const NETWORK_ERROR_DELAY = 5000; // 5 seconds

export const handleError = (error, operation) => {
  // Check if it's a network error (including CORS errors)
  if (error.code === 'ERR_NETWORK' || 
      error.message.includes('Network Error') ||
      error.message.includes('CORS') ||
      error.message.includes('Cross-Origin')) {
    const now = Date.now();
    // For user-initiated actions, always show the error
    // For automatic processes (like initial fetch), deduplicate
    if (operation === "fetch rooms" || operation === "fetch room data") {
      // Only show network error toast if it's been more than 5 seconds since the last one
      if (now - lastNetworkErrorTime > NETWORK_ERROR_DELAY) {
        toast.error(
          "Server connection issue. Please make sure the server is running on localhost:3000."
        );
        lastNetworkErrorTime = now;
      }
    } else {
      // Always show error for user-initiated actions (create room, add content, etc.)
      toast.error(
        "Server connection issue. Please make sure the server is running on localhost:3000."
      );
    }
    return true; // Indicates this was a network error
  } else {
    // For non-network errors, show a specific message
    toast.error(`Failed to ${operation}. Please try again.`);
    return false; // Indicates this was not a network error
  }
};

export const clearErrorToast = () => {
  // Reset the network error timer when connection is restored
  lastNetworkErrorTime = 0;
};