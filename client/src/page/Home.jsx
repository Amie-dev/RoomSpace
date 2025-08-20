import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import HomeHeader from "@/components/ui/HomeHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      {/* 🔹 Header */}
      <HomeHeader />

      {/* 🔹 Main Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-16 px-6">
        {/* Hero Section */}
        <div className="text-center mb-14">
          <h2 className="text-indigo-500 text-lg font-semibold uppercase tracking-wide">
            Welcome to
          </h2>
          <h1 className="text-gray-900 text-5xl font-extrabold tracking-tight font-sans mt-2">
            RoomSpace
          </h1>
          <p className="mt-5 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            A modern collaboration platform where teams and individuals can
            create, share, and organize their ideas in one shared space —
            simple, fast, and accessible from anywhere.
          </p>
        </div>

        {/* Create Room Button */}
        <div className="flex justify-center mb-12">
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold rounded-2xl shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-transform bg-indigo-600 text-white"
            onClick={() => navigate("/create-room")}
          >
            ➕ Create Room
          </Button>
        </div>

        {/* Rooms Section */}
        <div className="max-w-6xl mx-auto">
          {error && (
            <p className="text-red-600 text-center font-medium mb-6">{error}</p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-200 animate-pulse rounded-xl"
                ></div>
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <Card
                  key={room._id}
                  className="hover:shadow-xl transition-transform hover:-translate-y-1 border border-gray-200 rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {room.roomName}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {room.description || "No description provided."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      to={`/room/${room.uniqueId}`}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      Join Room →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center italic">
              No rooms available. Start by creating one!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
