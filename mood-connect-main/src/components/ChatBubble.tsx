interface ChatBubbleProps {
  message: string;
  isOwn: boolean;
  moodCssVar?: string;
  timestamp?: string;
}

const ChatBubble = ({ message, isOwn, moodCssVar, timestamp }: ChatBubbleProps) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      <div className="max-w-[80%]">
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed font-body ${
            isOwn
              ? "rounded-br-md"
              : "rounded-bl-md glass"
          }`}
          style={
            isOwn
              ? { backgroundColor: `hsl(var(--primary) / 0.2)`, color: `hsl(var(--foreground))` }
              : moodCssVar
                ? { backgroundColor: `hsl(var(${moodCssVar}) / 0.12)` }
                : undefined
          }
        >
          {message}
        </div>
        {timestamp && (
          <p className={`text-[10px] text-muted-foreground mt-1 ${isOwn ? "text-right" : "text-left"} px-1`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
