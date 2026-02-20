import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Map,
  User,
  GitCompare,
  TrendingUp,
  Sparkles,
  Users,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: Sparkles, label: 'AI Analysis', primary: true },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', primary: false },
  { to: '/mentor', icon: MessageSquare, label: 'AI Mentor', primary: false },
  { to: '/roadmap', icon: Map, label: 'Roadmap', primary: false },
  { to: '/compare', icon: GitCompare, label: 'Compare', primary: false },
  { to: '/growth', icon: TrendingUp, label: 'Growth', primary: false },
  { to: '/counsellor', icon: Users, label: 'Counsellor', primary: false },
  { to: '/profile', icon: User, label: 'Profile', primary: false },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 p-5 min-h-screen">
      <div className="mb-8">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
          Career<span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Cube</span>
        </h1>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">AI Career Intelligence</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon: Icon, label, primary }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive
                ? primary
                  ? 'bg-gradient-to-r from-indigo-500 to-teal-500 text-white shadow-md'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`
            }
          >
            <Icon className="w-4.5 h-4.5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <p className="text-[9px] text-slate-400 font-medium uppercase tracking-widest">CareerCube AI v3.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
