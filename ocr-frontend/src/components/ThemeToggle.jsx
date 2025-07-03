import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span className="flex items-center">
        {isDarkMode ? (
          <>
            <FiSun className="mr-2" /> Light Mode
          </>
        ) : (
          <>
            <FiMoon className="mr-2" /> Dark Mode
          </>
        )}
      </span>
      <div className={`w-10 h-5 flex items-center rounded-full p-1 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-5' : ''}`}></div>
      </div>
    </button>
  );
};

export default ThemeToggle;