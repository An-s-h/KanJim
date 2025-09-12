const QuizProgress = ({ answers, quiz }) => {
  return (
    <div className="relative">
      <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/25"
          style={{ width: `${((Object.keys(answers).length) / quiz.length) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-300 mt-3 flex justify-between">
        <span>Progress: {Object.keys(answers).length} / {quiz.length}</span>
        <span>{Math.round(((Object.keys(answers).length) / quiz.length) * 100)}% Complete</span>
      </p>
    </div>
  );
};

export default QuizProgress;