const QuestionDisplay = ({ quiz, currentQuestion, answers, handleSelect, animateText }) => {
  if (!quiz[currentQuestion]) return null;

  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-400/20 rounded-2xl p-8 backdrop-blur-sm">
        <div className={`${animateText ? 'animate-pulse' : ''}`}>
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full mb-4 backdrop-blur-sm">
              <span className="text-purple-300 text-sm font-medium">Question {currentQuestion + 1} of {quiz.length}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {quiz[currentQuestion].question}
            </h3>
            {quiz[currentQuestion].char && (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl backdrop-blur-sm">
                <span className="text-3xl font-bold text-white">{quiz[currentQuestion].char}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quiz[currentQuestion].options.map((option, j) => (
              <button
                key={j}
                onClick={() => handleSelect(currentQuestion, option)}
                className={`group relative p-4 rounded-xl border text-left transition-all duration-300 transform hover:scale-105 ${
                  answers[currentQuestion] === option
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50 shadow-lg shadow-purple-500/25"
                    : "bg-purple-500/10 border-purple-400/20 hover:bg-purple-500/15 hover:border-purple-400/40"
                }`}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="relative text-white font-medium">
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;