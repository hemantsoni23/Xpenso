import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import AddExpenseModal from "../components/AddExpenseModal";
import { getExpensesAPI } from "../services/expenseApi";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline, IoCalculatorOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import TotalExpenseModal from "../components/TotalExpensesModal";

const Dashboard = () => {
  const [showTotalModal, setShowTotalModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const LIMIT = 5;
  const { user } = useAuth();

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      let query = ``;
      if (category) query += `?category=${category}`;
      if (date) query += `${query.includes("?") ? "&" : "?"}date=${date}`;
      const { data } = await getExpensesAPI(query);

      const filtered = data.filter((expense) =>
        expense.description.toLowerCase().includes(search.toLowerCase())
      );

      setExpenses(filtered);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(user){
      fetchExpenses();
    }
  }, [category, search, page, date, user]);

  const resetFilters = () => {
    setCategory("");
    setSearch("");
    setDate("");
    setPage(1);
    fetchExpenses();
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <div className="p-4 md:p-8 max-w-7xl mx-auto mt-15">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-primary">Expense Dashboard</h1>
          <button
            onClick={resetFilters}
            className="bg-secondary px-4 py-2 rounded-lg text-background hover:bg-secondary/90 transition-all"
          >
            Reset Filters
          </button>
        </div>

        <div className="bg-background border border-border rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-muted" />
            <input
              type="text"
              placeholder="Search by description..."
              className="w-full pl-10 py-2 border border-border rounded-lg bg-background focus:ring-primary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <select
            className="w-full py-2 border border-border rounded-lg bg-background focus:ring-primary"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            {[
              "Food",
              "Travel",
              "Shopping",
              "Bills",
              "Entertainment",
              "Health",
              "Education",
              "Rent",
              "Others",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div>
            <input
              type="date"
              className="w-full py-2 border border-border rounded-lg bg-background focus:ring-primary"
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDate(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-primary text-background p-4 rounded-full shadow-lg hover:bg-secondary transition-all"
        >
          <IoAddCircleOutline size={32} />
        </button>

        {showModal && (
          <AddExpenseModal onClose={() => setShowModal(false)} onExpenseAdded={fetchExpenses} />
        )}

        <button
          onClick={() => setShowTotalModal(true)}
          className="fixed bottom-26 right-8 bg-secondary text-background p-4 rounded-full shadow-lg hover:bg-secondary/90 transition-all"
        >
          <IoCalculatorOutline size={32} />
        </button>

        {showTotalModal && <TotalExpenseModal onClose={() => setShowTotalModal(false)} />}

        <div className="space-y-4">
          {isLoading
            ? Array(5)
                .fill("")
                .map((_, idx) => (
                  <div key={idx} className="h-24 bg-muted/10 rounded-lg animate-pulse" />
                ))
            : expenses.length > 0 ? (
                expenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="p-4 border border-border rounded-lg bg-background hover:shadow-lg transition-all"
                  >
                    <h3 className="text-lg font-bold">{expense.description}</h3>
                    <p>{expense.category}</p>
                    <p>{new Date(expense.date).toLocaleDateString()}</p>
                    <p className="text-primary font-bold">₹{expense.amount}</p>
                  </div>
                ))
              ) : (
                <div className="text-center p-12 border-dashed border-2 border-border rounded-lg">
                  📭 No expenses found!
                </div>
              )}
        </div>

        {expenses.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-primary/10 px-6 py-2 rounded-lg"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              disabled={expenses.length <= LIMIT}
              onClick={() => setPage(page + 1)}
              className="bg-primary px-6 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
