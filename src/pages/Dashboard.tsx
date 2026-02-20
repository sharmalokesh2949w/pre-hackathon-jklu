import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Target, Zap, ArrowRight, Award,
  Lightbulb, Users
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { calculateMatchScore, generateExplanation } from '../utils/careerUtils';
import { CAREER_DATABASE } from '../utils/careerData';

const growthData = [
  { month: 'Jan', skills: 30 }, { month: 'Feb', skills: 42 },
  { month: 'Mar', skills: 55 }, { month: 'Apr', skills: 62 },
  { month: 'May', skills: 71 }, { month: 'Jun', skills: 78 },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();


  const careerMatches = useMemo(() => {
    return CAREER_DATABASE
      .map(career => ({
        career,
        score: calculateMatchScore(career, user?.profile ?? {}),
        explanation: generateExplanation(career, user?.profile ?? {})
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [user?.profile]);

  const topMatch = careerMatches[0];
  const fitScore = topMatch?.score || 72;

  const radarData = [
    { subject: 'Logical', value: 75 },
    { subject: 'Creative', value: 68 },
    { subject: 'Communication', value: 82 },
    { subject: 'Technical', value: 70 },
    { subject: 'Leadership', value: 65 },
    { subject: 'Problem Solving', value: 78 },
  ];

  const quickActions = [
    { icon: Target, label: 'Compare Careers', desc: 'Side-by-side analysis', route: '/compare', color: 'indigo' },
    { icon: TrendingUp, label: 'Growth Tracker', desc: 'Log your real growth', route: '/growth', color: 'emerald' },
    { icon: Users, label: 'Find Counsellor', desc: 'Connect with experts', route: '/counsellor', color: 'teal' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-10 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">{user?.name?.split(' ')[0] || 'Student'}</span> 👋
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Here's your career intelligence overview</p>
        </div>
        <button
          onClick={() => navigate('/mentor')}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2"
        >
          <Zap className="w-4 h-4" /> Talk to AI Mentor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(action.route)}
            className="card p-6 text-left group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl bg-${action.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-6 h-6 text-${action.color}-500`} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{action.label}</h3>
            <p className="text-xs text-slate-400 mt-1">{action.desc}</p>
            <ArrowRight className="w-4 h-4 text-slate-300 mt-3 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </motion.button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Fit Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-8 flex flex-col items-center text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Career Fit Score</h3>
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" stroke="#e2e8f0" strokeWidth="8" fill="none" />
              <motion.circle
                cx="60" cy="60" r="52"
                stroke="url(#scoreGradient)" strokeWidth="8" fill="none"
                strokeLinecap="round"
                strokeDasharray={`${fitScore * 3.27} ${327 - fitScore * 3.27}`}
                initial={{ strokeDasharray: '0 327' }}
                animate={{ strokeDasharray: `${fitScore * 3.27} ${327 - fitScore * 3.27}` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-800">{fitScore}</span>
              <span className="text-xs text-slate-400 font-bold">/ 100</span>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-700">{topMatch?.career?.title || 'Complete Assessment'}</p>
          <p className="text-xs text-slate-400 mt-1">Top career match</p>
        </motion.div>

        {/* Growth Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6 lg:col-span-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Skill Growth Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="skills" stroke="#6366f1" strokeWidth={2.5} fill="url(#growthGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card p-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Aptitude Radar</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Career Matches */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Career Matches</h3>
            <Lightbulb className="w-4 h-4 text-amber-400" />
          </div>
          <div className="space-y-3">
            {careerMatches.map((match, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-700">{match.career.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{match.explanation.whySuitable.slice(0, 80)}...</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">{match.score}%</span>
                  <p className="text-[10px] text-slate-400">match</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
