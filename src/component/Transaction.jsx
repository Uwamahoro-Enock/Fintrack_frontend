import React, { useState } from "react";
import axios from 'axios';

const Transaction = () => {
  const [viewFetched, setViewFetched] = useState(false); 
  const [fetchedData, setFetchedData] = useState([]);
  const [transaction, setTransaction] = useState({
    type: "",
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

  const handleAddRecord = async () => {
    try {
      console.log("Data to be sent:", transaction);
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        transaction
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to add transaction");
    }
  };

  const handleFetchRecords = async () => {
    console.log('Fetching data');
    try {
      const response = await axios.get("http://localhost:5000/api/transactions");
      console.log(response.data);
      setFetchedData(response.data);
      setViewFetched(true);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch transactions");
    }
  };

  return (
    <div className="flex justify-between space-x-6 min-h-screen">
      {/* Left Side: Record Transaction */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Record Transaction</h2>
        <form>
          {/* Transaction Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Transaction Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            >
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
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleAddRecord}
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
            >
              Add Record
            </button>
            <button
              type="button"
              onClick={handleFetchRecords}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
            >
              Fetch Records
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Fetched Transactions */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-2/3 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          {viewFetched ? "Fetched Transactions" : "View Transactions"}
        </h2>
        {viewFetched ? (
          <ul className="space-y-4">
            {fetchedData.map((item) => (
              <li
                key={item.id}
                className="p-4 border border-gray-300 rounded-lg"
              >
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Amount:</strong> {item.amount} Rwf</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Description:</strong> {item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Select "Fetch Records" to view transaction history.</p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
