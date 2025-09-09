import { Link } from 'react-router-dom';
import { ChevronRight, Leaf, Home, Utensils, Car, Heart, Clock, Sun, Mountain } from 'lucide-react';

const categories = [
  { 
    name: 'Nature Elements', 
    icon: Leaf, 
    count: 85, 
    gradient: 'from-green-400 to-emerald-600',
    items: ['山 (yama)', '川 (kawa)', '木 (ki)', '花 (hana)', '雨 (ame)', '雪 (yuki)']
  },
  { 
    name: 'Daily Life', 
    icon: Home, 
    count: 120, 
    gradient: 'from-blue-400 to-indigo-600',
    items: ['家 (ie)', '食 (shoku)', '買 (kai)', '見 (mi)', '行 (iku)', '来 (kuru)']
  },
  { 
    name: 'Food & Drinks', 
    icon: Utensils, 
    count: 67, 
    gradient: 'from-orange-400 to-red-600',
    items: ['食 (shoku)', '飲 (nomu)', '米 (kome)', '肉 (niku)', '魚 (sakana)', '茶 (cha)']
  },
  { 
    name: 'Transportation', 
    icon: Car, 
    count: 45, 
    gradient: 'from-cyan-400 to-blue-600',
    items: ['車 (kuruma)', '電車 (densha)', '船 (fune)', '飛 (tobu)', '道 (michi)', '駅 (eki)']
  },
  { 
    name: 'Body & Health', 
    icon: Heart, 
    count: 78, 
    gradient: 'from-pink-400 to-rose-600',
    items: ['体 (karada)', '心 (kokoro)', '手 (te)', '足 (ashi)', '頭 (atama)', '目 (me)']
  },
  { 
    name: 'Time & Calendar', 
    icon: Clock, 
    count: 52, 
    gradient: 'from-violet-400 to-purple-600',
    items: ['時 (toki)', '日 (hi)', '月 (tsuki)', '年 (toshi)', '今 (ima)', '昨 (kinou)']
  },
  { 
    name: 'Weather', 
    icon: Sun, 
    count: 34, 
    gradient: 'from-yellow-400 to-amber-600',
    items: ['天 (ten)', '雨 (ame)', '雪 (yuki)', '風 (kaze)', '雲 (kumo)', '晴 (hare)']
  },
  { 
    name: 'Geography', 
    icon: Mountain, 
    count: 56, 
    gradient: 'from-slate-400 to-gray-700',
    items: ['国 (kuni)', '地 (chi)', '海 (umi)', '島 (shima)', '川 (kawa)', '山 (yama)']
  }
];

const CategoriesSection = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Explore by Theme</h2>
        <p className="text-white/60 text-lg">Discover kanji through meaningful contexts</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              to="/learn"
              className="group relative cursor-pointer"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 overflow-hidden h-full">
                {/* Icon with glow effect */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-2xl`}>
                    <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
                
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{category.count} characters</p>
                  
                  {/* Static preview of kanji */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4">
                    <p className="text-white/80 text-sm font-medium mb-3">Featured Kanji:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.slice(0, 4).map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-white/20 backdrop-blur-sm p-2 rounded-lg text-center border border-white/20">
                          <div className="text-white text-xs font-medium">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${category.gradient} text-white rounded-full font-semibold text-sm hover:scale-105 transition-transform cursor-pointer shadow-lg`}>
                      <span>Explore Category</span>
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;