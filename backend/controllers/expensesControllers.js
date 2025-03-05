const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const expense = await Expense.create({
      userId: req.user._id,
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
  let query = { userId: req.user._id };

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
    return res.status(400).json({ message: "Start and End date required" });
  }

  try {
    const total = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: new Date(start), $lte: new Date(end) },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({ total: total[0]?.totalAmount || 0 });
  } catch (error) {
    res.status(400).json({ message: "Failed to calculate total expenses", error });
  }
};

module.exports = { createExpense, getAllExpenses, getTotalExpenses };
