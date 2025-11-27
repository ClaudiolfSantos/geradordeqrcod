import React, { useEffect, useState } from 'react';
import { LinkAnalysis, AnalysisStatus } from '../types';
import { Bot, ShieldCheck, ShieldAlert, Tag, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface AnalysisCardProps {
  status: AnalysisStatus;
  data: LinkAnalysis | null;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ status, data }) => {
  if (status === AnalysisStatus.IDLE) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl border-dashed shadow-sm">
        <Sparkles size={48} className="mb-4 text-slate-300" />
        <p>Insira um link para gerar o QR Code e ver a análise da IA.</p>
      </div>
    );
  }

  if (status === AnalysisStatus.LOADING) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
        <Loader2 size={48} className="mb-4 text-[#FF0000] animate-spin" />
        <p className="text-slate-500 font-medium">O Gemini está analisando o link...</p>
      </div>
    );
  }

  if (status === AnalysisStatus.ERROR || !data) {
    return (
      <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-700 flex flex-col items-center text-center">
        <AlertCircle size={32} className="mb-2 text-red-500" />
        <p className="font-semibold">Não foi possível analisar este link.</p>
        <p className="text-sm mt-1 opacity-80">Verifique a URL e tente novamente.</p>
      </div>
    );
  }

  const isSafe = data.safety.toLowerCase().includes('seguro');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50 relative overflow-hidden h-full">
      
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000] to-red-400"></div>

      <div className="flex items-center gap-2 mb-4 text-[#FF0000]">
        <Bot size={20} />
        <span className="text-xs font-bold uppercase tracking-wider">Insights Motocar AI</span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{data.title}</h3>
      
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
        {data.summary}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${isSafe ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
          {isSafe ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
          {data.safety}
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-600">
          <Tag size={14} />
          {data.category}
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;