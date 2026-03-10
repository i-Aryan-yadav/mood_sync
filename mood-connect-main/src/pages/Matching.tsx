import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MOODS, type Mood } from "@/lib/moods";

const Matching = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const moodKey = (searchParams.get("mood") || "funny") as Mood;
  const mood = MOODS.find((m) => m.key === moodKey) || MOODS[0];
  const [circleComplete, setCircleComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCircleComplete(true);
    }, 3500);
    const redirect = setTimeout(() => {
      navigate(`/chat?mood=${moodKey}`);
    }, 4200);
    return () => {
      clearTimeout(timer);
      clearTimeout(redirect);
    };
  }, [navigate, moodKey]);

  const circumference = 2 * Math.PI * 60;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative w-[140px] h-[140px] mx-auto mb-8">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke={`hsl(var(${mood.cssVar}))`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{
                animation: "draw-circle 3.5s ease-out forwards",
                transformOrigin: "center",
                transform: "rotate(-90deg)",
              }}
              opacity={circleComplete ? 0.6 : 1}
            />
          </svg>
          {circleComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: [0, 1, 0], scale: [1.2, 1, 1] }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: `0 0 40px hsl(var(${mood.cssVar}) / 0.5)`,
              }}
            />
          )}
        </div>

        <p className="font-sans text-sm text-muted-foreground mb-2">
          Finding someone with the same mood...
        </p>
        <p className="text-2xl">{mood.emoji}</p>

        <style>{`
          @keyframes draw-circle {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default Matching;
