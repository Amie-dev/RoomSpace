// src/lib/errorHandler.js
export const handleError = (error, operation) => {
  console.error(`Error during ${operation}:`, error);
  // You can add more sophisticated error handling here
  // For example, showing a toast notification or sending to an error tracking service
};