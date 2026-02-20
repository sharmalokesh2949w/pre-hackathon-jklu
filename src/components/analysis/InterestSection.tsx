import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sparkles, Star, TrendingUp } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { ALL_INTEREST_CATEGORIES } from '../../engine/interestAnalysis';
import type { InterestCategory } from '../../types/analysis';

const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#10b981', '#06b6d4', '#f97316', '#84cc16'];

const InterestSection: React.FC = () => {
    const { state, setInterests, runInterestAnalysis } = useAnalysis();
    const { interests, interestResult } = state;

    const getWeight = (cat: InterestCategory): number => {
        return interests.find((e) => e.category === cat)?.weight ?? 0;
    };

    const handleSlider = (cat: InterestCategory, weight: number) => {
        const existing = interests.filter((e) => e.category !== cat);
        if (weight > 0) {
            existing.push({ category: cat, weight });
        }
        setInterests(existing);
    };

    const handleAnalyze = () => {
        runInterestAnalysis();
    };

    return (
        <section id="interest-analysis" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        Primary Interest Analysis
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Rate your interest in each field (0 = none, 10 = passionate)</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md">Section 1</span>
            </div>

            {/* Interest Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_INTEREST_CATEGORIES.map((cat, i) => (
                    <div key={cat} className="data-card p-4 flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-semibold text-slate-700 truncate">{cat}</span>
                                <span className="text-xs font-bold text-slate-500 ml-2">{getWeight(cat)}/10</span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={10}
                                step={1}
                                value={getWeight(cat)}
                                onChange={(e) => handleSlider(cat, Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAnalyze}
                disabled={interests.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-40 flex items-center gap-2"
            >
                <Sparkles className="w-4 h-4" /> Analyze Interests
            </button>

            {/* Results */}
            {interestResult && interestResult.chartData.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Chart */}
                    <div className="data-card p-5 lg:col-span-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Interest Strength</h4>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={interestResult.chartData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                <YAxis dataKey="category" type="category" tick={{ fill: '#334155', fontSize: 11 }} width={90} />
                                <Tooltip />
                                <Bar dataKey="strength" radius={[0, 4, 4, 0]}>
                                    {interestResult.chartData.map((_entry, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top 3 + Clusters */}
                    <div className="space-y-4">
                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Top 3 Interest Zones</h4>
                            <div className="space-y-3">
                                {interestResult.top3.map((entry, i) => (
                                    <div key={entry.category} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                                        <span className="text-sm font-semibold text-slate-700 flex-1">{entry.category}</span>
                                        <span className="text-sm font-bold text-indigo-600">{entry.weight}/10</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5" /> Dominant Cluster
                            </h4>
                            <p className="text-lg font-extrabold text-slate-800">{interestResult.dominantCluster}</p>
                            <div className="mt-3 space-y-2">
                                {interestResult.clusters.slice(0, 3).map((c) => (
                                    <div key={c.name} className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500">{c.name}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${c.strength}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-600">{c.strength}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default InterestSection;
