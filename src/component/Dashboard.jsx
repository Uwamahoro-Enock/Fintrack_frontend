import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate(); // Get the navigate function


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">FinTrack Dashboard</h1>
        <p className="text-sm mt-1">Track your income, expenses, and budgets effortlessly!</p>
      </header>

      {/* Main Content */}
      <main className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Card: Transactions */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-600">Transactions</h2>
          <p className="mt-2 text-gray-600">
            View and manage all your income and expenses across multiple accounts.
          </p>
          <button 
          onClick={()=> navigate('Transaction')}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
            Your Transactions
          </button>
        </div>

        {/* Card: Reports */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-600">Reports</h2>
          <p className="mt-2 text-gray-600">
            Generate reports based on time frames to track your financial trends.
          </p>
          <button 
          onClick={()=> navigate('./Report')}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
            Generate Reports
          </button>
        </div>

        {/* Card: Visualizations */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-600">Visualizations</h2>
          <p className="mt-2 text-gray-600">
            View graphs and charts summarizing your financial data.
          </p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
            View Charts
          </button>
        </div>
      
      </main>
    </div>
  );
};

export default Dashboard;
