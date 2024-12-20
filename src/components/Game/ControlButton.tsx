import React from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

interface ControlButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isDark: boolean;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ direction, onClick, isDark }) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-8 ${direction === 'left' ? 'left-8' : 'right-8'}
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-full shadow-lg
        hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200
        active:scale-95 transform
      `}
    >
      {direction === 'left' ? (
        <ArrowLeftCircle className="w-8 h-8 text-gray-800 dark:text-gray-200" />
      ) : (
        <ArrowRightCircle className="w-8 h-8 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
};