import React from 'react';
import { Target, ChevronDown, ChevronUp, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

const CareerDecisionSection: React.FC = () => {
    const { state, runFullAnalysis } = useAnalysis();
    const { decisionResult, interestResult, aptitudeResult, academicResult } = state;
    const [expanded, setExpanded] = React.useState<number | null>(null);

    const canRun = (interestResult && interestResult.entries.length > 0) ||
        (aptitudeResult && aptitudeResult.scores.length > 0) ||
        (academicResult && academicResult.trends.length > 0);

    return (
        <section id="career-decision" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Intelligent Career Decision Engine
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Combined analysis: Interest (40%) + Aptitude (30%) + Academic (30%)</p>
                </div>
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md">Section 4</span>
            </div>

            {/* Weight Visualization */}
            <div className="data-card p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Analysis Weight Distribution</h4>
                <div className="flex gap-2 h-4 rounded-lg overflow-hidden">
                    <div className="bg-indigo-500 flex items-center justify-center" style={{ width: '40%' }}>
                        <span className="text-[9px] text-white font-bold">Interest 40%</span>
                    </div>
                    <div className="bg-purple-500 flex items-center justify-center" style={{ width: '30%' }}>
                        <span className="text-[9px] text-white font-bold">Aptitude 30%</span>
                    </div>
                    <div className="bg-teal-500 flex items-center justify-center" style={{ width: '30%' }}>
                        <span className="text-[9px] text-white font-bold">Academic 30%</span>
                    </div>
                </div>
                <div className="flex gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                        <span className="text-[10px] text-slate-500 font-medium">
                            Interests {interestResult ? '✓' : '—'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
                        <span className="text-[10px] text-slate-500 font-medium">
                            Aptitude {aptitudeResult ? '✓' : '—'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-teal-500" />
                        <span className="text-[10px] text-slate-500 font-medium">
                            Academic {academicResult ? '✓' : '—'}
                        </span>
                    </div>
                </div>
            </div>

            {!canRun && (
                <div className="data-card p-5 border-amber-200 bg-amber-50">
                    <p className="text-sm text-amber-700 font-medium">Complete at least one section above (Interest, Aptitude, or Academic) to generate career recommendations.</p>
                </div>
            )}

            {canRun && (
                <button
                    onClick={runFullAnalysis}
                    className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <Zap className="w-4 h-4" /> Generate Full Career Analysis
                </button>
            )}

            {/* Rankings */}
            {decisionResult && decisionResult.rankings.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top 5 Career Recommendations</h4>
                    {decisionResult.rankings.map((r) => (
                        <div key={r.careerId} className="data-card overflow-hidden">
                            <button
                                className="w-full p-5 text-left flex items-center gap-4"
                                onClick={() => setExpanded(expanded === r.rank ? null : r.rank)}
                            >
                                <div className={`w-10 h-10 rounded-lg bg-${r.color}-50 flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-lg font-black text-slate-600">#{r.rank}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-800">{r.title}</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">{r.category} · {r.stream}</p>
                                </div>
                                <div className="text-right flex-shrink-0 mr-2">
                                    <div className="text-lg font-black bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                                        {r.matchScore}%
                                    </div>
                                    <p className="text-[10px] text-slate-400">match</p>
                                </div>
                                {expanded === r.rank ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                            </button>

                            {expanded === r.rank && (
                                <div className="px-5 pb-5 space-y-3 border-t border-slate-100 pt-4">
                                    {/* Score Breakdown */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-indigo-50 p-3 rounded-lg text-center">
                                            <p className="text-lg font-black text-indigo-600">{r.interestScore}%</p>
                                            <p className="text-[10px] text-indigo-500 font-semibold">Interest</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                                            <p className="text-lg font-black text-purple-600">{r.aptitudeScore}%</p>
                                            <p className="text-[10px] text-purple-500 font-semibold">Aptitude</p>
                                        </div>
                                        <div className="bg-teal-50 p-3 rounded-lg text-center">
                                            <p className="text-lg font-black text-teal-600">{r.academicScore}%</p>
                                            <p className="text-[10px] text-teal-500 font-semibold">Academic</p>
                                        </div>
                                    </div>

                                    {/* Reasoning */}
                                    <div className="bg-slate-50 p-3 rounded-lg">
                                        <p className="text-xs text-slate-600 leading-relaxed">{r.reasoning}</p>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <DollarSign className="w-3.5 h-3.5" />
                                            <span>{r.salaryRange}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            <span>Demand: {r.demand}%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CareerDecisionSection;
