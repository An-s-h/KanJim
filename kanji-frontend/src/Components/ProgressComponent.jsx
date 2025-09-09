import { Link } from "react-router-dom";
import { Target } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const jlptLevels = [
  { 
    level: "N5", 
    count: 103, 
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    difficulty: "Beginner"
  },
  { 
    level: "N4", 
    count: 181, 
    gradient: "from-blue-400 via-cyan-500 to-sky-600",
    difficulty: "Elementary"
  },
  { 
    level: "N3", 
    count: 367, 
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    difficulty: "Intermediate"
  },
  { 
    level: "N2", 
    count: 367, 
    gradient: "from-orange-400 via-red-500 to-pink-500",
    difficulty: "Upper-Int"
  },
  { 
    level: "N1", 
    count: 1026, 
    gradient: "from-purple-400 via-violet-500 to-indigo-600",
    difficulty: "Expert"
  }
];

const ProgressComponent = ({ userProgress }) => {
  const { user } = useUser(); // 👈 Clerk user hook

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto top-20">
        {/* Greeting */}
        <div className="flex justify-between items-center mb-8 mt-20">
          <h1 className="text-3xl font-bold text-white">
            {user ? `Your Progress, ${user.firstName || user.username}!` : "Your Progress"}
          </h1>
          <div></div>
        </div>

        {/* JLPT progress cards */}
        <div className="grid gap-6">
          {jlptLevels.map((level) => {
            const progress = userProgress?.[level.level] ?? 0;

            return (
              <div key={level.level} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {level.level} - {level.difficulty}
                      </h3>
                      <p className="text-white/60">{level.count} total kanji</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{progress}%</div>
                      <div className="text-white/60">
                        {Math.floor((level.count * progress) / 100)} learned
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 bg-gradient-to-r ${level.gradient} rounded-full transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>0</span>
                    <span>{level.count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning stats */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl">
          <div className="p-6">
            <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-6">
              <Target className="w-5 h-5" />
              Learning Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">247</div>
                <div className="text-white/60">Kanji Learned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">15</div>
                <div className="text-white/60">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-300">89%</div>
                <div className="text-white/60">Quiz Average</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">42h</div>
                <div className="text-white/60">Study Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressComponent;
