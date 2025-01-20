import React, { useState } from "react";
import axios from 'axios';

const Transaction = () => {
  const [viewFetched, setViewFetched] = useState(false); 
  const [fetchedData, setFetchedData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState({
    type: "Cash Out", // Set default value
    accountType: "",
    amount: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setTransaction({...transaction, [name]: value});
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!transaction.accountType || !transaction.amount || !transaction.category || !transaction.description) {
      alert("Please fill in all required fields");
      return;
    }

    // Ensure type is never empty before sending
    const transactionToSend = {
      ...transaction,
      type: transaction.type || "Cash Out" // Fallback if somehow empty
    };

    try {
      console.log(transactionToSend)
      const response = await axios.post(
        "https://fintrack-backend-15ro.onrender.com/api/transactions",
        {
          transactionToSend,
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      alert(response.data.message);

      // Reset form with default type
      setTransaction({
        type: "Cash Out", // Keep default value when resetting
        accountType: "",
        amount: "",
        category: "",
        subcategory: "",
        description: "",
      });
      
      // Automatically refresh the transaction list
      handleFetchRecords();
    } catch (error) {
      console.log(error);
      alert("Failed to add transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://fintrack-backend-15ro.onrender.com/api/transactions",
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      // Ensure each fetched item has a type
      const processedData = response.data.map(item => ({
        ...item,
        type: item.type || "Cash Out" // Fallback for display if type is missing
      }));
      setFetchedData(processedData);
      setViewFetched(true);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-between space-x-6 min-h-screen">
      {/* Left Side: Record Transaction */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Record Transaction</h2>
        <form onSubmit={handleAddRecord}>
          {/* Transaction Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Transaction Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Cash In">Cash In</option>
              <option value="Cash Out">Cash Out</option>
            </select>
          </div>

          {/* Account Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Account Type</label>
            <select
              name="accountType"
              value={transaction.accountType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Account Type</option>
              <option value="Bank">Bank</option>
              <option value="Cash">Cash</option>
              <option value="Mobile Money">Mobile Money</option>
            </select>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={transaction.category}
              onChange={handleInputChange}
              placeholder="Enter category"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Subcategory */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Subcategory</label>
            <input
              type="text"
              name="subcategory"
              value={transaction.subcategory}
              onChange={handleInputChange}
              placeholder="Enter subcategory"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={transaction.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'
              }`}
            >
              {isSubmitting ? 'Adding...' : 'Add Record'}
            </button>
            <button
              type="button"
              onClick={handleFetchRecords}
              disabled={isLoading}
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'
              }`}
            >
              {isLoading ? 'Loading...' : 'Fetch Records'}
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Fetched Transactions */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-2/3 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          {viewFetched ? "Fetched Transactions" : "View Transactions"}
        </h2>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading transactions...</p>
        ) : viewFetched ? (
          fetchedData.length > 0 ? (
            <ul className="space-y-4">
              {fetchedData.map((item) => (
                <li
                  key={item._id}
                  className="p-4 border border-gray-300 rounded-lg"
                >
                  <p><strong>Type:</strong> {item.type}</p>
                  <p><strong>Account Type:</strong> {item.accountType}</p>
                  <p><strong>Amount:</strong> {item.amount} Rwf</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  {item.subcategory && <p><strong>Subcategory:</strong> {item.subcategory}</p>}
                  <p><strong>Description:</strong> {item.description}</p>
                  <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No transactions found.</p>
          )
        ) : (
          <p className="text-center text-gray-600">Select "Fetch Records" to view transaction history.</p>
        )}
      </div>
    </div>
  );
};

export default Transaction;