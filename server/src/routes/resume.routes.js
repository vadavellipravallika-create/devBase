import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { uploadResume } from '../middleware/upload.middleware.js';
import { uploadAndParseResume } from '../controllers/resume.controller.js';

const router = Router();

// Protect all resume routes
router.use(requireAuth);

router.post('/upload', uploadResume.single('resume'), uploadAndParseResume);

export default router;
