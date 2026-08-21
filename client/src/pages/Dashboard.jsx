import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Code, FileText, LogOut, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const modules = [
    {
      title: 'ExamScope',
      description: 'Browse revision modules and take practice question banks.',
      icon: <BookOpen className="w-8 h-8 text-indigo-400 mb-4" />,
      link: '/examscope',
      color: 'from-indigo-500/20 to-transparent',
      borderColor: 'border-indigo-500/30'
    },
    {
      title: 'FixMyCode',
      description: 'Get AI-powered bug analysis and refactored code snippets.',
      icon: <Code className="w-8 h-8 text-emerald-400 mb-4" />,
      link: '/fixmycode',
      color: 'from-emerald-500/20 to-transparent',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: 'RoleReady',
      description: 'Upload your resume to get 7-day micro-learning roadmaps.',
      icon: <FileText className="w-8 h-8 text-amber-400 mb-4" />,
      link: '/roleready',
      color: 'from-amber-500/20 to-transparent',
      borderColor: 'border-amber-500/30'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 relative z-10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h1 className="text-3xl font-bold text-white">Welcome, {user?.name || 'Student'}!</h1>
          </div>
          <p className="text-slate-400">Select a module below to continue your journey.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-md"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((mod, idx) => (
          <Link key={idx} to={mod.link} className="group relative p-[1px] rounded-2xl overflow-hidden bg-white/5">
            <div className={`absolute inset-0 bg-gradient-to-b ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className={`relative h-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 group-hover:${mod.borderColor} transition-colors flex flex-col`}>
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-slate-800/50 border border-white/5`}>
                {mod.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{mod.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">{mod.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
