import express from 'express';
import health from './healthRoute';
import grid from './gridRoute';
import payment from './paymentRoute';
const routes = express.Router();

routes.use('/health', health);
routes.use('/grid', grid);
routes.use('/payments/', payment);
export default routes;


