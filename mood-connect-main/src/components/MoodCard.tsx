import { motion } from "framer-motion";
import type { MoodInfo } from "@/lib/moods";

interface MoodCardProps {
  mood: MoodInfo;
  selected: boolean;
  onClick: () => void;
}

const MoodCard = ({ mood, selected, onClick }: MoodCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      className={`w-full p-5 rounded-xl text-left transition-all duration-300 glass ${
        selected ? "ring-2" : "hover:ring-1 hover:ring-white/10"
      }`}
      style={
        selected
          ? {
              backgroundColor: `hsl(var(${mood.cssVar}) / 0.15)`,
              boxShadow: `0 0 30px -5px hsl(var(${mood.cssVar}) / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.1)`,
              border: `1px solid hsl(var(${mood.cssVar}) / 0.5)`,
            }
          : undefined
      }
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">{mood.emoji}</span>
        <div>
          <span className="font-display font-semibold text-foreground block">
            {mood.label}
            {mood.key === "flirty" && (
              <span className="ml-2 text-xs text-muted-foreground font-body">18+</span>
            )}
          </span>
          <span className="text-sm text-muted-foreground font-body">{mood.description}</span>
        </div>
      </div>
    </motion.button>
  );
};

export default MoodCard;
