import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, ArrowLeft, TrendingUp, DollarSign, BookOpen, Star, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CAREER_DATABASE } from '../utils/careerData';

const CareerCompare: React.FC = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string[]>([]);

    const selectedCareers = useMemo(() => {
        return CAREER_DATABASE.filter(c => selected.includes(c.id));
    }, [selected]);

    const toggleSelect = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">Compare Careers</h1>
                    <p className="text-sm text-slate-500">Select up to 3 careers for side-by-side comparison</p>
                </div>
            </div>

            {/* Career Selection */}
            <div className="flex flex-wrap gap-2">
                {CAREER_DATABASE.map(career => (
                    <button
                        key={career.id}
                        onClick={() => toggleSelect(career.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selected.includes(career.id)
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                    >
                        {career.title}
                    </button>
                ))}
            </div>

            {/* Comparison Table */}
            {selectedCareers.length >= 2 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-48">Metric</th>
                                {selectedCareers.map(c => (
                                    <th key={c.id} className="text-left py-4 px-4">
                                        <span className="text-sm font-bold text-slate-700">{c.title}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {[
                                { label: 'Salary Range', icon: DollarSign, key: 'salaryRange' },
                                { label: 'Growth Outlook', icon: TrendingUp, key: 'growthOutlook' },
                                { label: 'Industry Demand', icon: Briefcase, key: 'industryDemand' },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-4 flex items-center gap-2">
                                        <row.icon className="w-4 h-4 text-indigo-400" />
                                        <span className="text-sm font-semibold text-slate-500">{row.label}</span>
                                    </td>
                                    {selectedCareers.map(c => (
                                        <td key={c.id} className="py-4 px-4 text-sm text-slate-700 font-medium">
                                            {row.key === 'salaryRange' ? `${c.salaryRange.min} - ${c.salaryRange.max}` : String((c as any)[row.key])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-4 px-4 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-semibold text-slate-500">Key Skills</span>
                                </td>
                                {selectedCareers.map(c => (
                                    <td key={c.id} className="py-4 px-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {c.requiredSkills.slice(0, 4).map((s, j) => (
                                                <span key={j} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">{s}</span>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-4 px-4 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-semibold text-slate-500">Education</span>
                                </td>
                                {selectedCareers.map(c => (
                                    <td key={c.id} className="py-4 px-4">
                                        <div className="space-y-1">
                                            {c.educationPath.slice(0, 3).map((e, j) => (
                                                <p key={j} className="text-xs text-slate-500">{e}</p>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-4 px-4 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-semibold text-slate-500">Top Colleges</span>
                                </td>
                                {selectedCareers.map(c => (
                                    <td key={c.id} className="py-4 px-4">
                                        <div className="space-y-1">
                                            {c.topColleges.slice(0, 3).map((col, j) => (
                                                <p key={j} className="text-xs text-slate-500">{col}</p>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </motion.div>
            )}

            {selectedCareers.length < 2 && (
                <div className="card p-16 text-center">
                    <GitCompare className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-semibold">Select at least 2 careers to compare</p>
                </div>
            )}
        </motion.div>
    );
};

export default CareerCompare;
