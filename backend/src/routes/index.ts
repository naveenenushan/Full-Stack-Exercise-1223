import express from 'express';
import { checkHealth } from '../controllers/healthController';

const router = express.Router();

router.get('/health', checkHealth);





export default router;