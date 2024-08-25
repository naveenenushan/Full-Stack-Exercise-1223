import express from 'express';
import { addPayment } from '../controllers/paymentController';

const grid = express.Router();



grid.post('/payment', addPayment);
// grid.get('/payment', getGrid);
export default grid;


