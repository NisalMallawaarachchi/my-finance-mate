import express from 'express';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expense.controller.js';

const router = express.Router();

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;