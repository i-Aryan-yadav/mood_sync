import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Mood } from "@/lib/moods";
import GradientBlob from "@/components/GradientBlob";

const AFFIRMATIONS = [
  "Every conversation leaves a mark ✦",
  "Strangers become moments",
  "You showed up. That matters.",
];

interface ChatEndProps {
  moodKey: Mood;
}

const ChatEnd = ({ moodKey }: ChatEndProps) => {
  const navigate = useNavigate();
  const [affirmIndex, setAffirmIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAffirmIndex((i) => (i + 1) % AFFIRMATIONS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden"
    >
      <GradientBlob variant="rose" size="300px" className="top-[20%] left-[20%]" />
      <GradientBlob variant="lavender" size="250px" className="bottom-[20%] right-[15%]" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)"
      }} />

      <div className="relative z-10 text-center max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl mb-6"
        >
          ✦
        </motion.div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
          That's a wrap ✦
        </h1>
        <p className="font-body text-muted-foreground mb-10">
          Hope it meant something.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/matching?mood=${moodKey}`)}
            className="px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-full glow-amber transition-all duration-300"
          >
            Match Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/mood")}
            className="px-7 py-3.5 glass font-display font-semibold text-sm text-foreground rounded-full transition-all duration-300 hover:bg-muted/50"
          >
            Change Mood
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={affirmIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-body text-xs text-muted-foreground italic"
          >
            {AFFIRMATIONS[affirmIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatEnd;
