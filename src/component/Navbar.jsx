import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

const Navbar = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = import.meta.env.User_email;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Logo and Desktop Navigation */}
          <div className="flex flex-1 items-center justify-start sm:items-stretch">
            <div className="flex shrink-0 items-center">
              <button
              onClick={() => 
                navigate('/Dashboard')
              }>
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto rounded-xl"
              />
              </button>
            </div>
            
            {/* Desktop Navigation Buttons */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <button
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                onClick={() => navigate('/Transaction')}
              >
                Transactions
              </button>
              <button
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                onClick={() => navigate('/Report')}
              >
                Report
              </button>
              <button
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                onClick={() => navigate('/BudgetManagement')}
              >
                Budget
              </button>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
            <div className="relative">
              <button
                type="button"
                className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <h1 className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                  {user ? user.email : 'Profile'}
                </h1>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <p className="block px-4 py-2 text-sm text-gray-700">
                    Signed in as <strong>{user}</strong>
                  </p>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <button
                className="block w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                onClick={() => {
                  navigate('/Transaction');
                  setMobileMenuOpen(false);
                }}
              >
                Transactions
              </button>
              <button
                className="block w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                onClick={() => {
                  navigate('/Report');
                  setMobileMenuOpen(false);
                }}
              >
                Report
              </button>
              <button
                className="block w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                onClick={() => {
                  navigate('/BudgetManagement');
                  setMobileMenuOpen(false);
                }}
              >
                Budget
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;