import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateMatchScore, generateExplanation } from '../utils/careerUtils';
import { CAREER_DATABASE } from '../utils/careerData';

const allInterests = ['technology', 'science', 'arts', 'business', 'social', 'healthcare', 'design', 'sports', 'law'];
const allAptitudes = ['analytical', 'creative', 'verbal', 'numerical', 'spatial', 'logical'];
const allSubjects = ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science', 'economics', 'english', 'history', 'psychology'];

const WhatIfSimulator: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const profile = user?.profile || {};

    const [interests, setInterests] = useState<string[]>(profile.interests || ['technology']);
    const [aptitudes, setAptitudes] = useState<string[]>(profile.aptitude || ['analytical']);
    const [subjects, setSubjects] = useState<string[]>(profile.subjects || ['mathematics']);

    const simulatedProfile = { interests, aptitude: aptitudes, subjects };

    const results = useMemo(() => {
        return CAREER_DATABASE
            .map(career => ({
                career,
                score: calculateMatchScore(career, simulatedProfile),
                explanation: generateExplanation(career, simulatedProfile)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }, [interests, aptitudes, subjects]);

    const toggleItem = (_list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        setList(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">What-If Simulator</h1>
                    <p className="text-sm text-slate-500">Toggle your traits and see how career recommendations change in real-time</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-6">
                    {[
                        { title: 'Interests', items: allInterests, selected: interests, setter: setInterests },
                        { title: 'Aptitudes', items: allAptitudes, selected: aptitudes, setter: setAptitudes },
                        { title: 'Subjects', items: allSubjects, selected: subjects, setter: setSubjects },
                    ].map((section) => (
                        <div key={section.title} className="card p-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{section.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {section.items.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => toggleItem(section.selected, section.setter, item)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${section.selected.includes(item)
                                            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200'
                                            : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-indigo-300'
                                            }`}
                                    >
                                        {section.selected.includes(item) ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
                                        {item.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" /> Live Career Predictions
                    </h3>
                    {results.map((match, i) => (
                        <motion.div key={match.career.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="card p-5">
                            <div className="flex items-center gap-4">
                                {/* Score Ring */}
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                                        <circle cx="30" cy="30" r="25" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                                        <motion.circle
                                            cx="30" cy="30" r="25"
                                            stroke="#6366f1" strokeWidth="4" fill="none" strokeLinecap="round"
                                            strokeDasharray={`${match.score * 1.57} ${157 - match.score * 1.57}`}
                                            initial={{ strokeDasharray: '0 157' }}
                                            animate={{ strokeDasharray: `${match.score * 1.57} ${157 - match.score * 1.57}` }}
                                            transition={{ duration: 0.8 }}
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-700">{match.score}%</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-700">{match.career.title}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{match.explanation.whySuitable.slice(0, 100)}...</p>
                                    <p className="text-xs text-indigo-500 font-semibold mt-2">{match.career.salaryRange.min} - {match.career.salaryRange.max}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default WhatIfSimulator;
