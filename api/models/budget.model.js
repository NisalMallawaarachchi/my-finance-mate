import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
    {
        
        month: { type: String, required: true },
        essential: { type: Number, required: true }, 
        wants: { type: Number, required: true },
        savings: { type: Number, required: true },
        date: { type: Date, default: Date.now }, 
    },
    { timestamps: true }
);

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;
