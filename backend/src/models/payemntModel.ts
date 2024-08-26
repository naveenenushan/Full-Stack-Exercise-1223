import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    grid: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

export const payment = mongoose.model('Payments', paymentSchema);
