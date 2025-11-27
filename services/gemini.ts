import { GoogleGenAI, Type } from "@google/genai";
import { LinkAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeLink = async (url: string): Promise<LinkAnalysis> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  try {
    const prompt = `Analise o seguinte link: ${url}. 
    Use a Pesquisa Google para entender o conteúdo real da página.
    Retorne um objeto JSON com:
    1. 'title': O título provável da página.
    2. 'summary': Um resumo curto e atraente do que o usuário encontrará (máx 2 frases).
    3. 'category': Categoria do conteúdo (ex: Notícias, E-commerce, Blog, Social).
    4. 'safety': Indique se parece seguro (Seguro, Suspeito).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            category: { type: Type.STRING },
            safety: { type: Type.STRING }
          },
          required: ["title", "summary", "category", "safety"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as LinkAnalysis;

  } catch (error) {
    console.error("Error analyzing link:", error);
    // Fallback if AI fails or search is blocked
    return {
      title: "Link Fornecido",
      summary: "Não foi possível analisar o conteúdo detalhado deste link no momento, mas seu QR Code está pronto.",
      category: "Geral",
      safety: "Desconhecido"
    };
  }
};