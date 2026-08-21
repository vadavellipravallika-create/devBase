import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';
import api from '../api/axios';

const ExamScope = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await api.get('/exam/modules');
        setModules(res.data.data);
      } catch (error) {
        console.error("Failed to load modules");
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const startQuiz = (mod) => {
    setActiveQuiz(mod);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  const handleAnswerSelect = (optionKey) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionKey
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuiz.exam_questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // In a real scenario, we'd send the score to backend here.
    }
  };

  const calculateScore = () => {
    let score = 0;
    activeQuiz.exam_questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_answer) score++;
    });
    return score;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto relative z-10">
      <Link to="/dashboard" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      
      {!activeQuiz ? (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Exam Modules</h1>
            <p className="text-slate-400">Select a module to begin your practice session.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map(mod => (
              <div key={mod.id} className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-slate-400 mb-4">{mod.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">{mod.difficulty}</span>
                  <button onClick={() => startQuiz(mod)} className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors font-medium">
                    Start Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl">
          <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{activeQuiz.title}</h2>
            <span className="text-slate-400 text-sm">Question {currentQuestionIndex + 1} of {activeQuiz.exam_questions.length}</span>
          </div>

          {!quizFinished ? (
            <div className="space-y-6">
              <h3 className="text-xl text-slate-200 leading-relaxed font-medium">
                {activeQuiz.exam_questions[currentQuestionIndex].question_text}
              </h3>
              
              <div className="space-y-3">
                {Object.entries(activeQuiz.exam_questions[currentQuestionIndex].options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedAnswers[currentQuestionIndex] === key 
                        ? 'border-indigo-500 bg-indigo-500/20 text-white' 
                        : 'border-white/10 bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-3 uppercase text-indigo-400">{key}.</span> {value}
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestionIndex]}
                  className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {currentQuestionIndex === activeQuiz.exam_questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
                <span className="text-4xl font-bold text-indigo-400">{calculateScore()}/{activeQuiz.exam_questions.length}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h2>
              <p className="text-slate-400 mb-8">You've successfully finished the practice module.</p>
              
              <div className="flex justify-center gap-4">
                <button onClick={() => setActiveQuiz(null)} className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all">
                  Back to Modules
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamScope;
