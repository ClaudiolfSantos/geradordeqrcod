import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { Download } from 'lucide-react';

interface QrDisplayProps {
  url: string;
  fgColor?: string;
  bgColor?: string;
}

const QrDisplay: React.FC<QrDisplayProps> = ({ url, fgColor = "#000000", bgColor = "#ffffff" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const downloadPng = () => {
    const container = containerRef.current;
    if (!container) return;

    // Encontrar o elemento SVG real dentro do container
    const svgOriginal = container.querySelector('svg');
    if (!svgOriginal) return;

    // Clonar para modificar atributos para a versão de download sem afetar a UI
    const svgClone = svgOriginal.cloneNode(true) as SVGElement;
    
    // Definir um tamanho fixo de alta resolução para o download (2048px para máxima nitidez)
    const size = 2048;
    svgClone.setAttribute("width", `${size}px`);
    svgClone.setAttribute("height", `${size}px`);
    
    // Serializar o SVG clonado
    const svgData = new XMLSerializer().serializeToString(svgClone);
    
    const canvas = document.createElement("canvas");
    // Adicionar padding (margem branca ao redor)
    const padding = size * 0.1; // 10% de padding para respirar melhor
    const canvasSize = size + (padding * 2);
    
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Preencher o fundo
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    
    // Configurar crossOrigin para evitar problemas de taint no canvas
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Desenhar a imagem centralizada
      ctx.drawImage(img, padding, padding, size, size);
      
      try {
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `motocar-qrcode-${Date.now()}.png`;
          downloadLink.href = pngFile;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
      } catch (e) {
          console.error("Erro ao gerar PNG:", e);
          alert("Não foi possível gerar a imagem para download. Tente novamente.");
      }
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
        alert("Erro ao processar o QR Code para imagem.");
    };

    // Usar Blob para garantir codificação correta
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    img.src = blobUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50">
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner mb-6 relative group transition-transform duration-300 hover:scale-105">
        <div ref={containerRef} className="h-auto max-w-full w-full flex justify-center bg-white">
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={url || "https://google.com"}
            viewBox={`0 0 256 256`}
            fgColor={fgColor}
            bgColor={bgColor}
            />
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={downloadPng}
          className="flex-1 flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-red-500/20 active:scale-95"
        >
          <Download size={18} />
          <span>Baixar PNG</span>
        </button>
      </div>
    </div>
  );
};

export default QrDisplay;