import express from 'express';
import health from './healthRoute';
import grid from './gridRoute';

const routes = express.Router();

routes.get('/health', health);
routes.post('/grid', grid);

export default routes;


