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
import { toast } from "sonner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { handleError } from "@/lib/errorHandler";
import { API_BASE_URL } from "@/config";

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
        &lt;form
          onSubmit={(e) =&gt; {
            e.preventDefault();
            handleCreate(e);
          }}
          className="grid gap-4 py-4"
        &gt;
          &lt;div className="grid gap-2"&gt;
            &lt;Label htmlFor="roomName"&gt;Room Name&lt;/Label&gt;
            &lt;Input
              id="roomName"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) =&gt; {
                setRoomName(e.target.value);
              }}
              autoFocus
            /&gt;
          &lt;/div&gt;
          &lt;div className="grid gap-2"&gt;
            &lt;Label htmlFor="description"&gt;Description&lt;/Label&gt;
            &lt;Input
              id="description"
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) =&gt; {
                setDescription(e.target.value);
              }}
            /&gt;
          &lt;/div&gt;
          &lt;DialogFooter&gt;
            &lt;Button variant="outline" onClick={handleCancel} type="button"&gt;
              Cancel
            &lt;/Button&gt;
            &lt;Button type="submit" disabled={!roomName.trim()}&gt;
              Create Room
            &lt;/Button&gt;
          &lt;/DialogFooter&gt;
        &lt;/form&gt;
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomDialog;