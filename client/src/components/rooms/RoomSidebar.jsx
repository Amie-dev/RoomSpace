import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Hash, Plus } from "lucide-react";

const RoomSidebar = ({
  rooms,
  selectedRoomId,
  onRoomSelect,
  onCreateRoom,
  isLoading,
}) => (
  <div className="w-80 bg-muted/30 flex flex-col">
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/roomspace.svg" alt="RoomSpace Logo" className="h-8 w-8" />
          <h2 className="font-semibold text-lg">RoomSpace</h2>
        </Link>
        <Button size="sm" onClick={onCreateRoom} className="h-8 w-8 p-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto">
      {isLoading ? (
        <div className="p-2 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-3 rounded-lg">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No rooms yet</p>
          <p className="text-xs mt-1">Create your first room to get started</p>
        </div>
      ) : (
        <div className="p-2 space-y-1">
          {rooms.map((room) => (
            <button
              key={room.uniqueId}
              onClick={() => onRoomSelect(room.uniqueId)}
              className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-muted/60 ${
                selectedRoomId === room.uniqueId
                  ? "bg-primary/10"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  <Hash className="h-3 w-3 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {room.roomName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {room.description || "No description"}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default RoomSidebar;