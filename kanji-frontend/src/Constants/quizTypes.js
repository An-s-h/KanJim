import { BookOpen, Brain, Zap, RotateCcw, Trophy } from "lucide-react";

export const quizTypes = [
  { 
    id: "meaning", 
    label: "Meaning Quiz", 
    description: "Identify kanji meanings",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    id: "onyomi", 
    label: "Onyomi Quiz", 
    description: "Chinese readings",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    id: "kunyomi", 
    label: "Kunyomi Quiz", 
    description: "Japanese readings",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    id: "reverse", 
    label: "Reverse Quiz", 
    description: "Meaning to kanji",
    icon: RotateCcw,
    gradient: "from-orange-500 to-red-500"
  },
  { 
    id: "mixed", 
    label: "Mixed Quiz", 
    description: "All question types",
    icon: Trophy,
    gradient: "from-indigo-500 to-purple-500"
  },
];