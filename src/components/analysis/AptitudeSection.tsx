import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, Sparkles } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { ALL_APTITUDE_DIMENSIONS, getLevel } from '../../engine/aptitudeEngine';
import type { AptitudeDimension } from '../../types/analysis';

const LEVEL_COLORS: Record<string, string> = {
    Strong: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    Weak: 'bg-red-50 text-red-700 border-red-200',
};

const AptitudeSection: React.FC = () => {
    const { state, setAptitudes, runAptitudeAnalysis } = useAnalysis();
    const { aptitudes, aptitudeResult } = state;

    const getScore = (dim: AptitudeDimension): number => {
        return aptitudes.find((a) => a.dimension === dim)?.score ?? 5;
    };

    const handleSlider = (dim: AptitudeDimension, score: number) => {
        const existing = aptitudes.filter((a) => a.dimension !== dim);
        existing.push({ dimension: dim, score, level: getLevel(score) });
        setAptitudes(existing);
    };

    const handleAnalyze = () => {
        // Ensure all dimensions are set
        const full = ALL_APTITUDE_DIMENSIONS.map((dim) => {
            const found = aptitudes.find((a) => a.dimension === dim);
            return found ?? { dimension: dim, score: 5, level: getLevel(5) as const };
        });
        setAptitudes(full);
        runAptitudeAnalysis();
    };

    return (
        <section id="aptitude-eval" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-500" />
                        Self Aptitude Evaluation
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Rate your ability in each area (1 = beginner, 10 = expert)</p>
                </div>
                <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-md">Section 2</span>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_APTITUDE_DIMENSIONS.map((dim) => {
                    const score = getScore(dim);
                    const level = getLevel(score);
                    return (
                        <div key={dim} className="data-card p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-700">{dim}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${LEVEL_COLORS[level]}`}>{level}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={score}
                                    onChange={(e) => handleSlider(dim, Number(e.target.value))}
                                    className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                />
                                <span className="text-lg font-black text-slate-700 w-8 text-right">{score}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={handleAnalyze}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
            >
                <Sparkles className="w-4 h-4" /> Evaluate Aptitude
            </button>

            {/* Results */}
            {aptitudeResult && aptitudeResult.scores.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Radar Chart */}
                    <div className="data-card p-5 lg:col-span-1">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Aptitude Radar</h4>
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart cx="50%" cy="50%" outerRadius="72%" data={aptitudeResult.radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#64748b', fontSize: 10 }} />
                                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                                <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={2} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Scores + Domain Map */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Aptitude Scores</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {aptitudeResult.scores.map((s) => (
                                    <div key={s.dimension} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-xs font-medium text-slate-600 truncate">{s.dimension}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${LEVEL_COLORS[s.level]}`}>{s.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="data-card p-5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Career Domain Match</h4>
                            <div className="space-y-2">
                                {aptitudeResult.careerDomainMap.slice(0, 5).map((d) => (
                                    <div key={d.domain} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-sm font-semibold text-slate-700">{d.domain}</span>
                                        <div className="flex gap-1">
                                            {d.matchingAptitudes.map((a) => (
                                                <span key={a} className="text-[9px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-medium">{a.split(' ')[0]}</span>
                                            ))}
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

export default AptitudeSection;
