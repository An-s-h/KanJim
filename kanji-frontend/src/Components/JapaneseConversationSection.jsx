import React, { useState, useEffect } from 'react';
import { Play, Volume2, User, Bot } from 'lucide-react';

const JapaneseConversationSection = () => {
  const [activeConversation, setActiveConversation] = useState(0);
  const [animateText, setAnimateText] = useState(false);

  const conversations = [
    {
      title: "Meeting Someone New",
      subtitle: "初めまして",
      messages: [
        {
          speaker: "person",
          japanese: "こんにちは。田中です。",
          romaji: "Konnichiwa. Tanaka desu.",
          english: "Hello. I'm Tanaka.",
          kanji: ["田", "中"]
        },
        {
          speaker: "bot",
          japanese: "初めまして。山田と申します。",
          romaji: "Hajimemashite. Yamada to mōshimasu.",
          english: "Nice to meet you. My name is Yamada.",
          kanji: ["初", "山", "田", "申"]
        },
        {
          speaker: "person",
          japanese: "よろしくお願いします。",
          romaji: "Yoroshiku onegaishimasu.",
          english: "Please treat me favorably.",
          kanji: ["願"]
        }
      ]
    },
    {
      title: "At a Restaurant",
      subtitle: "レストランで",
      messages: [
        {
          speaker: "bot",
          japanese: "何をご注文しますか？",
          romaji: "Nani wo go-chūmon shimasu ka?",
          english: "What would you like to order?",
          kanji: ["何", "注", "文"]
        },
        {
          speaker: "person",
          japanese: "寿司をお願いします。",
          romaji: "Sushi wo onegaishimasu.",
          english: "Sushi, please.",
          kanji: ["寿", "司", "願"]
        },
        {
          speaker: "bot",
          japanese: "飲み物はいかがですか？",
          romaji: "Nomimono wa ikaga desu ka?",
          english: "How about drinks?",
          kanji: ["飲", "物"]
        }
      ]
    },
    {
      title: "Asking for Directions",
      subtitle: "道を聞く",
      messages: [
        {
          speaker: "person",
          japanese: "駅はどこですか？",
          romaji: "Eki wa doko desu ka?",
          english: "Where is the station?",
          kanji: ["駅"]
        },
        {
          speaker: "bot",
          japanese: "まっすぐ行って、右に曲がってください。",
          romaji: "Massugu itte, migi ni magatte kudasai.",
          english: "Go straight and turn right.",
          kanji: ["行", "右", "曲"]
        },
        {
          speaker: "person",
          japanese: "ありがとうございます。",
          romaji: "Arigatō gozaimasu.",
          english: "Thank you very much.",
          kanji: []
        }
      ]
    }
  ];

  useEffect(() => {
    setAnimateText(true);
    const timer = setTimeout(() => setAnimateText(false), 600);
    return () => clearTimeout(timer);
  }, [activeConversation]);

  const KanjiHighlight = ({ kanji }) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {kanji.map((char, index) => (
        <span 
          key={index}
          className="inline-flex items-center justify-center w-8 h-8 bg-purple-500/20 border border-purple-400/30 rounded text-purple-200 font-medium text-sm hover:bg-purple-500/30 transition-colors cursor-pointer"
        >
          {char}
        </span>
      ))}
    </div>
  );

  const MessageBubble = ({ message, index }) => {
    const isPerson = message.speaker === 'person';
    
    return (
      <div 
        className={`flex gap-3 mb-6 ${isPerson ? 'justify-end' : 'justify-start'} 
        ${animateText ? 'animate-pulse' : ''}`}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        {!isPerson && (
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
        )}
        
        <div className={`max-w-md ${isPerson ? 'order-first' : ''}`}>
          <div 
            className={`p-4 rounded-2xl ${
              isPerson 
                ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-400/30' 
                : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30'
            } backdrop-blur-sm`}
          >
            <div className="text-white font-medium text-lg mb-1">
              {message.japanese}
            </div>
            <div className="text-gray-300 text-sm italic mb-2">
              {message.romaji}
            </div>
            <div className="text-gray-400 text-sm">
              {message.english}
            </div>
            {message.kanji.length > 0 && <KanjiHighlight kanji={message.kanji} />}
          </div>
        </div>

        {isPerson && (
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
        
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real-World <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">日本語</span> Conversations
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Practice authentic Japanese conversations and master kanji in context. Each dialogue includes key characters and pronunciation guides.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conversation Tabs */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {conversations.map((conv, index) => (
                <button
                  key={index}
                  onClick={() => setActiveConversation(index)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    activeConversation === index
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50 shadow-lg shadow-purple-500/25'
                      : 'bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20 hover:border-purple-400/40'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      activeConversation === index ? 'bg-purple-400' : 'bg-gray-500'
                    }`} />
                    <h3 className="text-white font-medium">{conv.title}</h3>
                  </div>
                  <p className="text-purple-300 text-sm">{conv.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 rounded-xl backdrop-blur-sm">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <Play size={16} className="text-purple-400" />
                Learning Features
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Interactive Audio</span>
                  <span className="text-purple-400">✓</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Kanji Breakdown</span>
                  <span className="text-purple-400">✓</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Pronunciation Guide</span>
                  <span className="text-purple-400">✓</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Context Translation</span>
                  <span className="text-purple-400">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Display */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-400/20 rounded-2xl p-8 backdrop-blur-sm min-h-[600px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {conversations[activeConversation].title}
                  </h3>
                  <p className="text-purple-300 text-lg">
                    {conversations[activeConversation].subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {conversations[activeConversation].messages.map((message, index) => (
                  <MessageBubble key={index} message={message} index={index} />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default JapaneseConversationSection;