import express from 'express';
import { checkHealth } from '../controllers/healthController';
import  HealthResponse  from '../interfaces/HealthResponse';
const health = express.Router();



health.get<{}, HealthResponse>('/health', checkHealth);

export default health;


