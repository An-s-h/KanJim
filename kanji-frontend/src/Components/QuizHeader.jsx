import { ArrowLeft } from "lucide-react";
const QuizHeader = ({ selectedLevel, selectedType, resetQuiz, quizStarted }) => {
  if (!quizStarted) {
    return (
      <div className="text-center mb-16">
        <div className="inline-block p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl mb-6 backdrop-blur-sm">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            漢字 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Quiz</span> Master
          </h1>
        </div>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          Test your Japanese kanji knowledge with interactive quizzes. Master meanings, readings, and characters through engaging practice sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            漢字 Quiz - {selectedLevel}
          </h1>
          <p className="text-purple-300">
            {selectedType}
          </p>
        </div>
        <button
          onClick={resetQuiz}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Settings
        </button>
      </div>
    </div>
  );
};

export default QuizHeader;