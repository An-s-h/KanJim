import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const AnswerReview = ({ quiz, answers }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
        <BookOpen className="w-6 h-6 text-purple-400" />
        Review Your Answers
      </h3>
      <div className="space-y-3">
        {quiz.map((q, i) => {
          const isCorrect = answers[i] === q.answer;
          const isExpanded = expandedQuestion === i;
          
          return (
            <div key={i} className={`rounded-xl border backdrop-blur-sm overflow-hidden ${
              isCorrect 
                ? 'bg-green-500/10 border-green-400/30' 
                : 'bg-red-500/10 border-red-400/30'
            }`}>
              <button 
                onClick={() => toggleQuestion(i)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isCorrect ? <CheckCircle className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <span className="font-medium text-white">Question {i + 1}: </span>
                    <span className="text-gray-300">{q.question}</span>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              
              {isExpanded && (
                <div className="p-4 border-t border-gray-700/50 bg-gray-900/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      <p className="text-sm font-medium text-gray-300 mb-1">Your answer</p>
                      <p className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {answers[i] || "Not answered"}
                      </p>
                    </div>
                    {!isCorrect && (
                      <div className="p-3 rounded-lg bg-green-500/20">
                        <p className="text-sm font-medium text-gray-300 mb-1">Correct answer</p>
                        <p className="font-medium text-green-400">{q.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerReview;