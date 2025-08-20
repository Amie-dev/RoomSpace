import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

// shadcn/ui imports
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Room = () => {
  const { uniqueId } = useParams();
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [datatype, setDatatype] = useState("text");
  const [message, setMessage] = useState("");
  const [dataFields, setDataFields] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("datatype", datatype);

      if (datatype === "file" && file) {
        formData.append("file", file);
      } else {
        formData.append("content", content);
      }

      await api.post(`/data/set-data/${uniqueId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Room data updated successfully!");
      setContent("");
      setFile(null);
      setDatatype("text");
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
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Room Details
      </h2>

      {/* Error */}
      {error && (
        <Card className="bg-red-100 text-red-700 border-red-300 shadow-md">
          <CardContent className="p-4 text-center font-medium">
            {error}
          </CardContent>
        </Card>
      )}

      {/* Data Fields */}
      {!error && (
        <div className="space-y-4">
          {dataFields.length > 0 ? (
            dataFields.map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      Field #{index + 1}
                    </CardTitle>
                    <Badge variant="secondary">{field.datatype}</Badge>
                  </CardHeader>
                  <CardContent>
                    {field.datatype === "file" ? (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800">
                          <strong>File:</strong>{" "}
                          {field.filename || "Unnamed File"}
                        </span>
                        <Button variant="outline" asChild>
                          <a href={field.content} download>
                            ⬇ Download
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-700 break-words leading-relaxed">
                        <strong>Content:</strong> {field.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">
              No data fields found for this room.
            </p>
          )}
        </div>
      )}

      {/* Add Data Form */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-indigo-600">
            Add New Room Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="font-medium text-gray-700">Data Input</Label>
              <div className="flex gap-3 mt-2">
                {/* Dropdown */}
                <Select value={datatype} onValueChange={(v) => setDatatype(v)}>
                  <SelectTrigger className="w-1/3 rounded-lg border-gray-300">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                  </SelectContent>
                </Select>

                {/* Input changes dynamically */}
                {datatype === "file" ? (
                  <Input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-2/3 rounded-lg border-gray-300"
                    required
                  />
                ) : (
                  <Input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter new content..."
                    className="w-2/3 rounded-lg border-gray-300"
                    required
                  />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition rounded-xl"
            >
              Submit Data
            </Button>

            {message && (
              <p className="text-center text-sm font-medium mt-2">
                {message.includes("✅") ? (
                  <span className="text-green-600">{message}</span>
                ) : (
                  <span className="text-red-600">{message}</span>
                )}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Room;
