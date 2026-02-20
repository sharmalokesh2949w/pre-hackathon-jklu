import React from 'react';
import { Layers, CheckCircle2, BookOpen, ArrowUp } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

const STREAM_INFO: Record<string, { desc: string; subjects: string[]; color: string }> = {
    'Science (PCM)': {
        desc: 'Physics, Chemistry, Mathematics — ideal for engineering, technology, and research careers.',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
        color: 'indigo',
    },
    'Science (PCB)': {
        desc: 'Physics, Chemistry, Biology — perfect for medical, biotechnology, and life sciences.',
        subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Physical Education'],
        color: 'emerald',
    },
    'Science (PCB/PCM)': {
        desc: 'Flexible science stream combining both math and biology pathways.',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
        color: 'teal',
    },
    Commerce: {
        desc: 'Accountancy, Business, Economics — best for finance, management, and entrepreneurship.',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics'],
        color: 'amber',
    },
    Arts: {
        desc: 'Humanities and creative subjects — suited for media, law, civil services, and creative fields.',
        subjects: ['History', 'Political Science', 'Economics', 'English', 'Geography'],
        color: 'rose',
    },
    'Arts / Science': {
        desc: 'Design-oriented path combining creative and analytical skills.',
        subjects: ['Fine Arts', 'Computer Science', 'English', 'Mathematics', 'Psychology'],
        color: 'purple',
    },
    'Any Stream': {
        desc: 'Flexible career path — choose subjects based on your strongest interests.',
        subjects: ['Based on personal interest'],
        color: 'slate',
    },
};

const StreamRecommend: React.FC = () => {
    const { state } = useAnalysis();
    const { decisionResult, roadmap } = state;

    if (!decisionResult) return null;

    const { recommendedStream, streamConfidence } = decisionResult;
    const info = STREAM_INFO[recommendedStream] ?? STREAM_INFO['Any Stream'];

    return (
        <section id="stream-recommend" className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-500" />
                        Stream Recommendation
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Based on your combined career analysis results</p>
                </div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-md">Section 6</span>
            </div>

            {/* Recommended Stream Card */}
            <div className={`data-card p-6 border-${info.color}-200 bg-gradient-to-br from-white to-${info.color}-50`}>
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Stream</span>
                        <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{recommendedStream}</h3>
                        <p className="text-sm text-slate-500 mt-2 max-w-md">{info.desc}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                            {streamConfidence[recommendedStream] ?? 0}%
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold">confidence</p>
                    </div>
                </div>
            </div>

            {/* Stream Confidence Bars */}
            <div className="data-card p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Stream Confidence Scores</h4>
                <div className="space-y-2">
                    {Object.entries(streamConfidence)
                        .sort((a, b) => b[1] - a[1])
                        .map(([stream, confidence]) => (
                            <div key={stream} className="flex items-center gap-3">
                                <span className="text-xs font-medium text-slate-600 w-36 truncate">{stream}</span>
                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${stream === recommendedStream ? 'bg-gradient-to-r from-indigo-500 to-teal-500' : 'bg-slate-300'}`}
                                        style={{ width: `${confidence}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-slate-600 w-10 text-right">{confidence}%</span>
                            </div>
                        ))}
                </div>
            </div>

            {/* Subject Strategy for Next Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="data-card p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Recommended Subjects
                    </h4>
                    <div className="space-y-2">
                        {info.subjects.map((s) => (
                            <div key={s} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                <span className="text-sm font-medium text-slate-700">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {roadmap && (
                    <div className="data-card p-5">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <ArrowUp className="w-3.5 h-3.5" /> Subjects to Improve
                        </h4>
                        <div className="space-y-2">
                            {roadmap.subjectStrategy.improve.map((s) => (
                                <div key={s} className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-lg">
                                    <ArrowUp className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                    <span className="text-sm font-medium text-amber-800">{s}</span>
                                </div>
                            ))}
                            {roadmap.subjectStrategy.improve.length === 0 && (
                                <p className="text-xs text-slate-400">No weak subjects identified — keep it up!</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default StreamRecommend;
