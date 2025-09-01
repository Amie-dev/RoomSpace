import { Paperclip, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useRef } from "react";

const MessageInput = ({
  content,
  setContent,
  file,
  fileName,
  onFileChange,
  onClearFile,
  onSubmit,
  isSubmitting,
}) => {
  const fileInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((!content.trim() && !file) || isSubmitting) return;
      onSubmit(e);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const canSubmit = (content.trim() || file) && !isSubmitting;

  return (
    <div className="border-t bg-background">
      {/* File Preview */}
      {file && (
        <div className="px-4 pt-3 pb-1">
          <div className="inline-flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 border max-w-xs">
            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium truncate" title={fileName}>
              {fileName}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 ml-1 hover:bg-destructive/10 hover:text-destructive"
              onClick={onClearFile}
              aria-label="Remove file"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-4">
        <form onSubmit={onSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
              className="pr-12 focus:ring-2"
              autoComplete="off"
            />

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={onFileChange}
              className="hidden"
              accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            />

            {/* File attach button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted"
              onClick={handleFileClick}
              disabled={isSubmitting}
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>

          {/* Send button */}
          <Button
            type="submit"
            size="sm"
            disabled={!canSubmit}
            className="px-4 min-w-[2.5rem]"
            aria-label="Send message"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
