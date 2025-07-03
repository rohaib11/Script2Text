import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FiUpload, FiClock, FiHome } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Handwritten OCR</h1>
        </div>
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <FiHome className="w-5 h-5 mr-3" />
              Home
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <FiUpload className="w-5 h-5 mr-3" />
              OCR Scanner
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <FiClock className="w-5 h-5 mr-3" />
              History
            </NavLink>
          </nav>
          <div className="mt-auto pt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;