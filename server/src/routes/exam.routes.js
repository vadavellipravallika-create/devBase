import express from 'express';
import { getModules, recordScore } from '../controllers/exam.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/modules', getModules);
router.post('/score', recordScore);

export default router;
