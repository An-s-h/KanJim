import { useEffect, useState } from "react";
import { RotateCcw, Play, ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import LevelSelection from "../Components/LevelSelection";
import QuizTypeSelection from "../Components/QuizTypeSelection";
import QuestionNavigation from "../Components/QuestionNavigation";
import QuestionDisplay from "../Components/QuestionDisplay";
import ResultsSummary from "../Components/ResultsSummary";
import AnswerReview from "../Components/AnswerReview";
import QuizHeader from "../Components/QuizHeader";
import QuizProgress from "../Components/QuizProgress";


const QuizPage = () => {
  const [selectedLevel, setSelectedLevel] = useState("N5");
  const [selectedType, setSelectedType] = useState("mixed");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [animateText, setAnimateText] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    setAnimateText(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/quiz/${selectedLevel}/${selectedType}?count=10`);
      const data = await response.json();
      setQuiz(data.quiz || []);
      setAnswers({});
      setScore(null);
      setShowResults(false);
      setCurrentQuestion(0);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setQuiz([]);
    }
    setLoading(false);
    setTimeout(() => setAnimateText(false), 600);
  };

  useEffect(() => {
    if (quizStarted) {
      fetchQuiz();
    }
  }, [selectedLevel, selectedType, quizStarted]);

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) correctAnswers++;
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    fetchQuiz();
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuiz([]);
    setAnswers({});
    setScore(null);
    setShowResults(false);
    setCurrentQuestion(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreEmoji = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 70) return "😊";
    if (percentage >= 60) return "👍";
    return "💪";
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
        <div className="max-w-6xl mx-auto mt-25">
          <QuizHeader selectedLevel={selectedLevel} selectedType={selectedType} resetQuiz={resetQuiz} quizStarted={quizStarted} />
          
          <LevelSelection selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
          
          <QuizTypeSelection selectedType={selectedType} setSelectedType={setSelectedType} />

          <div className="text-center">
            <button
              onClick={startQuiz}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              <Play className="w-6 h-6" />
              Start Quiz Journey
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500/30 border-t-purple-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-300">Preparing your quiz questions...</p>
          <p className="text-purple-400 text-sm mt-2">Get ready to test your kanji knowledge! 🎯</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6 pt-10">
        <div className="max-w-4xl mt-10 mx-auto">
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 rounded-2xl p-8 backdrop-blur-sm mt-10">
            <ResultsSummary score={score} quiz={quiz} getScoreColor={getScoreColor} getScoreEmoji={getScoreEmoji} />
            
            <AnswerReview quiz={quiz} answers={answers} />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setShowResults(false);
                  fetchQuiz();
                }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={resetQuiz}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                New Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto mt-20">
        <QuizHeader selectedLevel={selectedLevel} selectedType={selectedType} resetQuiz={resetQuiz} quizStarted={quizStarted} />
        
        <QuizProgress answers={answers} quiz={quiz} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <QuestionNavigation 
              quiz={quiz} 
              currentQuestion={currentQuestion} 
              setCurrentQuestion={setCurrentQuestion} 
              answers={answers} 
            />
            
            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" />
                Quiz Progress
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Answered</span>
                  <span className="text-purple-400 font-medium">{Object.keys(answers).length}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Remaining</span>
                  <span className="text-pink-400 font-medium">{quiz.length - Object.keys(answers).length}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Level</span>
                  <span className="text-cyan-400 font-medium">{selectedLevel}</span>
                </div>
              </div>
            </div>
          </div>

          <QuestionDisplay 
            quiz={quiz} 
            currentQuestion={currentQuestion} 
            answers={answers} 
            handleSelect={handleSelect} 
            animateText={animateText} 
          />
        </div>

        {Object.keys(answers).length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.length}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                Object.keys(answers).length === quiz.length
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Trophy className="w-6 h-6" />
              {Object.keys(answers).length === quiz.length 
                ? "Submit Quiz" 
                : `Answer ${quiz.length - Object.keys(answers).length} more questions`
              }
              {Object.keys(answers).length === quiz.length && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;