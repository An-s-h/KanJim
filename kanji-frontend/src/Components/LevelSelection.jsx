import { levels } from "../Constants/levels";

const LevelSelection = ({ selectedLevel, setSelectedLevel }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Level</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelectedLevel(level.id)}
            className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 transform hover:scale-105 ${
              selectedLevel === level.id
                ? `bg-gradient-to-br ${level.gradient}/20 border-white/30 shadow-lg shadow-purple-500/25`
                : "bg-purple-500/10 border-purple-400/20 hover:bg-purple-500/15 hover:border-purple-400/40"
            }`}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${level.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-2">{level.label}</div>
              <div className="text-lg text-gray-300 mb-2">{level.description}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                selectedLevel === level.id 
                  ? `bg-gradient-to-r ${level.gradient} text-white`
                  : "bg-gray-700 text-gray-300"
              }`}>
                {level.difficulty}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;