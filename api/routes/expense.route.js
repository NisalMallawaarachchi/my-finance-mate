import express from 'express';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expense.controller.js';
//import { expCon} from '../controllers/expense.controller.js';
const router = express.Router();

router.get('/', getExpenses);
//router.get('/', expCon.getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;