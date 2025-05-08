import React from 'react';
import { BrainIcon, SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 border-b backdrop-blur-sm dark:border-gray-800 border-gray-200 bg-white/70 dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BrainIcon className="w-8 h-8 text-indigo-500" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">AI Interview Coach</h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;