const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpenses,
  filterExpenses,
  getTotalExpenses,
} = require("../controllers/expensesController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getExpenses);
router.get("/total", authMiddleware, getTotalExpenses);
router.get("/filter", authMiddleware, filterExpenses);

module.exports = router;