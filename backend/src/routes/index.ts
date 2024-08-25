import express from 'express';
import health from './healthRoute';
import grid from './gridRoute';
import payment from './paymentRoute';
const routes = express.Router();

routes.get('/health', health);
routes.post('/grid', grid);
routes.post('/payment', payment);
export default routes;


