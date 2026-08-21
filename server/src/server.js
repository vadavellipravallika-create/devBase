import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import examRoutes from './routes/exam.routes.js';

dotenv.config({ path: '../.env' }); // Adjust if .env is inside server folder

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/exam', examRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'DevBase API is running' });
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
