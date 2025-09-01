import { MessageSquare } from "lucide-react";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

// Helper function to group messages by date
const groupMessagesByDate = (messages) => {
  return messages.reduce((groups, message) => {
    const date = message.createdAt
      ? new Date(message.createdAt).toDateString()
      : new Date().toDateString();

    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {});
};

const MessagesArea = ({ messages, isLoading, messagesEndRef }) => {
  if (isLoading) {
    return null;
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm mt-1">
            Start the conversation by sending a message
          </p>
        </div>
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-hide hover:scrollbar-show">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <DateSeparator date={date} />
          {dateMessages.map((message, index) => (
            <Message key={message._id || index} message={message} />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesArea;