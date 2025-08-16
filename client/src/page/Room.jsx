import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const Room = () => {
  const { uniqueId } = useParams();
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [dataFields, setDataFields] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/data/set-data/${uniqueId}`, { content });
      setMessage("✅ Room data updated successfully!");
      setContent("");
      // Refresh data after submission
      fetchRoomData();
    } catch (error) {
      console.error("Error updating room:", error);
      setMessage("❌ Failed to update room.");
    }
  };

  const fetchRoomData = async () => {
    try {
      const res = await api.get(`/data/${uniqueId}/get-data`);
      setDataFields(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching room:", err);
      setError("Room not found.");
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, [uniqueId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        Room Details
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center font-medium">
          {error}
        </div>
      )}

      {!error && (
        <div className="space-y-4 mb-10">
          {dataFields.length > 0 ? (
            dataFields.map((field, index) => (
              <div
                key={index}
                className="border border-gray-300 p-5 rounded-lg bg-gray-50 shadow-sm"
              >
                <p className="text-sm text-gray-500 mb-1">Field #{index + 1}</p>
                
                <div className="text-lg text-gray-800">
                  <strong>Content:</strong> {field.content}
                </div>
                <div className="text-lg text-gray-800 flex justify-end">
                  <strong>Datatype:</strong> {field.datatype}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">
              No data fields found for this room.
            </p>
          )}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
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
    </div>
  );
};

export default Room;
