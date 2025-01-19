import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ClipboardList, PieChart, Wallet } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center sm:text-left">
            Welcome to FinTrack
          </h1>
          <p className="mt-3 text-base sm:text-lg text-indigo-100 text-center sm:text-left">
            Your personal finance management hub
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-12">
          {/* Transactions Section */}
          <section className="group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <ClipboardList className="text-indigo-600" size={28} />
                  Transactions
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  Monitor and manage your financial transactions across all your accounts.
                  Track every income and expense to maintain better control over your finances.
                </p>
              </div>
              <button
                onClick={() => navigate('/Transaction')}
                className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View Transactions
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="h-px bg-gradient-to-r from-indigo-100 to-transparent" />
          </section>

          {/* Reports Section */}
          <section className="group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <PieChart className="text-indigo-600" size={28} />
                  Financial Reports
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  Get detailed insights into your financial patterns with customizable reports.
                  Analyze trends and make informed decisions about your money management.
                </p>
              </div>
              <button
                onClick={() => navigate('/Report')}
                className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View Reports
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="h-px bg-gradient-to-r from-indigo-100 to-transparent" />
          </section>

          {/* Budget Management Section */}
          <section className="group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
                  <Wallet className="text-indigo-600" size={28} />
                  Budget Management
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  Set and track your spending limits with smart notifications.
                  Stay on top of your financial goals with automated budget tracking.
                </p>
              </div>
              <button
                onClick={() => navigate('/BudgetManagement')}
                className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Manage Budgets
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="h-px bg-gradient-to-r from-indigo-100 to-transparent" />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm sm:text-base text-slate-600">
            FinTrack - Your Personal Finance Manager
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
