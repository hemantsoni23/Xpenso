const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddlewares.js");
const {
  createExpense,
  getAllExpenses,
  getTotalExpenses,
} = require("../controllers/expensesControllers.js");

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getAllExpenses);
router.get("/total", authMiddleware, getTotalExpenses);

module.exports = router;
