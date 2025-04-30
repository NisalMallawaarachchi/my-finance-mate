import xlsx from "xlsx";
import Income from "../models/income.model.js";
import path from "path";

// Add Income
export const addIncome = async (req, res) => {
  try {
    const { source, amount, category, date } = req.body;

    if (!source || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a number greater than 0." });
    }

    const newIncome = new Income({
      source,
      amount,
      category,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Income
export const getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update Income
export const updateIncome = async (req, res) => {
  try {
    const id = req.params.id;
    const { source, amount, category, date } = req.body;

    if (!source || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a number greater than 0." });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { source, amount, category, date: new Date(date) },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income item not found" });
    }

    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete Income
export const deleteIncome = async (req, res) => {
  try {
    const id = req.params.id;
    await Income.findByIdAndDelete(id);
    res.status(200).json({ status: "Income item deleted" });
  } catch (error) {
    res.status(500).json({ status: "Error deleting item", error: error.message });
  }
};

// Download Income as Excel
export const downloadIncomeExcel = async (req, res) => {
    try {
      const incomes = await Income.find().sort({ date: -1 });
  
      const data = incomes.map((item) => ({
        Source: item.source,
        Amount: item.amount,
        Category: item.category,
        Date: item.date.toISOString().split("T")[0],
      }));
  
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, "Income");
  
      const filePath = path.resolve("Income_details.xlsx");
      xlsx.writeFile(wb, filePath);
  
      // Set headers manually (optional but safer)
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="Income_details.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
  
      res.download(filePath);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
