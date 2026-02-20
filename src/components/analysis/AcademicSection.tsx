import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { GraduationCap, Plus, Trash2, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { COMMON_SUBJECTS } from '../../engine/academicEngine';
import type { SubjectYear, SubjectMark } from '../../types/analysis';

const LINE_COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#10b981', '#06b6d4', '#f97316', '#84cc16', '#64748b', '#0ea5e9', '#d946ef'];

const AcademicSection: React.FC = () => {
    const { state, setAcademics, runAcademicAnalysis } = useAnalysis();
    const { academics, academicResult } = state;

    const [localYears, setLocalYears] = useState<SubjectYear[]>(
        academics.length > 0
            ? academics
            : [
                { year: 1, label: 'Class 8', subjects: [{ subject: 'Mathematics', marks: 0 }, { subject: 'English', marks: 0 }] },
                { year: 2, label: 'Class 9', subjects: [{ subject: 'Mathematics', marks: 0 }, { subject: 'English', marks: 0 }] },
            ]
    );

    const updateYear = (yearIdx: number, patch: Partial<SubjectYear>) => {
        const updated = localYears.map((y, i) => (i === yearIdx ? { ...y, ...patch } : y));
        setLocalYears(updated);
    };

    const updateSubject = (yearIdx: number, subIdx: number, patch: Partial<SubjectMark>) => {
        const updated = [...localYears];
        const subs = [...updated[yearIdx].subjects];
        subs[subIdx] = { ...subs[subIdx], ...patch };
        updated[yearIdx] = { ...updated[yearIdx], subjects: subs };
        setLocalYears(updated);
    };

    const addSubject = (yearIdx: number) => {
        const updated = [...localYears];
        const existing = updated[yearIdx].subjects.map((s) => s.subject);
        const next = COMMON_SUBJECTS.find((s) => !existing.includes(s)) ?? 'New Subject';
        updated[yearIdx] = { ...updated[yearIdx], subjects: [...updated[yearIdx].subjects, { subject: next, marks: 0 }] };
        setLocalYears(updated);
    };

    const removeSubject = (yearIdx: number, subIdx: number) => {
        const updated = [...localYears];
        updated[yearIdx] = { ...updated[yearIdx], subjects: updated[yearIdx].subjects.filter((_, i) => i !== subIdx) };
        setLocalYears(updated);
    };

    const addYear = () => {
        const nextNum = localYears.length + 1;
        setLocalYears([...localYears, { year: nextNum, label: `Class ${7 + nextNum}`, subjects: [{ subject: 'Mathematics', marks: 0 }] }]);
    };

    const handleAnalyze = () => {
        setAcademics(localYears);
        runAcademicAnalysis();
    };

    const TrendIcon = ({ trend }: { trend: string }) => {
        if (trend === 'improving') return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
        if (trend === 'declining') return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
        return <Minus className="w-3.5 h-3.5 text-slate-400" />;
    };

    return (
        <section id="academic-analysis" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-teal-500" />
                        Past 2–3 Year Academic Performance
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Enter your subject marks for each year</p>
                </div>
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md">Section 3</span>
            </div>

            {/* Year Input Forms */}
            <div className="space-y-4">
                {localYears.map((yearData, yi) => (
                    <div key={yi} className="data-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <input
                                type="text"
                                value={yearData.label}
                                onChange={(e) => updateYear(yi, { label: e.target.value })}
                                className="text-sm font-bold text-slate-700 bg-transparent border-b border-slate-200 focus:outline-none focus:border-teal-500 py-1 px-0 w-28"
                            />
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Year {yearData.year}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {yearData.subjects.map((sub, si) => (
                                <div key={si} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg">
                                    <select
                                        value={sub.subject}
                                        onChange={(e) => updateSubject(yi, si, { subject: e.target.value })}
                                        className="flex-1 text-xs font-medium text-slate-600 bg-transparent border-none focus:outline-none cursor-pointer"
                                    >
                                        {COMMON_SUBJECTS.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={sub.marks}
                                        onChange={(e) => updateSubject(yi, si, { marks: Math.min(100, Math.max(0, Number(e.target.value))) })}
                                        className="w-14 text-center text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-md py-1 focus:outline-none focus:border-teal-500"
                                    />
                                    <button onClick={() => removeSubject(yi, si)} className="text-slate-300 hover:text-red-400 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => addSubject(yi)} className="mt-3 text-xs text-teal-600 font-semibold flex items-center gap-1 hover:text-teal-700">
                            <Plus className="w-3.5 h-3.5" /> Add Subject
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-3">
                {localYears.length < 3 && (
                    <button onClick={addYear} className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add Year
                    </button>
                )}
                <button
                    onClick={handleAnalyze}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" /> Analyze Performance
                </button>
            </div>

            {/* Results */}
            {academicResult && academicResult.trends.length > 0 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Comparison Bar Chart */}
                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Subject Comparison</h4>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={academicResult.comparisonChartData} layout="vertical" margin={{ left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <YAxis dataKey="subject" type="category" tick={{ fill: '#334155', fontSize: 10 }} width={85} />
                                    <Tooltip />
                                    <Legend />
                                    {academicResult.years.map((y, i) => (
                                        <Bar key={y.label} dataKey={y.label} fill={LINE_COLORS[i]} radius={[0, 3, 3, 0]} />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Trend Line Chart */}
                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Growth Trends</h4>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={academicResult.trendChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <Tooltip />
                                    <Legend />
                                    {academicResult.trends.map((t, i) => (
                                        <Line key={t.subject} type="monotone" dataKey={t.subject} stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={2} dot={{ r: 3 }} />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Dominant Area</h4>
                            <p className="text-lg font-extrabold text-slate-800">{academicResult.dominantArea}</p>
                        </div>
                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Strong Subjects</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {academicResult.strongSubjects.length > 0
                                    ? academicResult.strongSubjects.map((s) => (
                                        <span key={s} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-semibold">{s}</span>
                                    ))
                                    : <span className="text-xs text-slate-400">None yet</span>}
                            </div>
                        </div>
                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Needs Improvement</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {academicResult.weakSubjects.length > 0
                                    ? academicResult.weakSubjects.map((s) => (
                                        <span key={s} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-md font-semibold">{s}</span>
                                    ))
                                    : <span className="text-xs text-slate-400">None</span>}
                            </div>
                        </div>
                    </div>

                    {/* Subject Trends */}
                    <div className="data-card p-5">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Subject Trend Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {academicResult.trends.map((t) => (
                                <div key={t.subject} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <TrendIcon trend={t.trend} />
                                        <span className="text-xs font-medium text-slate-600">{t.subject}</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">{t.averageMarks}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AcademicSection;
