import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  // In a real app, ensure this is set. For this demo, we handle the missing key gracefully in UI.
  const apiKey = process.env.API_KEY || ''; 
  return new GoogleGenAI({ apiKey });
};

export const analyzeMarket = async (marketTitle: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Please configure the API_KEY to use AI analysis features.";
  }

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following prediction market question briefly. Provide a short, witty insight on what factors might influence the outcome. Keep it under 50 words. Question: "${marketTitle}"`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Analysis temporarily unavailable.";
  }
};