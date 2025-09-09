import { BookOpen } from "lucide-react";

const ResultsSummary = ({ score, quiz, getScoreColor, getScoreEmoji }) => {
  return (
    <div className="text-center mb-8">
      <div className="text-8xl mb-6">{getScoreEmoji(score, quiz.length)}</div>
      <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
      <div className={`text-6xl font-bold mb-4 ${getScoreColor(score, quiz.length)}`}>
        {score} / {quiz.length}
      </div>
      <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full backdrop-blur-sm">
        <p className="text-xl text-white">
          You scored {Math.round((score / quiz.length) * 100)}%
        </p>
      </div>
    </div>
  );
};

export default ResultsSummary;