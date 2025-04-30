import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {           // Optional: Add if you want to categorize income (e.g., Salary, Freelance, etc.)
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Income = mongoose.model("Income", incomeSchema);
export default Income;
