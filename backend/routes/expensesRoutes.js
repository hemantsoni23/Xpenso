import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import {
  createExpense,
  getAllExpenses,
  getTotalExpenses,
} from "../controllers/expensesControllers.js";

const router = express.Router();

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getAllExpenses);
router.get("/total", authMiddleware, getTotalExpenses);

export default router;
