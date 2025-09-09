import { useEffect, useState } from "react";
import { BookOpen, Brain, Zap, Trophy, RotateCcw, Play, CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react";

const quizTypes = [
  { 
    id: "meaning", 
    label: "Meaning Quiz", 
    description: "Identify kanji meanings",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    id: "onyomi", 
    label: "Onyomi Quiz", 
    description: "Chinese readings",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    id: "kunyomi", 
    label: "Kunyomi Quiz", 
    description: "Japanese readings",
    icon: Zap,
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    id: "reverse", 
    label: "Reverse Quiz", 
    description: "Meaning to kanji",
    icon: RotateCcw,
    gradient: "from-orange-500 to-red-500"
  },
  { 
    id: "mixed", 
    label: "Mixed Quiz", 
    description: "All question types",
    icon: Trophy,
    gradient: "from-indigo-500 to-purple-500"
  },
];

const levels = [
  { 
    id: "N5", 
    label: "N5", 
    description: "Beginner Level", 
    gradient: "from-green-500 to-emerald-500",
    difficulty: "Easy"
  },
  { 
    id: "N4", 
    label: "N4", 
    description: "Elementary Level", 
    gradient: "from-blue-500 to-cyan-500",
    difficulty: "Medium"
  },
  { 
    id: "N3", 
    label: "N3", 
    description: "Intermediate Level", 
    gradient: "from-purple-500 to-pink-500",
    difficulty: "Hard"
  },
];

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
          {/* Header */}
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

          {/* Level Selection */}
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

          {/* Quiz Type Selection */}
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
        <div className="max-w-4xl mt-20 mx-auto">
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 rounded-2xl p-8 backdrop-blur-sm">
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

            {/* Detailed Results */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-400" />
                Review Your Answers
              </h3>
              <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                {quiz.map((q, i) => {
                  const isCorrect = answers[i] === q.answer;
                  return (
                    <div key={i} className={`p-6 rounded-xl border backdrop-blur-sm ${
                      isCorrect 
                        ? 'bg-green-500/10 border-green-400/30' 
                        : 'bg-red-500/10 border-red-400/30'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isCorrect ? <CheckCircle className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white mb-2">{q.question}</p>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="text-gray-400">Your answer:</span> 
                              <span className={`ml-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                {answers[i] || "Not answered"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm">
                                <span className="text-gray-400">Correct answer:</span> 
                                <span className="text-green-400 ml-2">{q.answer}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

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
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                漢字 Quiz - {selectedLevel}
              </h1>
              <p className="text-purple-300">
                {quizTypes.find(t => t.id === selectedType)?.label}
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
          
          {/* Progress Bar */}
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Question {currentQuestion + 1}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestion === quiz.length - 1}
                    className="p-2 rounded-lg bg-purple-600/50 text-purple-200 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Grid Overview */}
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

            {/* Stats Card */}
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

          {/* Current Question */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-400/20 rounded-2xl p-8 backdrop-blur-sm">
              {quiz[currentQuestion] && (
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
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
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