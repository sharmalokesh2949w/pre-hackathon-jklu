import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Calendar, MessageSquare, Star, Clock, CheckCircle,
    ChevronRight, Send, X, TrendingUp, Award, BookOpen,
    AlertCircle, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Session {
    _id: string;
    student: { _id: string; name: string; email: string; profile: any };
    date: string;
    time: string;
    mode: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes: string;
    feedback: string;
}

interface StudentEntry {
    student: { _id: string; name: string; email: string; profile: any };
    latestSession: Session;
}

const statusColor: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600 border-amber-200',
    confirmed: 'bg-blue-50 text-blue-600 border-blue-200',
    completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
};

const CounsellorDashboard: React.FC = () => {
    const { user } = useAuth();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [students, setStudents] = useState<StudentEntry[]>([]);
    const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'students'>('overview');
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [notesInput, setNotesInput] = useState('');
    const [feedbackInput, setFeedbackInput] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    const fetchData = useCallback(async () => {
        if (!user) return;
        try {
            const [sessRes, studRes] = await Promise.all([
                fetch('/api/session/list', { headers: { Authorization: `Bearer ${user.token}` } }),
                fetch('/api/session/students', { headers: { Authorization: `Bearer ${user.token}` } }),
            ]);
            if (sessRes.ok) setSessions(await sessRes.json());
            if (studRes.ok) setStudents(await studRes.json());
        } catch { /* ignore */ }
    }, [user]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const openSession = (s: Session) => {
        setSelectedSession(s);
        setNotesInput(s.notes || '');
        setFeedbackInput(s.feedback || '');
        setSaveMsg('');
    };

    const saveFeedback = async () => {
        if (!selectedSession || !user) return;
        setSaving(true);
        try {
            const res = await fetch('/api/session/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({ sessionId: selectedSession._id, notes: notesInput, feedback: feedbackInput, status: 'completed' }),
            });
            if (res.ok) {
                setSaveMsg('Saved successfully!');
                await fetchData();
                setTimeout(() => setSaveMsg(''), 3000);
            }
        } catch { /* ignore */ }
        setSaving(false);
    };

    const updateStatus = async (sessionId: string, status: string) => {
        if (!user) return;
        await fetch(`/api/session/${sessionId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
            body: JSON.stringify({ status }),
        });
        await fetchData();
    };

    const pending = sessions.filter(s => s.status === 'pending');
    const confirmed = sessions.filter(s => s.status === 'confirmed');
    const completed = sessions.filter(s => s.status === 'completed');

    const stats = [
        { label: 'Total Students', value: students.length, icon: Users, color: 'indigo' },
        { label: 'Pending Sessions', value: pending.length, icon: Clock, color: 'amber' },
        { label: 'Confirmed', value: confirmed.length, icon: Calendar, color: 'blue' },
        { label: 'Completed', value: completed.length, icon: CheckCircle, color: 'emerald' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">
                        Welcome, <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">{user?.name?.split(' ')[0]}</span> 👋
                    </h1>
                    <p className="text-slate-500 mt-1">Counsellor Dashboard — Manage your students and sessions</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-indigo-700">Counsellor Account</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="card p-5">
                        <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 flex items-center justify-center mb-3`}>
                            <s.icon className={`w-5 h-5 text-${s.color}-500`} />
                        </div>
                        <p className={`text-2xl font-black text-${s.color}-600`}>{s.value}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-slate-100 rounded-xl p-1 w-fit">
                {(['overview', 'sessions', 'students'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Pending Requests */}
                    <div className="card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" /> Pending Session Requests
                        </h3>
                        {pending.length === 0 ? (
                            <p className="text-slate-400 text-sm text-center py-6">No pending requests</p>
                        ) : (
                            <div className="space-y-3">
                                {pending.slice(0, 5).map(s => (
                                    <div key={s._id} className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl">
                                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                            <User className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-slate-700">{s.student?.name || 'Student'}</p>
                                            <p className="text-xs text-slate-400">{s.date} • {s.time} • {s.mode}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => updateStatus(s._id, 'confirmed')}
                                                className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600">
                                                Accept
                                            </button>
                                            <button onClick={() => updateStatus(s._id, 'cancelled')}
                                                className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200">
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Students */}
                    <div className="card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-500" /> Recent Students
                        </h3>
                        {students.length === 0 ? (
                            <p className="text-slate-400 text-sm text-center py-6">No students yet</p>
                        ) : (
                            <div className="space-y-3">
                                {students.slice(0, 4).map(({ student, latestSession }, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors cursor-pointer"
                                        onClick={() => setActiveTab('students')}>
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-xl flex items-center justify-center font-extrabold text-indigo-600 text-sm">
                                            {student.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-slate-700">{student.name}</p>
                                            <p className="text-xs text-slate-400">{student.email}</p>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${statusColor[latestSession.status]}`}>
                                            {latestSession.status}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
                <div className="space-y-4">
                    {sessions.length === 0 && (
                        <div className="card p-12 text-center">
                            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-400 font-semibold">No sessions booked yet</p>
                        </div>
                    )}
                    {sessions.map(s => (
                        <motion.div key={s._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="card p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => openSession(s)}>
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center font-extrabold text-indigo-600">
                                {s.student?.name?.[0]?.toUpperCase() || '?'}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-700">{s.student?.name || 'Student'}</p>
                                <p className="text-xs text-slate-400">{s.date} • {s.time} • {s.mode}</p>
                            </div>
                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusColor[s.status]}`}>{s.status}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
                <div className="space-y-4">
                    {students.length === 0 && (
                        <div className="card p-12 text-center">
                            <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-400 font-semibold">No assigned students yet</p>
                        </div>
                    )}
                    {students.map(({ student, latestSession }, i) => {
                        const p = student.profile || {};
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className="card p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl">
                                        {student.name?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-extrabold text-slate-800">{student.name}</h3>
                                        <p className="text-sm text-slate-400">{student.email}</p>
                                        <span className={`inline-block text-xs font-bold px-2 py-1 rounded-full border mt-1 ${statusColor[latestSession.status]}`}>
                                            Latest: {latestSession.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Profile Details */}
                                {(student as any).onboardingComplete && p ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            { icon: BookOpen, label: 'Stream', value: p.stream || p.currentClass || '—' },
                                            { icon: TrendingUp, label: 'Interests', value: Array.isArray(p.interests) ? p.interests.slice(0, 2).join(', ') : (p.interests || '—') },
                                            { icon: Award, label: 'Career Goal', value: p.careerGoal || p.dreamCareer || '—' },
                                            { icon: Star, label: 'Strengths', value: Array.isArray(p.strengths) ? p.strengths.slice(0, 2).join(', ') : (p.strengths || '—') },
                                        ].map(({ icon: Icon, label, value }, j) => (
                                            <div key={j} className="bg-slate-50 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Icon className="w-3.5 h-3.5 text-indigo-500" />
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                                                </div>
                                                <p className="text-sm font-semibold text-slate-700 truncate">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 italic">Student hasn't completed onboarding yet.</p>
                                )}

                                <button onClick={() => openSession(latestSession)}
                                    className="mt-4 w-full py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Add Notes / Feedback
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Session Detail Modal */}
            <AnimatePresence>
                {selectedSession && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={e => e.target === e.currentTarget && setSelectedSession(null)}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-extrabold text-slate-800">Session Details</h2>
                                <button onClick={() => setSelectedSession(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 mb-5">
                                <p className="font-extrabold text-slate-800">{selectedSession.student?.name}</p>
                                <p className="text-sm text-slate-500">{selectedSession.date} • {selectedSession.time} • {selectedSession.mode}</p>
                                <span className={`inline-block text-xs font-bold px-2 py-1 rounded-full border mt-2 ${statusColor[selectedSession.status]}`}>
                                    {selectedSession.status}
                                </span>
                            </div>

                            {/* Status Control */}
                            <div className="mb-5">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Update Status</p>
                                <div className="flex gap-2 flex-wrap">
                                    {['pending', 'confirmed', 'completed', 'cancelled'].map(st => (
                                        <button key={st} onClick={() => updateStatus(selectedSession._id, st)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all capitalize ${selectedSession.status === st ? statusColor[st] : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                                            {st}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Session Notes</label>
                                    <textarea value={notesInput} onChange={e => setNotesInput(e.target.value)} rows={3}
                                        placeholder="Private notes about this session..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-indigo-400 resize-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Student Feedback</label>
                                    <textarea value={feedbackInput} onChange={e => setFeedbackInput(e.target.value)} rows={4}
                                        placeholder="Feedback visible to the student after the session..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-indigo-400 resize-none" />
                                </div>

                                {saveMsg && (
                                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 font-medium flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> {saveMsg}
                                    </div>
                                )}

                                <button onClick={saveFeedback} disabled={saving}
                                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                    {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</> : <><Send className="w-4 h-4" />Save Notes & Feedback</>}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CounsellorDashboard;
