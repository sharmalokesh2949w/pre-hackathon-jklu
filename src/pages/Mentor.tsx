import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Sparkles, BrainCircuit, ArrowLeft, Lightbulb, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getSmartResponse } from '../utils/mentorResponses';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const scenarioCards = [
  { title: "I'm confused about my career", icon: BrainCircuit, color: 'indigo' },
  { title: "Parents want engineering but I love design", icon: Lightbulb, color: 'amber' },
  { title: "My marks are low, what can I do?", icon: Sparkles, color: 'teal' },
  { title: "Best colleges for CS in India?", icon: Shield, color: 'emerald' },
];

const Mentor: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hey ${user?.name?.split(' ')[0] || 'there'}! 👋 Main hoon tumhara AI Career Mentor. Kuch bhi poochho about careers, exams, colleges, stream selection, ya study tips. I'm here to help! 🎯`,
      timestamp: new Date(),
      suggestions: ['What career suits me?', 'JEE vs NEET?', 'Free learning resources']
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Get smart offline response
    setTimeout(() => {
      const { reply, suggestions } = getSmartResponse(messageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: reply,
        timestamp: new Date(),
        suggestions
      };
      setMessages(prev => [...prev, botMessage]);
    }, 600);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
              <Bot className="text-indigo-500 w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">AI Career Mentor</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Online • Smart Responses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Cards */}
      {messages.length <= 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {scenarioCards.map((card, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSend(card.title)}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 text-left transition-all group flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl bg-${card.color}-50`}>
                <card.icon className={`w-5 h-5 text-${card.color}-500`} />
              </div>
              <span className="font-bold text-sm text-slate-600 group-hover:text-slate-800">{card.title}</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-y-auto space-y-4 max-h-[60vh]">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[80%] space-y-2">
                <div className="flex items-start gap-3">
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-indigo-100">
                      <Bot className="w-4 h-4 text-indigo-500" />
                    </div>
                  )}
                  <div className={`p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-line ${msg.type === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-teal-500 text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-700'
                    }`}>
                    {msg.content}
                  </div>
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-teal-600" />
                    </div>
                  )}
                </div>
                {msg.suggestions && (
                  <div className={`flex flex-wrap gap-2 ${msg.type === 'bot' ? 'ml-11' : 'mr-11 justify-end'}`}>
                    {msg.suggestions.map((s, i) => (
                      <button key={i} onClick={() => handleSend(s)} className="px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-all">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about career, exams, colleges..."
            className="flex-1 bg-transparent text-sm focus:outline-none px-2 text-slate-700 placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          <Shield className="w-3 h-3" /> Smart Responses • Child-safe • Hinglish Mode
        </div>
      </div>
    </motion.div>
  );
};

export default Mentor;
