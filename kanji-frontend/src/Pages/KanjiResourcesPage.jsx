import { Link } from 'react-router-dom';
import { Sparkles, Star, Zap, BookOpen, Play, Brain, ChevronRight } from 'lucide-react';
import HeroSection from '../Components/HeroSection';
import JLPTLevelsSection from '../Components/JLPTLevelsSection';
import CategoriesSection from '../Components/CategoriesSection';
import { useState } from 'react';
import Navbar from '../Components/Navbar';


  
const HomePage = () => {
  
 const [userProgress, setUserProgress] = useState({
    N5: 45,
    N4: 23,
    N3: 12,
    N2: 5,
    N1: 0,
  });
  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
         
      {/* Animated Background Elements */}


      <div className="relative z-10 mt-30 max-w-7xl mx-auto px-4 pb-20">
        <JLPTLevelsSection userProgress={userProgress} />
        <CategoriesSection />
      </div>
    </div>
    </>
  
  );
};

export default HomePage;