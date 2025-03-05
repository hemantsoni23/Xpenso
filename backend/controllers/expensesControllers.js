const mongoose = require('mongoose');
const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const expense = await Expense.create({
      userId: req.user.id,
      amount,
      category,
      description,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Expense creation failed", error });
  }
};

const getAllExpenses = async (req, res) => {
  const { category, date } = req.query;
  let query = { userId: req.user.id };

  if (category) query.category = category;
  if (date) query.date = { $gte: new Date(date), $lt: new Date(date).setDate(new Date(date).getDate() + 1) };

  try {
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch expenses", error });
  }
};

const getTotalExpenses = async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: "Both start and end dates are required" });
  }

  try {
    const startDate = new Date(`${start}T00:00:00Z`);
    const endDate = new Date(`${end}T23:59:59.999Z`);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    if (startDate > endDate) {
      return res.status(400).json({ message: "Start date cannot be after end date" });
    }

    const total = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id), 
          date: { 
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    res.status(200).json({ total: total[0]?.totalAmount || 0 });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate total expenses",
      error: error.message
    });
  }
};

module.exports = { createExpense, getAllExpenses, getTotalExpenses };
