import express from "express";
import {
  addIncome,
  getAllIncome,
  updateIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/income.controller.js";

const router = express.Router();

router.post("/add", addIncome);
router.get("/get", getAllIncome);
router.put("/update/:id", updateIncome);
router.delete("/:id", deleteIncome);
router.get("/downloadexcel", downloadIncomeExcel); // Optional if you're exporting

export default router;
