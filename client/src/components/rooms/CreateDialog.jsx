import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Share2 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { handleError } from "@/services/api";
import { API_BASE_URL } from "@/config";
import axios from "axios";


const CreateRoomDialog = ({ open, onOpenChange, onCreateRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    try {
      setLoading(true);

      // ✅ await axios call
      const res = await axios.post(`${API_BASE_URL}/api/v1/room/create-room`, {
        roomName,
        description,
      });

      console.log("Room created:", res.data);

      // notify parent if provided
      if (onCreateRoom) {
        await onCreateRoom(res.data);
      }

      // reset form
      setRoomName("");
      setDescription("");
      onOpenChange(false);
    } catch (error) {
      handleError(error, "create room");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setRoomName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create New Room
          </DialogTitle>
          <DialogDescription>
            Set up a new collaboration space for your team
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate(e);
          }}
          className="grid gap-4 py-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={!roomName.trim()}>
              Create Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomDialog;