import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Languages, Info, ExternalLink } from 'lucide-react';


interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIMentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hey Alex! I'm your AI Career Mentor. I've analyzed your profile and I see you have a 89% affinity for Data Science. Want to understand what a day in the life of a Data Scientist looks like, or have other questions?",
      timestamp: new Date(),
      suggestions: ["Day in life of Data Scientist", "PCM vs Commerce for AI", "Top colleges for CS", "Scholarships available"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "That's a great question! For a Data Scientist path, choosing PCM (Physics, Chemistry, Maths) in Class 11 is highly recommended. It builds the logical foundation you'll need for algorithms later. Your current score in Math (94/100) shows you're already on the right track! Shall we look at a Roadmap for this?",
        timestamp: new Date(),
        suggestions: ["Show PCM Roadmap", "What about Statistics?", "Alternative paths"]
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] glass-card rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-500/30">
            <Bot className="text-sky-400 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">EduPath AI Mentor</h3>
            <div className="flex items-center gap-1.5 ">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Online | Hinglish Mode Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors" title="Change Language">
            <Languages className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.type === 'user' ? 'bg-indigo-500' : 'bg-slate-800 border border-white/10'
              }`}>
                {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-sky-400" />}
              </div>
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/10' 
                    : 'bg-white/5 border border-white/5 text-slate-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setInput(suggestion);
                          // We don't auto-send for demo sake, but we could
                        }}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all uppercase tracking-wider"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                <Bot className="w-4 h-4 text-sky-400" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-white/5">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your career..."
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all pr-12"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-2 p-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all disabled:opacity-50"
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
            <Sparkles className="w-3 h-3 text-sky-400" />
            AI Guidance
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
            <ExternalLink className="w-3 h-3 text-sky-400" />
            Source Verified
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
