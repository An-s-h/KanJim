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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm  "
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br relative  rounded-3xl p-8 max-w-lg w-full mx-4   shadow-2xl border
      bg-white/10 backdrop-blur-sm  mb-8  border-white/10 
      ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl font-light text-white mb-4 tracking-wide">
            {kanji.char}
          </div>
          <h2 className="text-2xl font-semibold text-purple-300 mb-2">
            {kanji.meaning}
          </h2>
          {kanji.reading && (
            <p className="text-gray-400 text-lg">
              {kanji.reading}
            </p>
          )}
        </div>

        {/* Stroke Order Animation */}
        <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <KanjiStrokeOrder key={replayKey} kanji={kanji.char} />
            </div>
          </div>
          
          {/* Replay Button */}
          <div className="text-center">
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Replay
            </button>
          </div>
        </div>

        {/* Additional Info */}
        {(kanji.strokes || kanji.grade || kanji.jlpt) && (
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {kanji.strokes && (
              <div className="bg-slate-800/50 rounded-xl p-3">
                <div className="text-purple-400 text-sm font-medium">Strokes</div>
                <div className="text-white text-xl font-bold">{kanji.strokes}</div>
              </div>
            )}
            {kanji.grade && (
              <div className="bg-slate-800/50 rounded-xl p-3">
                <div className="text-blue-400 text-sm font-medium">Grade</div>
                <div className="text-white text-xl font-bold">{kanji.grade}</div>
              </div>
            )}
            {kanji.jlpt && (
              <div className="bg-slate-800/50 rounded-xl p-3">
                <div className="text-green-400 text-sm font-medium">JLPT</div>
                <div className="text-white text-xl font-bold">N{kanji.jlpt}</div>
              </div>
            )}
          </div>
        )}

        {/* Usage Examples */}
        {kanji.examples && kanji.examples.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Examples</h3>
            <div className="space-y-2">
              {kanji.examples.slice(0, 3).map((example, index) => (
                <div key={index} className="bg-slate-800/30 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-white font-medium text-lg">{example.word}</span>
                  <span className="text-gray-400">{example.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}