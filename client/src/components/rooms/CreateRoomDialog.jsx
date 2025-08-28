<<<<<<< Updated upstream
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

import { handleError } from "@/lib/errorHandler";
import { API_BASE_URL } from "@/config";
=======
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { handleError } from '@/lib/errorHandler';
>>>>>>> Stashed changes

const CreateRoomDialog = ({ open, onOpenChange, onCreateRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) {
      return;
    }

    try {
      await onCreateRoom({ roomName, description });
      // If successful, clear the form
      setRoomName("");
      setDescription("");
    } catch (error) {
      handleError(error, "create room");
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
            return handleCreate(e);
          }}
          className="grid gap-4 py-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!roomName.trim()}>
            Create Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomDialog;
