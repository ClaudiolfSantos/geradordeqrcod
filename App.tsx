import React, { useState, useEffect } from 'react';
import { QrCode, Link as LinkIcon } from 'lucide-react';
import QrDisplay from './components/QrDisplay';

function App() {
  const [url, setUrl] = useState<string>('');
  const [debouncedUrl, setDebouncedUrl] = useState<string>('');

  // Debounce simples para evitar atualizações excessivas enquanto digita
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUrl(url);
    }, 300);
    return () => clearTimeout(timer);
  }, [url]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col select-none cursor-pointer" onClick={() => window.location.reload()}>
             {/* Logo Motocar SVG Inline (Prevents broken images) */}
             <div className="flex items-center gap-1">
                <svg viewBox="0 0 240 50" className="h-10 sm:h-11 w-auto fill-[#FF0000]" xmlns="http://www.w3.org/2000/svg" aria-label="Motocar Logo">
                    <g transform="skewX(-15)">
                        <rect x="2" y="8" width="30" height="7" />
                        <rect x="2" y="19" width="30" height="7" />
                        <rect x="2" y="30" width="30" height="7" />
                    </g>
                    <text x="40" y="38" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="42" letterSpacing="-2">motocar</text>
                </svg>
             </div>
             <span className="text-[11px] font-bold text-[#FF0000] tracking-wide pl-[45px] -mt-1 opacity-90">
               Há sempre uma perto de você!
             </span>
          </div>

          {/* WhatsApp Contact Button */}
          <a 
            href="https://wa.me/5521974207890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-2 px-3 sm:px-4 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 group"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-xs sm:text-sm font-semibold leading-tight text-left">
              <span className="block text-[10px] opacity-90 font-normal">Em caso de dúvidas</span>
              Fale comigo
            </span>
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col gap-12">
          
          {/* Hero / Input Section */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Gerador de QR Code <br/>
              <span className="text-[#FF0000]">Institucional</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Insira o link abaixo para criar seu QR Code instantâneo.
            </p>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative flex items-center bg-white rounded-xl p-2 border border-slate-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 transition-all shadow-xl shadow-slate-200/50">
                <LinkIcon className="ml-3 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Cole seu link aqui (ex: https://motocar.com.br)"
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 h-12 px-3 text-lg"
                  value={url}
                  onChange={handleInputChange}
                  autoFocus
                />
                {url && (
                    <button 
                        onClick={() => setUrl('')}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                        Limpar
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Centered QR Code Section */}
          <div className="w-full max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
                <QrCode size={18} />
                <h3 className="font-semibold text-slate-800">Seu QR Code</h3>
              </div>
              
              <QrDisplay url={debouncedUrl} />
              
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-700 text-center">
                <p><strong>Dica:</strong> O código gerado é compatível com todos os dispositivos móveis e pode ser usado em materiais impressos.</p>
              </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 mt-auto bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Motocar. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;