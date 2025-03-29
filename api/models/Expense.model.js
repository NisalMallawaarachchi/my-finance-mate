import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Home utilities',
      'Transportation',
      'Food & dining',
      'Health & insurance',
      'Shopping entertainment',
      'Education',
      'Other',
    ],
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;