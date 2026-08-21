import { GoogleGenAI } from '@google/genai';
import { supabase } from '../config/supabase.js';

// Initialize the SDK correctly using the new @google/genai module
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const fixMyCode = async (req, res, next) => {
  try {
    const { original_code, language } = req.body;
    const userId = req.user.id;

    if (!original_code || !language) {
      return res.status(400).json({ success: false, error: 'original_code and language are required' });
    }

    const prompt = `
      You are an expert ${language} debugger. Review the following code.
      Find all bugs, provide the corrected code, and explain the fixes.
      
      Code to debug:
      \`\`\`${language}
      ${original_code}
      \`\`\`
    `;

    // Strict JSON Structured Output Schema (using simple string literals for Types)
    const responseSchema = {
      type: "OBJECT",
      properties: {
        bugsFound: {
          type: "ARRAY",
          items: {
            type: "STRING"
          },
          description: "List of bugs found in the code"
        },
        correctedCode: {
          type: "STRING",
          description: "The complete, corrected code"
        },
        explanation: {
          type: "STRING",
          description: "Explanation of what was wrong and how it was fixed"
        }
      },
      required: ["bugsFound", "correctedCode", "explanation"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });

    // The output is strictly formatted JSON as a string
    const geminiAnalysis = JSON.parse(response.text());

    // Save the session to Supabase
    const { data: session, error } = await supabase
      .from('debug_sessions')
      .insert([
        {
          user_id: userId,
          original_code,
          language,
          gemini_analysis: geminiAnalysis
        }
      ])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }

    res.status(200).json({
      success: true,
      data: session
    });

  } catch (error) {
    next(error);
  }
};
