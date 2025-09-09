const QuestionNavigation = ({ quiz, currentQuestion, setCurrentQuestion, answers }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">
          Question {currentQuestion + 1}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={currentQuestion === quiz.length - 1}
            className="p-2 rounded-lg bg-purple-600/50 text-purple-200 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-white font-medium mb-4">Quick Navigation</h3>
      <div className="grid grid-cols-5 gap-2">
        {quiz.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQuestion(i)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
              i === currentQuestion
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : answers[i]
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;