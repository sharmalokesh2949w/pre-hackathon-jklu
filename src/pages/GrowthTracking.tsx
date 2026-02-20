import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Award, BookOpen, Calendar, ExternalLink, Trophy, Star, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyProgress = [
    { week: 'W1', skills: 20 }, { week: 'W2', skills: 35 },
    { week: 'W3', skills: 45 }, { week: 'W4', skills: 52 },
    { week: 'W5', skills: 63 }, { week: 'W6', skills: 71 },
    { week: 'W7', skills: 78 }, { week: 'W8', skills: 85 },
];

const badges = [
    { name: 'First Steps', desc: 'Completed onboarding', icon: Star, earned: true },
    { name: 'Explorer', desc: 'Tried 3 career paths', icon: Target, earned: true },
    { name: 'Consistent', desc: '7-day streak', icon: Trophy, earned: false },
    { name: 'Deep Diver', desc: 'Completed all assessments', icon: Award, earned: false },
];

const timeline = [
    { label: 'Class 8-9', title: 'Explore Interests', desc: 'Try coding, art, science experiments', done: true },
    { label: 'Class 10', title: 'Stream Selection', desc: 'Choose PCM/PCB/Commerce/Arts based on aptitude', done: true },
    { label: 'Class 11-12', title: 'Deep Preparation', desc: 'JEE/NEET/CLAT prep + build portfolio', done: false },
    { label: 'After 12th', title: 'College & Career', desc: 'Entrance exams → Top colleges → Internships', done: false },
];

const resources = [
    { name: 'NPTEL', desc: 'Free IIT lectures', url: 'https://nptel.ac.in' },
    { name: 'Khan Academy', desc: 'Math, Science, Economics', url: 'https://khanacademy.org' },
    { name: 'CS50 Harvard', desc: 'Best CS intro course', url: 'https://cs50.harvard.edu' },
    { name: 'Skill India', desc: 'Government skill portal', url: 'https://skillindia.gov.in' },
];

const GrowthTracking: React.FC = () => {
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">Growth Tracker</h1>
                    <p className="text-sm text-slate-500">Track your skill development and career readiness</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Skill Progress Chart */}
                <div className="card p-6 lg:col-span-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Weekly Skill Progress</h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={weeklyProgress}>
                            <defs>
                                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="skills" stroke="#6366f1" strokeWidth={2.5} fill="url(#progressGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Badges */}
                <div className="card p-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Badges</h3>
                    <div className="space-y-3">
                        {badges.map((badge, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${badge.earned ? 'bg-indigo-50' : 'bg-slate-50 opacity-50'}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${badge.earned ? 'bg-indigo-100' : 'bg-slate-200'}`}>
                                    <badge.icon className={`w-5 h-5 ${badge.earned ? 'text-indigo-500' : 'text-slate-400'}`} />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${badge.earned ? 'text-slate-700' : 'text-slate-400'}`}>{badge.name}</p>
                                    <p className="text-xs text-slate-400">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Career Timeline */}
            <div className="card p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Career Timeline</h3>
                <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                    <div className="space-y-8">
                        {timeline.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex gap-4 relative">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 z-10 ${item.done ? 'bg-indigo-500' : 'bg-white border-2 border-slate-200'}`}>
                                    <Calendar className={`w-5 h-5 ${item.done ? 'text-white' : 'text-slate-400'}`} />
                                </div>
                                <div className="pb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.done ? 'text-indigo-500' : 'text-slate-400'}`}>{item.label}</span>
                                    <h4 className="font-bold text-slate-700 text-sm">{item.title}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Learning Resources */}
            <div className="card p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-500" /> Free Learning Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {resources.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-sm text-slate-700">{res.name}</h4>
                                <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-indigo-500" />
                            </div>
                            <p className="text-xs text-slate-400">{res.desc}</p>
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default GrowthTracking;
