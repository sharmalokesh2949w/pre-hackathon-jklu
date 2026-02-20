import React from 'react';
import { 
  Sparkles, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
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

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, <span className="gradient-text">Alex!</span> 👋</h2>
          <p className="text-slate-400">Your career journey is 72% mapped. Keep going!</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            View Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Resume Assessment
          </button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Brain, label: 'Top Aptitude', value: 'Logical Reasoning', color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { icon: Target, label: 'Success Match', value: 'Data Science (89%)', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { icon: GraduationCap, label: 'Study Focus', value: 'PCM + CS', color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { icon: Briefcase, label: 'Internships', value: '2 Recommended', color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 rounded-2xl flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">{stat.label}</p>
              <p className="text-sm font-bold truncate max-w-[120px]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Growth Index</h3>
            <select className="bg-slate-800 border border-slate-700 text-xs rounded-lg px-2 py-1 outline-none">
              <span className="p-2">Last 6 Months</span>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSkills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="clarity" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorClarity)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="skills" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorSkills)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="glass-card p-6 rounded-3xl">
          <h3 className="font-bold text-lg mb-6">Personality Profile</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Alex"
                  dataKey="A"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommended Roadmaps */}
        <div className="glass-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Top Career Matches</h3>
            <button className="text-sky-400 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'AI Research Scientist', score: 92, status: 'High Fit', desc: 'Fits your strong logic and math aptitude' },
              { title: 'UX/UI Product Designer', score: 85, status: 'Great Match', desc: 'Combines your creative and tech skills' },
              { title: 'Robotics Engineer', score: 78, status: 'Growing Fit', desc: 'Match with your physics academic scores' },
            ].map((career, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold">{career.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sky-400">{career.score}%</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 uppercase tracking-wider">{career.status}</span>
                </div>
                <p className="text-xs text-slate-400">{career.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps / Roadmap */}
        <div className="glass-card p-6 rounded-3xl">
          <h3 className="font-bold text-lg mb-4">Current Roadmap: <span className="text-sky-400 italic">Class 11 (Science)</span></h3>
          <div className="space-y-4">
            {[
              { step: 'Complete Physics Chapter 4 (Mechanics)', date: 'Due Tomorrow', done: false, priority: true },
              { step: 'Register for SAT Practice Test', date: 'Next Week', done: false, priority: false },
              { step: 'Python Basics for AI Certification', date: 'In Progress', done: false, priority: false },
              { step: 'Aptitude Test Stage 1', date: 'Completed', done: true, priority: false },
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 ${task.done ? 'text-emerald-500' : 'text-slate-500'}`}>
                  {task.done ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-600" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${task.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                    {task.step}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5 flex items-center gap-2">
                    {task.date}
                    {task.priority && !task.done && (
                      <span className="inline-flex items-center gap-1 text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        Priority
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            Open Full Planner
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
