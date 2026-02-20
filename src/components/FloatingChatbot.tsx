import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Message {
    id: string;
    type: 'bot' | 'user';
    content: string;
    timestamp: Date;
    suggestions?: string[];
}

const FloatingChatbot: React.FC = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: `Hey ${user?.name?.split(' ')[0] || 'there'}! 👋 Main hoon tumhara AI Career Mentor. Kuch bhi poochho — career, exams, colleges, ya life advice. I'm here for you!`,
            timestamp: new Date(),
            suggestions: ['Best career for me?', 'JEE vs NEET?', 'How to improve marks?']
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (text?: string) => {
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
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    message: messageText,
                    conversationHistory: messages.slice(-6).map(m => ({ type: m.type, content: m.content })),
                    userProfile: user?.profile || {}
                })
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: data.reply || "Hmm, let me think about that... Could you rephrase? 🤔",
                timestamp: new Date(),
                suggestions: data.suggestions || ['Tell me more', 'Career options?', 'Best colleges?']
            };

            setMessages(prev => [...prev, botMessage]);
        } catch {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: "Oops! Network issue lag raha hai 😅 Please check if the server is running and try again.",
                timestamp: new Date(),
                suggestions: ['Try again', 'Career guidance', 'Best colleges?']
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-sky-500/30 group"
                    >
                        <MessageSquare className="w-6 h-6 text-white" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
                        style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)' }}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between bg-white/5 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-500/30">
                                    <Bot className="text-sky-400 w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">AI Career Mentor</h4>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Powered by Gemini</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                <X className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] space-y-2 ${msg.type === 'user' ? 'order-2' : ''}`}>
                                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                                ? 'bg-sky-500 text-white'
                                                : 'bg-white/5 border border-white/5 text-slate-200'
                                            }`}>
                                            {msg.content}
                                        </div>
                                        {msg.suggestions && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {msg.suggestions.map((s, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleSend(s)}
                                                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all"
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-white/5 bg-white/5">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything about career..."
                                    className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isTyping}
                                    className="p-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-2 flex items-center justify-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase">
                                <Sparkles className="w-2.5 h-2.5 text-sky-400" />
                                AI-powered • Hinglish mode
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingChatbot;
