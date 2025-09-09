import { quizTypes } from "../Constants/quizTypes";

const QuizTypeSelection = ({ selectedType, setSelectedType }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Select <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Quiz Type</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`group relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 transform hover:scale-105 ${
                selectedType === type.id
                  ? `bg-gradient-to-br ${type.gradient}/20 border-white/30 shadow-lg shadow-purple-500/25`
                  : "bg-purple-500/10 border-purple-400/20 hover:bg-purple-500/15 hover:border-purple-400/40"
              }`}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  selectedType === type.id 
                    ? `bg-gradient-to-br ${type.gradient}/30 border border-white/20`
                    : "bg-gray-700/50 border border-gray-600"
                }`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-white mb-1">{type.label}</div>
                <div className="text-sm text-gray-400">{type.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizTypeSelection;