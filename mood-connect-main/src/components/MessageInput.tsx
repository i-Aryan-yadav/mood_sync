import { useState } from "react";
import { Send, Smile } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const EMOJI_STRIP = ["😂", "❤️", "🥺", "😭", "🙃", "✨", "🔥", "👀"];

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {showEmoji && (
        <div className="absolute bottom-full mb-2 left-4 right-4 glass rounded-xl p-3 flex gap-2 justify-center">
          {EMOJI_STRIP.map((emoji) => (
            <button
              key={emoji}
              onClick={() => { setText((t) => t + emoji); setShowEmoji(false); }}
              className="text-xl hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 p-3 border-t border-border">
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg"
        >
          <Smile size={20} />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-muted text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-full font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
        <button
          onClick={handleSend}
          className={`p-3 rounded-full transition-all duration-200 ${
            text.trim()
              ? "bg-primary text-primary-foreground glow-amber"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
