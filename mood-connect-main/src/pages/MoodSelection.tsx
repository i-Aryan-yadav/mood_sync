import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MOODS, type Mood } from "@/lib/moods";
import MoodCard from "@/components/MoodCard";
import GradientBlob from "@/components/GradientBlob";

const MoodSelection = () => {
  const [selected, setSelected] = useState<Mood | null>(null);
  const navigate = useNavigate();

  const handleFind = () => {
    if (!selected) return;
    navigate(`/matching?mood=${selected}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      <GradientBlob variant="lavender" size="300px" className="top-[5%] right-[5%]" />
      <GradientBlob variant="amber" size="250px" className="bottom-[10%] left-[5%]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[640px] relative z-10"
      >
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">
          What's your vibe right now?
        </h1>
        <p className="font-body text-muted-foreground text-center mb-10">
          Pick a mood and we'll find your match
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {MOODS.map((mood, i) => (
            <motion.div
              key={mood.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <MoodCard
                mood={mood}
                selected={selected === mood.key}
                onClick={() => setSelected(mood.key)}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={selected ? { scale: 1.03 } : undefined}
            whileTap={selected ? { scale: 0.97 } : undefined}
            onClick={handleFind}
            disabled={!selected}
            className={`px-8 py-4 font-display font-semibold text-base rounded-full transition-all duration-300 ${
              selected
                ? "bg-primary text-primary-foreground glow-amber"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Find My Match
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MoodSelection;
