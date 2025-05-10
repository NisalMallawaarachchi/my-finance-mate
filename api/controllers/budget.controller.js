import xlsx from "xlsx";
import Budget from "../models/budget.model.js";

// Add Budget
export const addBudget = async (req, res) => {
    try {
        const { month, essential, wants, savings, date } = req.body;

        if (!month || !essential || !wants || !savings || !date) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure essential, wants, and savings are numbers greater than 0
        if ([essential, wants, savings].some(value => isNaN(value) || value <= 0)) {
            return res.status(400).json({ message: "Essential, Wants, and Savings must be numbers greater than 0." });
        }

        const newBudget = new Budget({ month, essential, wants, savings, date: new Date(date) });

        await newBudget.save();
        res.status(200).json(newBudget);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }

    
};

// Get All Budgets
export const getAllBudget = async (req, res) => {
    try {
        const budgets = await Budget.find().sort({ date: -1 });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update Budget
export const updateBudget = async (req, res) => {
    try {
        const id = req.params.id;
        const { month, essential, wants, savings, date } = req.body;

        if (!month || !essential || !wants || !savings || !date) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure essential, wants, and savings are numbers greater than 0
        if ([essential, wants, savings].some(value => isNaN(value) || value <= 0)) {
            return res.status(400).json({ message: "Essential, Wants, and Savings must be numbers greater than 0." });
        }

        const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { month, essential, wants, savings, date: new Date(date) },
            { new: true }
        );

        if (!updatedBudget) {
            return res.status(404).json({ message: "Budget item not found" });
        }

        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Budget
export const deleteBudget = async (req, res) => {
    try {
        const id = req.params.id;
        await Budget.findByIdAndDelete(id);
        res.status(200).json({ status: "Budget item deleted" });
    } catch (error) {
        res.status(500).json({ status: "Error deleting item", error: error.message });
    }
};

// Download Budget as Excel
export const downloadBudgetExcel = async (req, res) => {
    try {
        const budgets = await Budget.find().sort({ date: -1 });

        const data = budgets.map((item) => ({
            Month: item.month,
            Essential: item.essential,
            Wants: item.wants,
            Savings: item.savings,
            Date: item.date.toISOString().split("T")[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Budget");
        const filePath = "./Budget_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
