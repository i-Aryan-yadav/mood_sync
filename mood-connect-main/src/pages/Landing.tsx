import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Users, Clock } from "lucide-react";
import { MOODS, MOCK_ONLINE } from "@/lib/moods";
import GradientBlob from "@/components/GradientBlob";

const STEPS = [
  { icon: <MessageCircle size={24} />, title: "Pick a mood", desc: "Choose how you're feeling right now" },
  { icon: <Users size={24} />, title: "Get matched", desc: "We find someone who feels the same" },
  { icon: <Clock size={24} />, title: "Chat for 30 min", desc: "A real conversation, then it's gone" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <div className="relative flex items-center justify-center min-h-[80vh] px-6">
        <GradientBlob variant="amber" size="400px" className="top-[10%] left-[10%]" />
        <GradientBlob variant="lavender" size="350px" className="bottom-[15%] right-[5%]" />
        <GradientBlob variant="rose" size="250px" className="top-[50%] left-[60%]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-2xl"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] text-foreground mb-6">
            Connect with people who feel the{" "}
            <span className="text-primary">same</span> as you.
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            Pick a mood. Meet a stranger. Talk for 30 minutes.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/mood")}
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-base rounded-full glow-amber glow-amber-hover transition-all duration-300"
          >
            Find My Match
          </motion.button>
        </motion.div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  {step.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Choose Your Vibe */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
          Choose Your Vibe
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {MOODS.map((mood) => (
            <motion.div
              key={mood.key}
              whileHover={{ scale: 1.08 }}
              className="glass rounded-full px-5 py-2.5 flex items-center gap-2 cursor-default"
              style={{ boxShadow: `0 0 20px -8px hsl(var(${mood.cssVar}) / 0.5)` }}
            >
              <span className="text-lg">{mood.emoji}</span>
              <span className="font-body text-sm text-foreground">{mood.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Stats */}
      <div className="max-w-md mx-auto px-6 pb-20">
        <div className="glass-elevated rounded-2xl p-6">
          <p className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-5 text-center">
            Live Now
          </p>
          <div className="space-y-3">
            {MOODS.map((mood) => (
              <div key={mood.key} className="flex justify-between items-center font-body text-sm">
                <span className="text-muted-foreground">
                  {mood.emoji} {mood.label}
                </span>
                <span
                  className="tabular-nums font-semibold num-glow"
                  style={{ color: `hsl(var(${mood.cssVar}))` }}
                >
                  {MOCK_ONLINE[mood.key].toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
