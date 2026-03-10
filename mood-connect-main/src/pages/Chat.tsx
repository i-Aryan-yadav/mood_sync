import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { MOODS, SIMULATED_RESPONSES, type Mood } from "@/lib/moods";
import ChatBubble from "@/components/ChatBubble";
import CountdownTimer from "@/components/CountdownTimer";
import MessageInput from "@/components/MessageInput";
import TypingIndicator from "@/components/TypingIndicator";
import ChatEnd from "@/pages/ChatEnd";

interface Message {
  id: number;
  text: string;
  isOwn: boolean;
  timestamp: string;
}

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const Chat = () => {
  const [searchParams] = useSearchParams();
  const moodKey = (searchParams.get("mood") || "funny") as Mood;
  const mood = MOODS.find((m) => m.key === moodKey) || MOODS[0];
  const [messages, setMessages] = useState<Message[]>([]);
  const [ended, setEnded] = useState(false);
  const [typing, setTyping] = useState(false);
  const [reportShown, setReportShown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  const DEMO_SECONDS = 90;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    setTyping(true);
    const timeout = setTimeout(() => {
      const responses = SIMULATED_RESPONSES[moodKey];
      setMessages([{ id: Date.now(), text: responses[0], isOwn: false, timestamp: getTime() }]);
      responseIndex.current = 1;
      setTyping(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [moodKey]);

  const handleSend = (text: string) => {
    if (ended) return;
    const newMsg: Message = { id: Date.now(), text, isOwn: true, timestamp: getTime() };
    setMessages((prev) => [...prev, newMsg]);

    const responses = SIMULATED_RESPONSES[moodKey];
    const idx = responseIndex.current % responses.length;
    responseIndex.current += 1;

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: responses[idx], isOwn: false, timestamp: getTime() },
      ]);
    }, 1200 + Math.random() * 1800);
  };

  const handleTimerComplete = useCallback(() => {
    setEnded(true);
  }, []);

  if (ended) {
    return <ChatEnd moodKey={moodKey} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-background flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border glass-elevated max-w-[640px] w-full mx-auto">
        <div
          className="flex items-center gap-2 glass rounded-full px-3 py-1.5"
          style={{ boxShadow: `0 0 15px -5px hsl(var(${mood.cssVar}) / 0.4)` }}
        >
          <span className="text-lg">{mood.emoji}</span>
          <span className="font-display text-xs font-semibold text-foreground">{mood.label}</span>
        </div>
        <CountdownTimer
          totalSeconds={DEMO_SECONDS}
          onComplete={handleTimerComplete}
          moodCssVar={mood.cssVar}
        />
        <button
          onClick={() => setReportShown(!reportShown)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg"
        >
          <Flag size={16} />
        </button>
      </div>

      {reportShown && (
        <div className="max-w-[640px] w-full mx-auto px-4 py-2 glass text-center">
          <p className="font-body text-xs text-muted-foreground">
            Report submitted. Thank you for keeping MoodSync safe.
          </p>
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 max-w-[640px] w-full mx-auto"
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            isOwn={msg.isOwn}
            moodCssVar={mood.cssVar}
            timestamp={msg.timestamp}
          />
        ))}
        {typing && <TypingIndicator moodCssVar={mood.cssVar} />}
      </div>

      {/* Input */}
      <div className="max-w-[640px] w-full mx-auto">
        <MessageInput onSend={handleSend} />
      </div>
    </motion.div>
  );
};

export default Chat;
