import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Route, 
  MessageSquare, 
  Target, 
  TrendingUp,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Route, label: 'Career Roadmaps', path: '/roadmap' },
    { icon: MessageSquare, label: 'AI Mentor', path: '/mentor' },
    { icon: BrainCircuit, label: 'Profile AI', path: '/profile' },
    { icon: Target, label: 'Skill Analysis', path: '/skills' },
    { icon: TrendingUp, label: 'Growth Tracking', path: '/growth' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 glass-card border-r border-white/5 bg-slate-900/30 hidden lg:flex flex-col p-4">
      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive 
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm shadow-sky-500/5' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-auto space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Help Center</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
