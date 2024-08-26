import { payment } from '../models/payemntModel';
import { TPayment } from '../types/paymentType';
export async function savePaymentData(paymentData: TPayment) {
  try {
    const newPayment = new payment(paymentData);
    const savedPayment = await newPayment.save();

    return savedPayment;
  } catch (error) {
    console.error('error: ', error);
    return null;
  }
}

export async function getPaymentsData() {
  try {
    const payments : TPayment[] = await payment.find();

    return payments;
  } catch (error) {
    console.error('error: ', error);
    return null;
  }
}
