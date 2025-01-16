import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user  = import.meta.env.User_email

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Redirect to the login page
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <h1 className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                  {user ? user.email : 'Profile'}
                </h1>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                    Signed in as <strong>{user}</strong>
                  </p>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
