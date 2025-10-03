import { Link } from 'react-router-dom';
import { Sparkles, Star, Zap, BookOpen, Play, Brain } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="mt-16 sm:mt-20 text-center py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent mb-4 sm:mb-6 tracking-tight bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          漢字
          <span className="text-3xl sm:text-4xl md:text-6xl"> MASTERY</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Unlock the secrets of Japanese characters with our revolutionary learning platform
        </p>
        
        {/* Feature Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/60 mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
            <span className="text-sm sm:text-base">2000+ Kanji</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-sm sm:text-base">Interactive Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <span className="text-sm sm:text-base">JLPT Ready</span>
          </div>
        </div>                                                                                       

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/resources"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg rounded-lg sm:rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            Start Learning
          </Link>
          <Link 
            to="/quiz"
            className="border border-white/20 text-white hover:bg-white/10 px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg rounded-lg sm:rounded-xl font-semibold bg-transparent flex items-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
            Take Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
