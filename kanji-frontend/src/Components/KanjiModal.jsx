import React, { useState } from "react";
import KanjiStrokeOrder from "./KanjiStrokeOrder";

export default function KanjiModal({ kanji, isOpen, onClose }) {
  const [replayKey, setReplayKey] = useState(0);

  if (!isOpen) return null;

  const handleReplay = () => {
    setReplayKey(prev => prev + 1);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-2"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br relative rounded-2xl sm:rounded-3xl 
      p-4 sm:p-8 max-w-lg w-full mx-auto shadow-2xl border
      bg-white/10 backdrop-blur-sm mb-6 border-white/10 
      overflow-y-auto max-h-[90vh] sm:max-h-[85vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-6xl font-light text-white mb-3 sm:mb-4 tracking-wide">
            {kanji.char}
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-1 sm:mb-2">
            {kanji.meaning}
          </h2>
          {kanji.reading && (
            <p className="text-gray-400 text-base sm:text-lg">
              {kanji.reading}
            </p>
          )}
        </div>

        {/* Stroke Order Animation */}
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/10">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg">
              <KanjiStrokeOrder key={replayKey} kanji={kanji.char} />
            </div>
          </div>
          
          {/* Replay Button */}
          <div className="text-center">
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Replay
            </button>
          </div>
        </div>

        {/* Additional Info */}
        {(kanji.strokes || kanji.grade || kanji.jlpt) && (
          <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {kanji.strokes && (
              <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-purple-400 text-xs sm:text-sm font-medium">Strokes</div>
                <div className="text-white text-lg sm:text-xl font-bold">{kanji.strokes}</div>
              </div>
            )}
            {kanji.grade && (
              <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-blue-400 text-xs sm:text-sm font-medium">Grade</div>
                <div className="text-white text-lg sm:text-xl font-bold">{kanji.grade}</div>
              </div>
            )}
            {kanji.jlpt && (
              <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="text-green-400 text-xs sm:text-sm font-medium">JLPT</div>
                <div className="text-white text-lg sm:text-xl font-bold">N{kanji.jlpt}</div>
              </div>
            )}
          </div>
        )}

        {/* Usage Examples */}
        {kanji.examples && kanji.examples.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-2 sm:mb-3">Examples</h3>
            <div className="space-y-2">
              {kanji.examples.slice(0, 3).map((example, index) => (
                <div key={index} className="bg-slate-800/30 rounded-lg p-2 sm:p-3 flex justify-between items-center">
                  <span className="text-white font-medium text-base sm:text-lg">{example.word}</span>
                  <span className="text-gray-400 text-sm sm:text-base">{example.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}