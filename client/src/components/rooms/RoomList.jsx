import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Share2, Plus, Users, FolderSync, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CreateRoomDialog from "./CreateRoomDialog";
import { handleError, clearErrorToast } from "@/lib/errorHandler";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/room`);
      setRooms(response.data.data);
      // Clear any previous error toasts when connection is restored
      clearErrorToast();
    } catch (error) {
      console.error("Error fetching rooms:", error);
      handleError(error, "fetch rooms");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoom = async ({ roomName, description }) => {
    if (!roomName.trim()) {
      toast.error("Room name is required.");
      throw new Error("Room name is required");
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/room/create-room`,
        {
          roomName,
          description,
        },
      );

      setRooms([...rooms, response.data.data]);
      setIsCreateDialogOpen(false);

      toast.success("Room created successfully!");
      // Clear any previous error toasts when connection is restored
      clearErrorToast();
    } catch (error) {
      handleError(error, "create room");
      // Re-throw the error so the dialog can handle it
      throw error;
    }
  };

  // Show welcome screen when there are no rooms
  if (!isLoading && rooms.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-2xl mx-auto">
          <div className="bg-primary/10 rounded-full p-5 mb-6 flex items-center justify-center">
            <img
              src="/roomspace.svg"
              alt="RoomSpace Logo"
              className="h-12 w-12"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">Welcome to RoomSpace</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Create collaborative rooms to share files and communicate with your
            team in real-time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
            <div className="bg-muted rounded-lg p-6">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Create Rooms</h3>
              <p className="text-sm text-muted-foreground">
                Set up dedicated spaces for different projects or teams.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Invite Others</h3>
              <p className="text-sm text-muted-foreground">
                Share room links with colleagues to collaborate.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <FolderSync className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Share Files</h3>
              <p className="text-sm text-muted-foreground">
                Upload and access files from anywhere with your team.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            size="lg"
            className="flex items-center gap-2 px-8 py-6 text-lg"
          >
            <Plus className="h-5 w-5" />
            Create Your First Room
          </Button>
        </div>

        <CreateRoomDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateRoom={handleCreateRoom}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Your Rooms</h1>
            <p className="text-muted-foreground">
              Collaborate and share files in real-time
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Room
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base truncate flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-4 w-32" />
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <Skeleton className="h-3 w-20" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardContent>
                <CardFooter className="pb-4">
                  <Skeleton className="h-9 w-full rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          rooms.length > 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <Card
                    key={room.uniqueId}
                    className="border-border hover:border-primary/30 transition-all hover:shadow-sm"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base truncate flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-md">
                          <Share2 className="h-3 w-3 text-primary" />
                        </div>
                        {room.roomName}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        {new Date(room.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {room.description || "No description provided"}
                      </p>
                    </CardContent>
                    <CardFooter className="pb-4">
                      <Link to={`/room/${room.uniqueId}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Join Room
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <CreateRoomDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateRoom={handleCreateRoom}
      />
    </div>
  );
};

export default RoomList;
