import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import {
  fetchRooms as apiFetchRooms,
  fetchRoomData as apiFetchRoomData,
  createRoom,
  sendMessage,
  clearErrorToast,
} from "@/services/api";
import CreateDialog from "./CreateDialog";
import RoomSidebar from "./RoomSidebar";
import MessagesArea from "./MessagesArea";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import WelcomeScreen from "./WelcomeScreen";

// Main Dashboard Component
const Dashboard = () => {
  const { uniqueId } = useParams();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [isRoomsLoading, setIsRoomsLoading] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Fetch rooms on mount
  const loadRooms = async () => {
      try {
        const data = await apiFetchRooms();
        setRooms(data);
        clearErrorToast();
      } catch {
        // Error handling is now centralized in the API service
      } finally {
        setIsRoomsLoading(false);
      }
    };
  useEffect(() => {
    
    loadRooms();
  }, []);

  // Fetch room data when room changes
  const loadRoomData = async () => {
      if (!uniqueId) return;
      try {
        setIsChatLoading(true);
        const data = await apiFetchRoomData(uniqueId);
        setRoomData(data);
        clearErrorToast();
      } catch {
        // Error handling is now centralized in the API service
      } finally {
        setIsChatLoading(false);
      }
    };
  useEffect(() => {

    loadRoomData();
  }, [uniqueId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomData]);

  // Handlers
  const handleRoomSelect = (roomId) => navigate(`/app/room/${roomId}`);

  const handleCreateRoom = async ({ roomName, description }) => {
    if (!roomName.trim()) {
      toast.error("Room name is required.");
      throw new Error("Room name is required");
    }

    const newRoom = await createRoom(roomName, description); // Call the new API function

    setRooms((prev) => [...prev, newRoom]);
    setIsCreateDialogOpen(false);
    navigate(`/app/room/${newRoom.uniqueId}`);

    toast.success("Room created successfully!");
    clearErrorToast();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!uniqueId || (!content.trim() && !file)) return;

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("content", content);
    }

    setIsSubmitting(true);
    try {
      const data = await sendMessage(uniqueId, formData); // Call the new API function

      setRoomData((prev) => [...prev, data]);
      setContent("");
      setFile(null);
      setFileName("");

      clearErrorToast();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setContent("");
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setFileName("");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/app/room/${uniqueId}`);
    toast.success("Room link copied to clipboard!");
  };

  const selectedRoom = rooms.find((room) => room.uniqueId === uniqueId);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <RoomSidebar
        rooms={rooms}
        selectedRoomId={uniqueId}
        onRoomSelect={handleRoomSelect}
        onCreateRoom={() => setIsCreateDialogOpen(true)}
        isLoading={isRoomsLoading}
      />

      <div className="flex-1 flex flex-col">
        {uniqueId ? (
          <>
            <ChatHeader
              room={selectedRoom}
              roomId={uniqueId}
              onCopyLink={handleCopyLink}
            />

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide hover:scrollbar-show">
              <MessagesArea
                messages={roomData}
                isLoading={isChatLoading}
                messagesEndRef={messagesEndRef}
              />
            </div>

            <MessageInput
              content={content}
              setContent={setContent}
              file={file}
              fileName={fileName}
              onFileChange={handleFileChange}
              onClearFile={handleClearFile}
              onSubmit={handleSendMessage}
              isSubmitting={isSubmitting}
            />
          </>
        ) : (
          <WelcomeScreen />
        )}
      </div>

      <CreateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateRoom={handleCreateRoom}
      />
    </div>
  );
};

export default Dashboard;
