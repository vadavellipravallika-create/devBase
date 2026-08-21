import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, FileText, ChevronRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Glass Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">DevBase</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard" className="px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2 text-slate-300 hover:text-white font-medium transition-colors">Log in</Link>
                <Link to="/register" className="px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Platform v1.0 is Live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white">
            Your 4-Year AI-Powered <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Engineering Career Companion
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Master your university exams, debug code instantly with AI, and generate tailored micro-learning roadmaps from your resume to become industry-ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={user ? "/dashboard" : "/register"} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {user ? "Enter DevBase" : "Get Started Free"} <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="#modules" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 backdrop-blur-sm transition-all flex items-center justify-center">
              Explore Modules
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div id="modules" className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {/* ExamScope Card */}
          <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 group-hover:border-indigo-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/20">
                <BookOpen className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">ExamScope</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Access curated semester revision modules and practice question banks to ace your exams with instant scoring.</p>
            </div>
          </div>

          {/* FixMyCode Card */}
          <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 group-hover:border-emerald-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/20">
                <Code className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">FixMyCode</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Stuck on a bug? Paste your code and let our Gemini-powered AI analyze, debug, and rewrite it instantly.</p>
            </div>
          </div>

          {/* RoleReady Card */}
          <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 group-hover:border-amber-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center mb-6 border border-amber-500/20">
                <FileText className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">RoleReady</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Upload your resume to extract key technical skills and generate a personalized 7-day micro-learning roadmap.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
