// Simple date formatter
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  // Same day
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Default format
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
};

const DateSeparator = ({ date }) => (
  <div className="flex justify-center my-4">
    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
      {formatDate(date)}
    </span>
  </div>
);

export default DateSeparator;
