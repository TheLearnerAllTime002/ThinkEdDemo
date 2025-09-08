// Gemini AI API Service
const GEMINI_API_KEY = 'AIzaSyDUxl95hXmSp4Vj-VRx2gJu3JUg_g8p1CU';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseUrl = GEMINI_API_URL;
  }

  async generateResponse(message, context = {}) {
    try {
      const { subject = 'general', conversationHistory = [] } = context;
      
      // Create a system prompt based on the subject
      const systemPrompt = this.getSystemPrompt(subject);
      
      // Prepare the conversation context
      const conversationContext = conversationHistory
        .slice(-6) // Keep last 6 messages for context
        .map(msg => `${msg.isUser ? 'Student' : 'Tutor'}: ${msg.content}`)
        .join('\n');

      const fullPrompt = `${systemPrompt}

Previous conversation:
${conversationContext}

Current question: ${message}

Please provide a helpful, educational response as an AI tutor. Use clear explanations, examples when appropriate, and encourage learning.`;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return {
          content: data.candidates[0].content.parts[0].text,
          success: true
        };
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return {
        content: this.getFallbackResponse(message),
        success: false,
        error: error.message
      };
    }
  }

  getSystemPrompt(subject) {
    const prompts = {
      mathematics: `You are an expert mathematics tutor. Help students understand mathematical concepts through clear explanations, step-by-step solutions, and practical examples. Focus on building understanding rather than just providing answers.`,
      
      science: `You are a knowledgeable science tutor covering physics, chemistry, biology, and earth sciences. Explain scientific concepts clearly, use real-world examples, and encourage scientific thinking and curiosity.`,
      
      english: `You are an English language and literature tutor. Help students with grammar, writing, reading comprehension, and literary analysis. Provide constructive feedback and encourage creative expression.`,
      
      history: `You are a history tutor with expertise in world history, historical analysis, and critical thinking. Help students understand historical events, their causes and effects, and their relevance to today.`,
      
      programming: `You are a programming tutor skilled in multiple programming languages and computer science concepts. Help students learn to code through clear explanations, examples, and debugging assistance.`,
      
      general: `You are a knowledgeable AI tutor ready to help with various academic subjects. Adapt your teaching style to the student's needs and provide clear, helpful explanations.`
    };

    return prompts[subject] || prompts.general;
  }

  getFallbackResponse(message) {
    const fallbacks = [
      "I'm having trouble connecting right now, but I'd love to help you with that! Could you try asking your question again?",
      "It seems there's a temporary issue with my connection. Let me try to help you with a general approach to this topic.",
      "I'm experiencing some technical difficulties, but I'm still here to help! Could you rephrase your question?"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Generate quick action suggestions based on the response
  generateQuickActions(subject, responseContent) {
    const actions = {
      mathematics: ["Show Example", "Practice Problems", "Explain Step-by-Step", "Related Concepts"],
      science: ["Real-world Examples", "Experiments", "Deeper Explanation", "Related Topics"],
      english: ["Grammar Check", "Writing Tips", "Examples", "Practice Exercises"],
      history: ["Timeline", "Key Figures", "Causes & Effects", "Modern Relevance"],
      programming: ["Code Example", "Debug Help", "Best Practices", "Next Steps"],
      general: ["Explain More", "Give Example", "Practice Quiz", "Related Topics"]
    };

    return actions[subject] || actions.general;
  }
}

export default new GeminiService();