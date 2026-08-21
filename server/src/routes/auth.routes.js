import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.middleware.js';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = Router();

// Validation Schemas
const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['student', 'admin']).optional(),
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  })
});

// Routes
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

export default router;
