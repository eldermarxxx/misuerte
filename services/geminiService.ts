import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAiInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key não encontrada. O gerador funcionará em modo fallback (aleatório).");
    return null;
  }

  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const generateLuckyNumbers = async (
  context: string,
  min: number,
  max: number,
  count: number
): Promise<number[]> => {
  const ai = getAiInstance();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `O usuário quer números da sorte baseados neste contexto: "${context}".
                   Gere exatamente ${count} números inteiros únicos e aleatórios entre ${min} e ${max} que sejam "misticamente" alinhados com o contexto.
                   Retorne APENAS um array JSON de números.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.INTEGER,
            },
          },
          temperature: 1, // High temperature for creativity/randomness
        },
      });

      if (response.text) {
        const numbers = JSON.parse(response.text);
        // Ensure strict adherence to limits locally just in case
        return numbers.filter((n: number) => n >= min && n <= max).slice(0, count);
      }
    } catch (error) {
      console.error("Erro ao gerar números da sorte via Gemini:", error);
    }
  }

  // Fallback simple randomizer if API fails or is not configured
  console.log("Usando gerador aleatório de fallback.");
  const fallback: number[] = [];
  while (fallback.length < count) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!fallback.includes(n)) fallback.push(n);
  }
  return fallback;
};
