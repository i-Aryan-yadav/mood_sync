export type Mood = "funny" | "sad" | "study" | "advice" | "bored" | "flirty";

export interface MoodInfo {
  key: Mood;
  label: string;
  emoji: string;
  description: string;
  color: string;
  cssVar: string;
}

export const MOODS: MoodInfo[] = [
  { key: "funny", label: "Funny", emoji: "😄", description: "Laugh it out with someone", color: "mood-funny", cssVar: "--mood-funny" },
  { key: "sad", label: "Sad", emoji: "😢", description: "Find comfort in shared feelings", color: "mood-sad", cssVar: "--mood-sad" },
  { key: "study", label: "Study Buddy", emoji: "📚", description: "Focus together, win together", color: "mood-study", cssVar: "--mood-study" },
  { key: "advice", label: "Advice", emoji: "🤝", description: "Get a fresh perspective", color: "mood-advice", cssVar: "--mood-advice" },
  { key: "bored", label: "Bored", emoji: "😴", description: "Kill time with good company", color: "mood-bored", cssVar: "--mood-bored" },
  { key: "flirty", label: "Flirty", emoji: "❤️", description: "Spark a connection", color: "mood-flirty", cssVar: "--mood-flirty" },
];

export const MOCK_ONLINE: Record<Mood, number> = {
  funny: 2341,
  sad: 1204,
  study: 876,
  advice: 543,
  bored: 1892,
  flirty: 809,
};

export const SIMULATED_RESPONSES: Record<Mood, string[]> = {
  funny: [
    "Haha, you won't believe what happened to me today 😂",
    "I needed this laugh so bad",
    "Okay okay, what's the funniest thing you've seen this week?",
    "I just snorted water out of my nose reading that 💀",
    "You're hilarious, seriously",
  ],
  sad: [
    "Yeah, it's been a rough day for me too",
    "Sometimes it helps just knowing someone else gets it",
    "I don't even know why I feel like this today",
    "Thanks for being here. Seriously.",
    "Do you ever feel like the world is just... heavy?",
  ],
  study: [
    "What are you studying right now?",
    "I've been at this for 3 hours and my brain is melting 📖",
    "Pomodoro technique is saving my life rn",
    "Let's keep each other accountable!",
    "Almost done with this chapter, you?",
  ],
  advice: [
    "I've been thinking about this a lot actually",
    "What would you do in my situation?",
    "Honestly, I think you should trust your gut",
    "That's a really good perspective, I hadn't thought of it that way",
    "Life is too short to overthink it, you know?",
  ],
  bored: [
    "Same, I've been scrolling for an hour straight",
    "Tell me something interesting about yourself",
    "What's the weirdest thing you've ever done out of boredom?",
    "We should start a random topic generator 😴",
    "At least we're bored together now",
  ],
  flirty: [
    "Well hello there 😏",
    "So what brings you to the flirty side of things?",
    "I bet you have a great smile",
    "This is way more fun than swiping on apps",
    "Tell me something that would make me want to keep talking to you",
  ],
};
