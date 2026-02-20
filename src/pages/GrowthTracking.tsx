import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Plus, Trash2, BookOpen, ExternalLink, Trophy, Star, Target, Award, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface GrowthEntry {
    id: string;
    date: string;
    skill: string;
    level: number; // 0-100
    notes: string;
}

const SKILL_OPTIONS = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'Communication', 'Problem Solving', 'Coding', 'Design',
    'Leadership', 'Critical Thinking', 'Research', 'Creative Writing', 'Economics',
];

const resources = [
    { name: 'NPTEL', desc: 'Free IIT lectures', url: 'https://nptel.ac.in' },
    { name: 'Khan Academy', desc: 'Math, Science, Economics', url: 'https://khanacademy.org' },
    { name: 'CS50 Harvard', desc: 'Best CS intro course', url: 'https://cs50.harvard.edu' },
    { name: 'Skill India', desc: 'Government skill portal', url: 'https://skillindia.gov.in' },
];

const STORAGE_KEY = 'careercube_growth_entries';

const GrowthTracking: React.FC = () => {
    const navigate = useNavigate();
    const [entries, setEntries] = useState<GrowthEntry[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ skill: SKILL_OPTIONS[0], level: 50, notes: '' });
    const [activeTab, setActiveTab] = useState<'chart' | 'log'>('chart');

    // Load from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setEntries(JSON.parse(stored));
        } catch { /* ignore */ }
    }, []);

    const save = (updated: GrowthEntry[]) => {
        setEntries(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const addEntry = () => {
        if (!form.skill) return;
        const entry: GrowthEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
            skill: form.skill,
            level: form.level,
            notes: form.notes,
        };
        save([...entries, entry]);
        setForm({ skill: SKILL_OPTIONS[0], level: 50, notes: '' });
        setShowForm(false);
    };

    const removeEntry = (id: string) => {
        save(entries.filter(e => e.id !== id));
    };

    // Build chart data — group by date, pick latest level per skill per date
    const chartData = (() => {
        const dateMap: Record<string, Record<string, number>> = {};
        entries.forEach(e => {
            if (!dateMap[e.date]) dateMap[e.date] = {};
            dateMap[e.date][e.skill] = e.level;
        });
        return Object.entries(dateMap).map(([date, skills]) => ({ date, ...skills }));
    })();

    // Unique skills logged
    const uniqueSkills = [...new Set(entries.map(e => e.skill))];

    // Bar chart: latest level per skill
    const latestLevels = uniqueSkills.map(skill => {
        const relevant = entries.filter(e => e.skill === skill);
        const latest = relevant[relevant.length - 1];
        return { skill: skill.length > 10 ? skill.slice(0, 10) + '…' : skill, level: latest?.level ?? 0 };
    });

    const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

    const badges = [
        { name: 'First Entry', desc: 'Logged your first growth', icon: Star, earned: entries.length >= 1 },
        { name: 'Consistent', desc: 'Logged 5+ entries', icon: Trophy, earned: entries.length >= 5 },
        { name: 'Multi-Skill', desc: 'Tracked 3+ skills', icon: Target, earned: uniqueSkills.length >= 3 },
        { name: 'Expert Mode', desc: 'Reached 80+ on any skill', icon: Award, earned: entries.some(e => e.level >= 80) },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800">Growth Tracker</h1>
                        <p className="text-sm text-slate-500">Log and visualize your real skill progress</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg hover:shadow-indigo-200 transition-all"
                >
                    <Plus className="w-4 h-4" /> Log Progress
                </motion.button>
            </div>

            {/* Add Entry Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
                        >
                            <h2 className="text-xl font-extrabold text-slate-800 mb-6">📈 Log Your Growth</h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Skill / Subject</label>
                                    <select
                                        value={form.skill}
                                        onChange={e => setForm(f => ({ ...f, skill: e.target.value }))}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-400"
                                    >
                                        {SKILL_OPTIONS.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                                        Current Level: <span className="text-indigo-600">{form.level}%</span>
                                    </label>
                                    <input
                                        type="range" min="0" max="100" step="5"
                                        value={form.level}
                                        onChange={e => setForm(f => ({ ...f, level: Number(e.target.value) }))}
                                        className="w-full accent-indigo-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1 font-semibold">
                                        <span>Beginner (0)</span><span>Expert (100)</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Notes (optional)</label>
                                    <textarea
                                        value={form.notes}
                                        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                                        placeholder="What did you learn today? Any milestones?"
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-indigo-400 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50"
                                >Cancel</button>
                                <button
                                    onClick={addEntry}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-bold text-sm hover:opacity-90"
                                >Save Entry</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Entries', value: entries.length, color: 'indigo' },
                    { label: 'Skills Tracked', value: uniqueSkills.length, color: 'teal' },
                    { label: 'Best Level', value: entries.length ? Math.max(...entries.map(e => e.level)) + '%' : '—', color: 'emerald' },
                    { label: 'Latest Entry', value: entries.length ? entries[entries.length - 1].date : '—', color: 'amber' },
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="card p-5 text-center">
                        <p className={`text-2xl font-black text-${stat.color}-500`}>{stat.value}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 bg-slate-100 rounded-xl p-1 w-fit">
                {(['chart', 'log'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all capitalize ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab === 'chart' ? '📊 Charts' : '📋 Entry Log'}
                    </button>
                ))}
            </div>

            {activeTab === 'chart' && (
                <div className="space-y-6">
                    {entries.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="card p-16 text-center">
                            <TrendingUp className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-400">No data yet</h3>
                            <p className="text-sm text-slate-400 mt-1">Click "Log Progress" to start tracking your real growth!</p>
                            <button onClick={() => setShowForm(true)}
                                className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-2xl font-bold text-sm">
                                + Add First Entry
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Area Chart - Growth Over Time */}
                            <div className="card p-6 lg:col-span-2">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Skill Growth Over Time</h3>
                                <ResponsiveContainer width="100%" height={260}>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            {uniqueSkills.map((skill, i) => (
                                                <linearGradient key={skill} id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.2} />
                                                    <stop offset="100%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
                                                </linearGradient>
                                            ))}
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                                        <Legend />
                                        {uniqueSkills.map((skill, i) => (
                                            <Area key={skill} type="monotone" dataKey={skill}
                                                stroke={COLORS[i % COLORS.length]} strokeWidth={2.5}
                                                fill={`url(#grad${i})`} connectNulls />
                                        ))}
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Bar Chart - Current Levels */}
                            <div className="card p-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Current Skill Levels</h3>
                                <ResponsiveContainer width="100%" height={220}>
                                    <BarChart data={latestLevels} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                                        <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <YAxis type="category" dataKey="skill" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                                        <Tooltip formatter={(v) => [`${v}%`, 'Level']} />
                                        <Bar dataKey="level" radius={[0, 6, 6, 0]} fill="url(#barGrad)" />
                                        <defs>
                                            <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#6366f1" />
                                                <stop offset="100%" stopColor="#14b8a6" />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Badges */}
                            <div className="card p-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">🏅 Achievements</h3>
                                <div className="space-y-3">
                                    {badges.map((badge, i) => (
                                        <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${badge.earned ? 'bg-indigo-50' : 'bg-slate-50 opacity-50'}`}>
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${badge.earned ? 'bg-indigo-100' : 'bg-slate-200'}`}>
                                                {badge.earned ? <CheckCircle className="w-5 h-5 text-indigo-500" /> : <badge.icon className="w-5 h-5 text-slate-400" />}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${badge.earned ? 'text-slate-700' : 'text-slate-400'}`}>{badge.name}</p>
                                                <p className="text-xs text-slate-400">{badge.desc}</p>
                                            </div>
                                            {badge.earned && <span className="ml-auto text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">✓ Earned</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'log' && (
                <div className="space-y-4">
                    {entries.length === 0 ? (
                        <div className="card p-12 text-center">
                            <p className="text-slate-400 font-semibold">No entries yet. Start logging your progress!</p>
                        </div>
                    ) : (
                        [...entries].reverse().map((entry, i) => (
                            <motion.div key={entry.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                className="card p-5 flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h4 className="font-bold text-slate-700 text-sm">{entry.skill}</h4>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{entry.level}%</span>
                                        <span className="text-xs text-slate-400">{entry.date}</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${entry.level}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-500"
                                        />
                                    </div>
                                    {entry.notes && <p className="text-xs text-slate-400 mt-2 italic">"{entry.notes}"</p>}
                                </div>
                                <button onClick={() => removeEntry(entry.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg text-red-400">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
            )}

            {/* Learning Resources */}
            <div className="card p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-500" /> Free Learning Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {resources.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                            className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
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
