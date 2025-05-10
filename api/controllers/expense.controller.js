import Expense from '../models/Expense.model.js';

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });//desc order
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body); //new json object
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};