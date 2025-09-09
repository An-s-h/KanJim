import { Link } from 'react-router-dom';

const jlptLevels = [
  { 
    level: 'N5', 
    count: 103, 
    gradient: 'from-emerald-400 via-green-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-green-100',
    description: 'Your kanji journey begins',
    difficulty: 'Beginner'
  },
  { 
    level: 'N4', 
    count: 181, 
    gradient: 'from-blue-400 via-cyan-500 to-sky-600',
    bgGradient: 'from-blue-50 to-cyan-100',
    description: 'Building foundations',
    difficulty: 'Elementary'
  },
  { 
    level: 'N3', 
    count: 367, 
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    bgGradient: 'from-amber-50 to-yellow-100',
    description: 'Expanding horizons',
    difficulty: 'Intermediate'
  },
  { 
    level: 'N2', 
    count: 367, 
    gradient: 'from-orange-400 via-red-500 to-pink-500',
    bgGradient: 'from-orange-50 to-red-100',
    description: 'Advanced mastery',
    difficulty: 'Upper-Int'
  },
  { 
    level: 'N1', 
    count: 1026, 
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    bgGradient: 'from-purple-50 to-indigo-100',
    description: 'Master level achieved',
    difficulty: 'Expert'
  }
];

const JLPTLevelsSection = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Master by Level</h2>
        <p className="text-white/60 text-lg">Choose your path to fluency</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {jlptLevels.map((level, index) => (
          <Link
            key={level.level}
            to={`/learn/${level.level}`}
            className="group relative cursor-pointer"
          >
            <div className={`relative bg-gradient-to-br ${level.bgGradient} backdrop-blur-xl border border-white/20 rounded-2xl p-8 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden`}>
              {/* Progress bar at bottom */}
            
              
              {/* Floating number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center text-xs font-bold text-white/80 backdrop-blur-sm border border-white/20">
                {index + 1}
              </div>
              
              <div className="relative text-center">
                <div className={`inline-block text-4xl font-black bg-gradient-to-r ${level.gradient} bg-clip-text text-transparent mb-3`}>
                  {level.level}
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{level.count}</div>
                <div className="text-sm font-medium text-gray-600 mb-1">{level.difficulty}</div>
                <div className="text-xs text-gray-500 mb-3">{level.description}</div>
               
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JLPTLevelsSection;