import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Bug, Check, Lightbulb } from 'lucide-react';
import api from '../api/axios';

const FixMyCode = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const res = await api.post('/ai/fix-my-code', { original_code: code, language });
      setAnalysis(res.data.data.gemini_analysis);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-100px)] flex flex-col relative z-10">
      <Link to="/dashboard" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6 transition-colors w-max">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left Column: Input */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Code className="w-5 h-5 text-emerald-400" /> Code Editor</h2>
            <select 
              className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:border-emerald-500/50 transition-colors"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <div className="flex-grow flex flex-col relative mb-4">
            <textarea
              className="w-full h-full p-4 font-mono text-sm bg-slate-950/50 border border-white/5 rounded-xl text-slate-300 focus:outline-none focus:border-emerald-500/30 resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your buggy code here..."
              spellCheck="false"
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || !code.trim()}
            className="w-full py-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</> : 'Debug Code with AI'}
          </button>
        </div>

        {/* Right Column: Output */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-y-auto shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">AI Analysis</h2>
          
          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-4">{error}</div>}
          
          {!analysis && !loading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <Code className="w-16 h-16 mb-4" />
              <p>Submit code to see the analysis and refactored result here.</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Bugs Found */}
              <div className="bg-slate-800/50 border border-red-500/20 p-5 rounded-xl">
                <h3 className="font-semibold text-red-400 mb-3 flex items-center"><Bug className="w-4 h-4 mr-2" /> Bugs Found</h3>
                <ul className="space-y-2">
                  {analysis.bugsFound.map((bug, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                      <span className="text-red-400 mr-2">•</span> {bug}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explanation */}
              <div className="bg-slate-800/50 border border-amber-500/20 p-5 rounded-xl">
                <h3 className="font-semibold text-amber-400 mb-3 flex items-center"><Lightbulb className="w-4 h-4 mr-2" /> Explanation</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {analysis.explanation}
                </p>
              </div>

              {/* Corrected Code */}
              <div className="bg-slate-950 border border-emerald-500/20 p-1 rounded-xl overflow-hidden">
                <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/20 flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-2" />
                  <h3 className="font-semibold text-emerald-400 text-sm">Corrected Code</h3>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300">
                  <code>{analysis.correctedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixMyCode;
