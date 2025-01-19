import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const Report = () => {
  const [selectedReport, setSelectedReport] = useState("daily");
  const [reportData, setReportData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/transactions");
      const processedTransactions = response.data.map(tx => ({
        ...tx,
        type: tx.type || "Cash Out"
      }));
      setTransactions(processedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const calculateDateRange = () => {
    const now = new Date();
    let start = new Date();
    
    switch (selectedReport) {
      case "daily":
        start.setHours(0, 0, 0, 0);
        break;
      case "weekly":
        start.setDate(now.getDate() - 7);
        break;
      case "monthly":
        start.setMonth(now.getMonth() - 1);
        break;
      default:
        break;
    }
    
    setDateRange({ start, end: now });
    return { start, end: now };
  };

  const generateReport = () => {
    const { start, end } = calculateDateRange();
    
    const filteredTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate >= start && txDate <= end;
    });

    const summaryData = {
      totalCashIn: 0,
      totalCashOut: 0,
      byCategory: {},
      byAccount: {},
      transactions: filteredTransactions,
    };

    filteredTransactions.forEach(tx => {
      if (tx.type === "Cash In") {
        summaryData.totalCashIn += Number(tx.amount);
      } else {
        summaryData.totalCashOut += Number(tx.amount);
      }

      if (!summaryData.byCategory[tx.category]) {
        summaryData.byCategory[tx.category] = 0;
      }
      summaryData.byCategory[tx.category] += Number(tx.amount);

      if (!summaryData.byAccount[tx.accountType]) {
        summaryData.byAccount[tx.accountType] = 0;
      }
      summaryData.byAccount[tx.accountType] += Number(tx.amount);
    });

    summaryData.netBalance = summaryData.totalCashIn - summaryData.totalCashOut;

    const categoryData = Object.entries(summaryData.byCategory).map(([name, value]) => ({
      name,
      amount: value
    }));

    const accountData = Object.entries(summaryData.byAccount).map(([name, value]) => ({
      name,
      amount: value
    }));

    setSummary(summaryData);
    setReportData({ categoryData, accountData });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' }).format(amount);
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      {/* Controls */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Select Report Type</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedReport("daily")}
            className={`py-2 px-4 rounded-lg ${
              selectedReport === "daily" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setSelectedReport("weekly")}
            className={`py-2 px-4 rounded-lg ${
              selectedReport === "weekly" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setSelectedReport("monthly")}
            className={`py-2 px-4 rounded-lg ${
              selectedReport === "monthly" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>
        <button
          onClick={generateReport}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
        >
          Generate Report
        </button>
      </div>

      {/* Report Display */}
      {summary && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Financial Summary</h2>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">Total Cash In</h3>
              <p className="text-2xl">{formatCurrency(summary.totalCashIn)}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">Total Cash Out</h3>
              <p className="text-2xl">{formatCurrency(summary.totalCashOut)}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">Net Balance</h3>
              <p className="text-2xl">{formatCurrency(summary.netBalance)}</p>
            </div>
          </div>

          {/* Charts */}
          {reportData && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Spending by Category</h3>
                <BarChart width={600} height={300} data={reportData.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#4F46E5" />
                </BarChart>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Account Distribution</h3>
                <BarChart width={600} height={300} data={reportData.accountData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#10B981" />
                </BarChart>
              </div>
            </div>
          )}

          {/* Transaction List */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Recent Transactions</h3>
            <div className="space-y-2">
              {summary.transactions.map((tx, index) => (
                <div key={index} className="border p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">{tx.category}</span>
                    <span className={tx.type === "Cash In" ? "text-green-600" : "text-red-600"}>
                      {formatCurrency(tx.amount)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>{new Date(tx.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{tx.accountType}</span>
                  </div>
                  <div className="text-sm text-gray-500">{tx.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;