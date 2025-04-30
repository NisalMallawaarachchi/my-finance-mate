import express from "express";
import { addBudget, getAllBudget, deleteBudget, downloadBudgetExcel, updateBudget } from "../controllers/budget.controller.js";

const router = express.Router();

router.post("/add", addBudget);
router.get("/get", getAllBudget);
router.put("/update/:id", updateBudget); 
router.delete("/:id", deleteBudget);
router.get("/downloadexcel", downloadBudgetExcel);

export default router;
