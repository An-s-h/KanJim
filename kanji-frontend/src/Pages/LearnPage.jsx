import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LearnPage() {
  const { level } = useParams(); // dynamically get level from URL
  const [kanjis, setKanjis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!level) return;

    const fetchKanjis = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/kanji/${level}`);
        setKanjis(res.data.kanjis); // adjust key depending on backend response
      } catch (err) {
        console.error("Error fetching kanji:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKanjis();
  }, [level]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-xl text-white font-medium">Loading {level} kanji...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <div className="">
    <div className="pt-10"></div>
        <div className="relative px-6 pt-20 pb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            JLPT <span className="text-purple-400">{level}</span> Kanji
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master {kanjis.length} essential kanji characters for your Japanese proficiency journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">{kanjis.length} Characters</h2>
                <p className="text-gray-400">Ready to learn</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center px-4">
                  <div className="text-2xl font-bold text-purple-400">{level}</div>
                  <div className="text-xs text-gray-400">Level</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold text-blue-400">漢字</div>
                  <div className="text-xs text-gray-400">Kanji</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kanji Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {kanjis.map((k, index) => (
              <div
                key={k.char}
                className="relative group bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10 hover:bg-white/15 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fadeInUp"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="text-center mb-4">
                  <div className="text-6xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 mb-2">
                    {k.char}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-purple-300 capitalize">
                    {k.meaning}
                  </h3>
                </div>

                <div className="space-y-3">
                  {k.onyomi?.length > 0 && (
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-xs font-semibold text-blue-400 mb-1">
                        音読み (On'yomi)
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        {k.onyomi.join(" • ")}
                      </div>
                    </div>
                  )}
                  {k.kunyomi?.length > 0 && (
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-xs font-semibold text-green-400 mb-1">
                        訓読み (Kun'yomi)
                      </div>
                      <div className="text-sm text-gray-300 font-medium">
                        {k.kunyomi.join(" • ")}
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {kanjis.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">漢</div>
              <h3 className="text-2xl font-bold text-white mb-2">No kanji found</h3>
              <p className="text-gray-400">Try selecting a different JLPT level</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
