
import express from 'express';
import { saveSession, getSessions } from '../controllers/sessionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', verifyToken, saveSession);
router.get('/all', verifyToken, getSessions);

export default router;
