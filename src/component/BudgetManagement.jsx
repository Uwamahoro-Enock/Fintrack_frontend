import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    period: "monthly",
  });
  const [notifications, setNotifications] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [updateAmount, setUpdateAmount] = useState("");

  useEffect(() => {
    fetchBudgets();
    const interval = setInterval(checkBudgetStatus, 3600000);
    return () => clearInterval(interval);
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/budgets");
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const checkBudgetStatus = async () => {
    try {
      await axios.post("http://localhost:5000/api/budgets/check-status");
      fetchBudgets();
    } catch (error) {
      console.error("Error checking budget status:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/budgets", newBudget);
      fetchBudgets();
      setNewBudget({ category: "", amount: "", period: "monthly" });
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const handleUpdateBudget = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/budgets/${id}`, {
        amount: updateAmount,
      });
      fetchBudgets();
      setEditingBudget(null);
      setUpdateAmount("");
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const handleSetBudget = async (id) => {
    try {
      const budget = budgets.find((b) => b._id === id);
      if (budget) {
        await axios.put(`http://localhost:5000/api/budgets/${id}`, {
          budgetSet: true,
        });
        fetchBudgets();
      }
    } catch (error) {
      console.error("Error setting budget:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Budget Management</h1>

      {/* Budget Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Set New Budget</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={newBudget.category}
              onChange={(e) =>
                setNewBudget({ ...newBudget, category: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={newBudget.amount}
              onChange={(e) =>
                setNewBudget({ ...newBudget, amount: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Period</label>
            <select
              value={newBudget.period}
              onChange={(e) =>
                setNewBudget({ ...newBudget, period: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Set Budget
          </button>
        </form>
      </div>

      {/* Budget List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Current Budgets</h2>
        {budgets.map((budget) => (
          <div
            key={budget._id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{budget.category}</h3>
              <span className="text-gray-600">{budget.period}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Budget Amount:</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("rw-RW", {
                    style: "currency",
                    currency: "RWF",
                  }).format(budget.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Spent:</span>
                <span
                  className={`font-semibold ${
                    budget.spent > budget.amount
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {new Intl.NumberFormat("rw-RW", {
                    style: "currency",
                    currency: "RWF",
                  }).format(budget.spent)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    budget.spent > budget.amount
                      ? "bg-red-600"
                      : budget.spent > budget.amount * 0.8
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  }`}
                  style={{
                    width: `${Math.min(
                      (budget.spent / budget.amount) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>

              {/* Set Budget Button */}
              {!budget.budgetSet && (
                <button
                  onClick={() => handleSetBudget(budget._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Set Budget
                </button>
              )}

              {/* Update Budget */}
              {editingBudget === budget._id ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={updateAmount}
                    onChange={(e) => setUpdateAmount(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="New Amount"
                  />
                  <div className="space-x-2">
                    <button
                      onClick={() => handleUpdateBudget(budget._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingBudget(null);
                        setUpdateAmount("");
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingBudget(budget._id);
                    setUpdateAmount(budget.amount.toString());
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Update Budget
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetManagement;