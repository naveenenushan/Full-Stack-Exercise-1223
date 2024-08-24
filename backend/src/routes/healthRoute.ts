import express from 'express';
import { checkHealth } from '../controllers/healthController';

const health = express.Router();

health.get('/health', checkHealth);

export default health;
