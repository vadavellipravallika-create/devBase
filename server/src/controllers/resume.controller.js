import { supabase } from '../config/supabase.js';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const uploadAndParseResume = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No resume file uploaded' });
    }

    // In a real scenario, you'd extract text from the PDF/DOCX here. 
    // For now, we simulate extraction.
    const extractedText = "Extracted text placeholder... User claims to know React, Node.js, and PostgreSQL.";

    // Use Gemini to parse skills from the text
    const prompt = `
      Extract all technical skills from the following resume text and format them as a simple JSON array of strings.
      
      Resume:
      ${extractedText}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsedSkills = JSON.parse(response.text());

    // Insert into user_resumes
    const { data: resume, error: resumeError } = await supabase
      .from('user_resumes')
      .insert([
        {
          user_id: userId,
          resume_text: extractedText,
          parsed_skills: parsedSkills
        }
      ])
      .select('*')
      .single();

    if (resumeError) throw resumeError;

    // Generate a 7-day micro-learning roadmap based on skills
    const roadmapPrompt = `
      Create a 7-day micro-learning roadmap to level up these skills: ${parsedSkills.join(', ')}.
      Format the output as a JSON object with days 1 to 7 as keys, and a string description as values.
    `;

    const roadmapResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: roadmapPrompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const roadmapData = JSON.parse(roadmapResponse.text());

    // Insert into learning_roadmaps
    const { data: roadmap, error: roadmapError } = await supabase
      .from('learning_roadmaps')
      .insert([
        {
          user_id: userId,
          resume_id: resume.id,
          roadmap_data: roadmapData
        }
      ])
      .select('*')
      .single();

    if (roadmapError) throw roadmapError;

    res.status(201).json({
      success: true,
      data: {
        resume,
        roadmap
      }
    });

  } catch (error) {
    next(error);
  }
};
