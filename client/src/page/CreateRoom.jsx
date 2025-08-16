import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Make sure this is correctly set up

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/room/create-room", { roomName, description });
      const newRoom = res.data?.data;

      if (newRoom && newRoom.uniqueId) {
        navigate(`/room/${newRoom.uniqueId}`);
      } else {
        setMessage("Room created, but no ID returned.");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      setMessage("Failed to create room.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a New Room</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room Name
          </label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter room description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Room
        </button>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateRoom;
