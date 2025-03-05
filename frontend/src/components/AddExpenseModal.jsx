import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createExpenseAPI } from "../services/expenseApi";
import ErrorMessage from "./ErrorMessage";

const AddExpenseModal = ({ onClose, onExpenseAdded }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleAddExpense = async (data) => {
    try {
      await createExpenseAPI(data);
      toast.success("Expense Added Successfully!");
      reset();
      onExpenseAdded();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(handleAddExpense)}
        className="bg-background p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-bold text-primary mb-4 text-center">Add Expense</h2>

        <input
          type="number"
          placeholder="Amount"
          {...register("amount", { required: "Amount is required" })}
          className="input mb-4"
        />
        <ErrorMessage message={errors.amount?.message} />

        <select {...register("category", { required: "Category is required" })} className="input mb-4">
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Rent">Rent</option>
          <option value="Others">Others</option>
        </select>
        <ErrorMessage message={errors.category?.message} />

        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="input mb-4"
        />
        <ErrorMessage message={errors.date?.message} />

        <textarea
          placeholder="Description"
          {...register("description")}
          className="input mb-4"
        />

        <div className="flex gap-4">
          <button type="submit" className="bg-primary text-white w-full p-3 rounded-lg">
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-destructive text-white w-full p-3 rounded-lg hover:bg-destructive-hover transition-all"
            >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseModal;
