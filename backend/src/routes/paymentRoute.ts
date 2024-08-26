import express from 'express';
import { addPayment, getPayments } from '../controllers/paymentController';

const payments = express.Router();

payments.post('/create', addPayment);
payments.get('/', getPayments);

export default payments;
