import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Loader2, ArrowLeft } from 'lucide-react';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.data.token, res.data.data.user);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.details?.[0]?.message || err.response?.data?.error || 'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Log in to your DevBase account</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm mb-6 text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
