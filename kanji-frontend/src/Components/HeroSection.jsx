import { Link } from 'react-router-dom';
import { Sparkles, Star, Zap, BookOpen, Play, Brain } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative z-10 mt-20 text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-white/80 text-sm font-medium">Next-Gen Learning Experience</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black  text-transparent mb-6 tracking-tight bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          漢字<span className="text-5xl md:text-6xl"> MASTERY</span>
        </h1>
        
        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Unlock the secrets of Japanese characters with our revolutionary learning platform
        </p>
        
        <div className="flex items-center justify-center gap-8 text-white/60 mb-12">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span>2000+ Kanji</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Interactive Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>JLPT Ready</span>
          </div>
        </div>                                                                                       

        <div className="flex gap-4 justify-center">
          <Link
            to="/resources"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 text-lg rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            Start Learning
          </Link>
          <Link to="/quiz"
            className="border border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl font-semibold bg-transparent flex items-center gap-2 hover:scale-105 transition-all duration-300">
            <Brain className="w-5 h-5" />
            Take Quiz
          </Link>
    
        </div>
      </div>
    </div>
  );
};

export default HeroSection;