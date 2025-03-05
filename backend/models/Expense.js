import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Travel", "Shopping", "Entertainment", "Bills", "Health", "Education", "Rent", "Others"],
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.index({ userId: 1, date: -1 });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
