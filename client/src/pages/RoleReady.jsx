import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, FileText, CheckCircle2, CloudUpload } from 'lucide-react';
import api from '../api/axios';

const RoleReady = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data.data);
    } catch (err) {
      setError('Failed to upload and parse resume. ' + (err.response?.data?.error || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto relative z-10 py-10">
      <Link to="/dashboard" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-3 flex justify-center items-center gap-3">
            <FileText className="w-8 h-8 text-amber-400" /> RoleReady
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Upload your resume to extract key technical skills and generate a personalized 7-day micro-learning roadmap to level up.</p>
        </div>

        {/* Upload Section */}
        {!result && (
          <div className="max-w-xl mx-auto">
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                dragActive ? 'border-amber-400 bg-amber-500/10' : 
                file ? 'border-amber-500/50 bg-amber-500/5' : 
                'border-white/20 hover:border-amber-400/50 hover:bg-white/5 bg-slate-800/50'
              }`}
            >
              {file ? (
                <FileText className="w-16 h-16 text-amber-400 mb-4" />
              ) : (
                <CloudUpload className={`w-16 h-16 mb-4 ${dragActive ? 'text-amber-400' : 'text-slate-500'}`} />
              )}
              
              <h3 className="text-xl font-medium text-white mb-2">
                {file ? file.name : 'Drag & Drop your Resume'}
              </h3>
              <p className="text-sm text-slate-400">PDF or DOCX (max 5MB)</p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.docx"
              />
            </div>

            {error && <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">{error}</div>}

            <button 
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-8 w-full py-4 bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Resume...</> : <><Upload className="w-5 h-5 mr-2" /> Generate Roadmap</>}
            </button>
          </div>
        )}

        {/* Result Section */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {/* Parsed Skills */}
            <div className="md:col-span-1 bg-slate-800/50 border border-white/5 p-6 rounded-xl h-max">
              <h3 className="font-semibold text-white mb-4 flex items-center"><Zap className="w-4 h-4 mr-2 text-amber-400" /> Identified Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.resume.parsed_skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => {setResult(null); setFile(null);}}
                className="mt-8 text-sm text-slate-400 hover:text-white transition-colors w-full text-center py-2 rounded border border-white/10 hover:bg-white/5"
              >
                Upload different resume
              </button>
            </div>

            {/* 7-Day Roadmap */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-white mb-6 text-xl">7-Day Micro-Learning Roadmap</h3>
              <div className="space-y-4">
                {Object.entries(result.roadmap.roadmap_data).map(([day, task], idx) => (
                  <div key={idx} className="flex bg-slate-800/50 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition-colors group">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm mb-2">{day}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleReady;
