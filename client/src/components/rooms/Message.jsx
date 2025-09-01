import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper function to format time
const formatTime = (dateString) => {
  const date = dateString ? new Date(dateString) : new Date();
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Message = ({ message }) => (
  <div className="flex justify-end mb-2">
    <div className="max-w-[70%]">
      {message.datatype === "file" ? (
        <div className="bg-muted text-foreground rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <a
              href={message.content}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline text-sm flex-1 text-primary"
            >
              {message.content.split("/").pop()}
            </a>
            <a href={message.content} download>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-primary/20 text-primary"
              >
                <Download className="h-3 w-3" />
              </Button>
            </a>
          </div>
          <span className="text-xs text-muted-foreground block mt-1 text-right">
            {formatTime(message.createdAt)}
          </span>
        </div>
      ) : (
        <div className="bg-muted text-foreground rounded-lg p-3 shadow-sm flex justify-between items-end">
          <div className="text-sm break-words flex-1">{message.content}</div>
          <span className="text-xs text-muted-foreground ml-2">
            {formatTime(message.createdAt)}
          </span>
        </div>
      )}
    </div>
  </div>
);

export default Message;
