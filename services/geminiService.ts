
import { GoogleGenAI, GenerateContentResponse, Content, Part } from "@google/genai";
import { ProcessedAiResponse, GroundingSource, WebGroundingSource } from '../types';

const API_KEY = process.env.API_KEY; 
const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const generateTextWithSearch = async (prompt: string): Promise<ProcessedAiResponse> => {
  if (!API_KEY) {
    // This case should ideally be caught by App.tsx, but good to have a safeguard.
    console.error("API_KEY is not available in geminiService.");
    throw new Error("API_KEY environment variable not set. Cannot call Gemini API.");
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const contents: Content[] = [{ role: "user", parts: [{text: prompt}] }];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    
    // Type assertion for rawChunks, assuming it matches WebGroundingSource structure if present
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as Part[] | WebGroundingSource[] | undefined;
    const sources: GroundingSource[] = [];

    if (rawChunks) {
      rawChunks.forEach((chunk) => {
        // Type guard to check if chunk has a 'web' property and it's structured as expected.
        // The actual type of items in groundingChunks can be complex (it's Part[]),
        // so we need to safely access 'web'.
        const webChunk = chunk as WebGroundingSource; // Cast to our expected structure
        if (webChunk.web && webChunk.web.uri) {
          sources.push({
            uri: webChunk.web.uri,
            title: webChunk.web.title || webChunk.web.uri, // Use URI as fallback for title
          });
        }
      });
    }
    
    return { text, sources };

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific API error messages if needed
        if (error.message.includes("API key not valid")) {
             throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
        }
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
