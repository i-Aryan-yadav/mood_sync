interface TypingIndicatorProps {
  moodCssVar?: string;
}

const TypingIndicator = ({ moodCssVar }: TypingIndicatorProps) => {
  return (
    <div className="flex justify-start mb-3">
      <div
        className="glass px-4 py-3 rounded-lg flex items-center gap-1.5"
        style={moodCssVar ? { backgroundColor: `hsl(var(${moodCssVar}) / 0.15)` } : undefined}
      >
        <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
        <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
        <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
      </div>
    </div>
  );
};

export default TypingIndicator;
