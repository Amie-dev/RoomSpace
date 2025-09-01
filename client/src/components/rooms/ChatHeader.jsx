import { LinkIcon, Hash, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Constants
const ROOM_DURATION_HOURS = 10;
const ROOM_DURATION_MS = ROOM_DURATION_HOURS * 60 * 60 * 1000;

const ChatHeader = ({ room, roomId, onCopyLink }) => {
  const [, forceUpdate] = useState({});

  // Force re-render every 30 seconds for live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate remaining time (recalculates on each render)
  const getRemainingTime = () => {
    if (!room?.createdAt) return null;

    const createdAt = new Date(room.createdAt);
    const expirationTime = new Date(createdAt.getTime() + ROOM_DURATION_MS);
    const remaining = Math.max(0, expirationTime.getTime() - Date.now());

    return remaining > 0 ? remaining : null;
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const remainingTime = getRemainingTime();

  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Left section - Room info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
            <Hash className="h-5 w-5 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-semibold text-lg truncate">
                {room?.roomName || `Room ${roomId}`}
              </h1>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md flex-shrink-0">
                {roomId}
              </span>
            </div>

            {room?.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {room.description}
              </p>
            )}
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          {remainingTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-orange-50 dark:bg-orange-950 px-3 py-1.5 rounded-lg">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{formatTime(remainingTime)}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onCopyLink}
            className="flex items-center gap-2 px-3"
          >
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Copy Link</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
