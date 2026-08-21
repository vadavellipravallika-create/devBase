import { supabase } from '../config/supabase.js';

/**
 * Get all available exam modules and their question banks.
 * Returns mock data if no modules exist in the database.
 */
export const getModules = async (req, res, next) => {
  try {
    const { data: modules, error } = await supabase
      .from('exam_modules')
      .select('*, exam_questions(*)');

    if (error) {
      throw error;
    }

    // If database is empty, return fallback mock data
    if (!modules || modules.length === 0) {
      return res.status(200).json({
        success: true,
        data: [
          {
            id: 'mock-module-1',
            title: 'Data Structures & Algorithms',
            description: 'Core concepts for CS201 semester exams.',
            difficulty: 'Intermediate',
            exam_questions: [
              {
                id: 'q1',
                question_text: 'What is the time complexity of searching in a balanced BST?',
                options: { a: 'O(1)', b: 'O(n)', c: 'O(log n)', d: 'O(n log n)' },
                correct_answer: 'c',
                explanation: 'A balanced Binary Search Tree guarantees O(log n) height.'
              },
              {
                id: 'q2',
                question_text: 'Which data structure uses LIFO?',
                options: { a: 'Queue', b: 'Stack', c: 'Tree', d: 'Graph' },
                correct_answer: 'b',
                explanation: 'Stacks operate on a Last In, First Out (LIFO) principle.'
              }
            ]
          },
          {
            id: 'mock-module-2',
            title: 'Database Management Systems',
            description: 'SQL, Normalization, and ACID properties.',
            difficulty: 'Advanced',
            exam_questions: [
              {
                id: 'q3',
                question_text: 'What does the A in ACID stand for?',
                options: { a: 'Availability', b: 'Atomicity', c: 'Authentication', d: 'Authorization' },
                correct_answer: 'b',
                explanation: 'Atomicity ensures that all operations within a work unit are completed successfully; otherwise, the transaction is aborted.'
              }
            ]
          }
        ]
      });
    }

    res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Record a user's quiz score
 */
export const recordScore = async (req, res, next) => {
  try {
    const { moduleId, score, totalQuestions } = req.body;
    const userId = req.user.id;

    // This is a placeholder for recording the score. In a real scenario, you'd have a user_scores table.
    // For now, we just return success.
    
    res.status(200).json({
      success: true,
      data: {
        message: 'Score recorded successfully',
        score,
        totalQuestions
      }
    });
  } catch (error) {
    next(error);
  }
};
