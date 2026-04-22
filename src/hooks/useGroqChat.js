import { useState } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Since this is a direct frontend implementation as requested
});

export const useGroqChat = () => {
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userMessage, relevantQA, onChunk) => {
    setIsTyping(true);
    
    const contextStr = relevantQA.length > 0 
      ? "Here is some relevant information from our knowledge base:\n" + 
        relevantQA.map(qa => `Q: ${qa.question}\nA: ${qa.answer}`).join('\n\n')
      : "I don't have specific information in my knowledge base for this, but I will try to help based on general knowledge about ADYPU.";

    const systemPrompt = `You are "CollegeBot", the official AI assistant for Ajeenkya DY Patil University (ADYPU). 
Your tone is welcoming, accurate, and professional.

IMPORTANT GUIDELINES:
1. PRIORITIZE the "Knowledge Base" information provided below. It contains official university data.
2. If the answer is in the context, use it precisely.
3. If the answer is NOT in the context, use your general knowledge about ADYPU but be cautious.
4. If you are totally unsure, politely ask the student to visit the university's administrative office or check the website.
5. Use bullet points and clear formatting for readability.

### KNOWLEDGE BASE CONTEXT:
${contextStr}`;

    try {
      const stream = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        model: 'llama-3.3-70b-versatile',
        stream: true,
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        onChunk(fullResponse);
      }
      
      setIsTyping(false);
      return fullResponse;
    } catch (error) {
      console.error('Groq API Error:', error);
      setIsTyping(false);
      onChunk("Sorry, I encountered an error connecting to the AI service. Please try again.");
      return null;
    }
  };

  return { sendMessage, isTyping };
};
