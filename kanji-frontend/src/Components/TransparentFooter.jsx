import React from 'react';

const TransparentFooter = () => {
  return (
    <footer className="relative px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism footer card */}
        <div className="relative group">
          {/* Animated background glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Main footer content */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6 shadow-2xl">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 pointer-events-none" />
            
            <div className="relative flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute left-0 w-12 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
              <div className="absolute right-0 w-12 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
              
              {/* Copyright text with enhanced styling */}
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-pulse" />
                <p className="text-gray-200/90 text-sm font-light tracking-wide">
                  © 2025 <span className="font-medium text-white">Kanzen</span>{' '}
                  <span className="text-purple-300 font-medium">日本語</span>
                  <span className="text-gray-300/70 ml-2">All rights reserved</span>
                </p>
                <div className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              </div>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute top-2 left-8 w-1 h-1 bg-purple-400/30 rounded-full animate-bounce" style={{animationDelay: '2s'}} />
            <div className="absolute bottom-2 right-12 w-1 h-1 bg-pink-400/30 rounded-full animate-bounce" style={{animationDelay: '3s'}} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TransparentFooter;