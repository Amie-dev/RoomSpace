import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/room");
      const data = res.data?.data;

      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        setRooms([]);
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to fetch rooms");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-rose-500 text-2xl font-semibold">Welcome to</h2>
        <h1 className="text-yellow-500 text-5xl font-bold font-mono mt-2">
          ROOMSPACE
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          onClick={() => navigate("/create-room")}
        >
          ➕ Create Room
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {rooms.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <li key={room._id}>
                <Link
                  to={`/room/${room.uniqueId}`}
                  className="block bg-white border border-gray-300 rounded-lg p-5 shadow hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {room.roomName}
                  </h3>
                  <p className="text-gray-600">{room.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center italic">No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
