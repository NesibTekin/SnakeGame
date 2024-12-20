import React from 'react';
import { Flashlight } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-3 rounded-full transition-colors duration-200
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                 hover:bg-white dark:hover:bg-gray-800 shadow-lg fixed bottom-8 left-1/2 transform -translate-x-1/2"
      aria-label="Toggle dark mode"
    >
      <Flashlight
        className={`w-6 h-6 transition-colors duration-200
          ${isDark ? 'text-yellow-400' : 'text-gray-800'}`}
      />
    </button>
  );
};

export default ThemeToggle;
