import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { fixMyCode } from '../controllers/ai.controller.js';

const router = Router();

// Protect all AI routes
router.use(requireAuth);

router.post('/fix-my-code', fixMyCode);

export default router;
