import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const UpdateRoomData = () => {
  const { uniqueId } = useParams();
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(uniqueId);
        
      await api.post(`/data/set-data/${uniqueId}`, { content });
      setMessage("✅ Room data updated successfully!");
      setContent(""); // Clear input after success
    } catch (error) {
      console.error("Error updating room:", error);
      setMessage("❌ Failed to update room.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
        Add New Room Data
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Data Content
          </label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter new content..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Submit Data
        </button>

        {message && (
          <div className="text-center text-sm text-green-600 font-medium mt-2">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateRoomData;
