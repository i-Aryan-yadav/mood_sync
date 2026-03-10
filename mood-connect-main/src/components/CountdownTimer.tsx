import { useEffect, useState } from "react";

interface CountdownTimerProps {
  totalSeconds: number;
  onComplete: () => void;
  moodCssVar: string;
}

const CountdownTimer = ({ totalSeconds, onComplete, moodCssVar }: CountdownTimerProps) => {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining, onComplete]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isLow = remaining < 300; // under 5 minutes

  return (
    <span
      className="font-display text-sm font-semibold tabular-nums stat-pulse"
      style={{ color: isLow ? `hsl(var(--accent))` : `hsl(var(${moodCssVar}))` }}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
};

export default CountdownTimer;
