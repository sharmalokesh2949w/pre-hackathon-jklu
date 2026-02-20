import React from 'react';
import { 
  Sparkles, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Brain,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const growthData = [
  { name: 'Sept', clarity: 40, skills: 30 },
  { name: 'Oct', clarity: 45, skills: 35 },
  { name: 'Nov', clarity: 60, skills: 50 },
  { name: 'Dec', clarity: 55, skills: 65 },
  { name: 'Jan', clarity: 75, skills: 70 },
  { name: 'Feb', clarity: 85, skills: 82 },
];

const skillData = [
  { subject: 'Logic', A: 120, fullMark: 150 },
  { subject: 'Creativity', A: 98, fullMark: 150 },
  { subject: 'Tech', A: 86, fullMark: 150 },
  { subject: 'Lang', A: 99, fullMark: 150 },
  { subject: 'Social', A: 85, fullMark: 150 },
  { subject: 'Science', A: 65, fullMark: 150 },
];

import { useAuth } from '../context/AuthContext';
import { mapProfileToCareer } from '../utils/careerUtils';

import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const profile = user?.profile || {};
  const career = mapProfileToCareer(profile);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 lg:p-10 space-y-8 relative overflow-hidden min-h-screen"
    >
      {/* Background Blobs for Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0] || 'Student'}!</span> 👋
          </h2>
          <p className="text-slate-400 mt-2 text-lg font-medium">
            Your personal intelligence is {user?.onboardingComplete ? 'fully' : 'partially'} mapped.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-secondary flex items-center gap-3 py-3">
            <TrendingUp className="w-5 h-5" />
            Full Analytics
          </button>
          {!user?.onboardingComplete && (
            <button className="btn-primary flex items-center gap-3 py-3">
              <Sparkles className="w-5 h-5" />
              Complete Setup
            </button>
          )}
        </div>
      </motion.div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {[
          { icon: Brain, label: 'Expertise', value: profile.aptitude?.[0] || 'Analyzing...', color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { icon: Target, label: 'Success Pair', value: career.title, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { icon: GraduationCap, label: 'Subject Focus', value: profile.subjects?.[0] || 'Exploring', color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { icon: Briefcase, label: 'Pace Style', value: profile.learningStyle || 'Fast Paced', color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 rounded-[2.5rem] flex items-center gap-5 border-white/10"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} shadow-xl shadow-black/20`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              <p className="text-lg font-bold leading-tight mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
... (rest of the file content will be updated in next chunks)

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Growth Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-xl uppercase tracking-tighter">Growth Velocity</h3>
              <p className="text-xs text-slate-500 font-bold tracking-widest mt-1">REAL-TIME SKILL MAPPING</p>
            </div>
            <select className="bg-white/5 border border-white/10 text-xs rounded-xl px-4 py-2 outline-none hover:bg-white/10 transition-all font-bold">
              <option>PAST 6 MONTHS</option>
              <option>YEAR TO DATE</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSkills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(8px)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="clarity" 
                  stroke="#0ea5e9" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorClarity)" 
                  animationBegin={200}
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="skills" 
                  stroke="#818cf8" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSkills)" 
                  animationBegin={400}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skill Radar */}
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-between">
          <div className="w-full">
            <h3 className="font-bold text-xl uppercase tracking-tighter">Neuro-Profile</h3>
            <p className="text-xs text-slate-500 font-bold tracking-widest mt-1">PSYCHOMETRIC ANALYSIS</p>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                   name={user?.name?.split(' ')[0] || 'User'}
                  dataKey="A"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full pt-4 border-t border-white/5 mt-4">
             <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Core Alignment</span>
                <span className="text-sky-400">89%</span>
             </div>
             <div className="mt-2 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '89%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
                />
             </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Recommended Roadmaps */}
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-xl uppercase tracking-tighter">Elite Career Matches</h3>
              <p className="text-xs text-slate-500 font-bold tracking-widest mt-1">AI-DRIVEN FORECASTING</p>
            </div>
            <button className="text-sky-400 text-xs font-bold uppercase tracking-widest hover:text-sky-300 transition-colors">View All Forecasts</button>
          </div>
          <div className="space-y-4">
            {[
              { title: career.title, score: career.matchScore, status: career.status, desc: career.description },
              { title: 'UX/UI Product Designer', score: 85, status: 'Great Match', desc: 'Combines your creative and tech skills' },
              { title: 'Robotics Engineer', score: 78, status: 'Growing Fit', desc: 'Match with your physics academic scores' },
            ].map((match, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-sky-500/20 transition-all cursor-pointer group flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">{match.title}</h4>
                    <span className="px-2 py-0.5 rounded-lg text-[8px] font-black bg-sky-500/20 text-sky-400 uppercase tracking-widest">{match.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{match.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-black text-sky-400">{match.score}%</span>
                  <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: `${match.score}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps / Roadmap */}
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-32 h-32 text-sky-500" />
           </div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="font-bold text-xl uppercase tracking-tighter">Strategic Roadmap</h3>
              <p className="text-xs text-sky-400 font-bold tracking-widest mt-1 italic">{career.roadmapPhases[0]?.title || 'Foundation'}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/20 flex items-center justify-center">
               <Target className="w-5 h-5 text-sky-400" />
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            {(career.roadmapPhases[0]?.items || []).map((task, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all ${
                    task.completed 
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                      : 'bg-slate-800 text-slate-500 border border-white/5 group-hover:border-sky-500/50'
                  }`}>
                    {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                  </div>
                  {i !== (career.roadmapPhases[0]?.items.length - 1) && (
                    <div className="absolute top-8 left-4 w-[1px] h-6 bg-slate-800" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className={`text-sm font-bold tracking-tight transition-colors ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>
                    {task.label}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                    {task.detail}
                    {task.completed && <span className="text-emerald-500 font-black">COMPLETED</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 rounded-3xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-white/10 text-xs font-black uppercase tracking-[0.2em] text-slate-300 hover:text-white hover:border-sky-500/30 transition-all flex items-center justify-center gap-3 active:scale-95 group">
            Open Control Center
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
