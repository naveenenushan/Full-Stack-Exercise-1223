import express from 'express';
import health from './healthRoute';

const routes = express.Router();

routes.get('/health', health);

export default routes;
