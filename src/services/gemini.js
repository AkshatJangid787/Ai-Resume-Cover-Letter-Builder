import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateContent = async (prompt, type = 'resume') => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const systemPrompt = type === 'resume' 
      ? "You are a professional resume writer. Generate content that is concise, impactful, and highlights achievements."
      : "You are a professional cover letter writer. Generate personalized content that connects experiences with job requirements.";
    
    const fullPrompt = `${systemPrompt}\n\n${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};