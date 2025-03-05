import { useState } from "react";
import { totalExpenseAPI } from "../services/expenseApi";
import { toast } from "react-hot-toast";

const TotalExpenseModal = ({ onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both dates!");
      return;
    }
    if (startDate > endDate) {
      toast.error("Start Date cannot be greater than End Date!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await totalExpenseAPI(startDate, endDate);
      setTotal(data.total);
    } catch (error) {
      toast.error("Failed to calculate total expenses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-primary">Calculate Total Expense</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted">End Date</label>
            <input
              type="date"
              className="w-full p-2 border border-border rounded-lg bg-background"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <button
            onClick={handleCalculate}
            className="bg-primary w-full py-2 rounded-lg text-background font-bold hover:bg-secondary transition-all"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </div>

        {total !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-primary">Total Expense</h3>
            <p className="text-2xl font-bold">{total ? `₹${total}` : "---"}</p>
          </div>
        )}

        <button
            type="button"
            onClick={onClose}
            className="bg-destructive mt-4 text-white w-full p-2 rounded-lg hover:bg-destructive-hover transition-all"
            >
            Close
        </button>
      </div>
    </div>
  );
};

export default TotalExpenseModal;
