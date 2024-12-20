import React from 'react';
import { Position } from './useGameLogic';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  obstacles: Position[];
  gridSize: number;
  isDark: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  snake,
  food,
  obstacles,
  gridSize,
  isDark,
}) => {
  const cellSize = `calc(min(90vw, 600px) / ${gridSize})`;

  return (
    <div
      className="grid gap-px transition-colors duration-200
        bg-gray-200 dark:bg-gray-700 p-1 rounded-lg shadow-lg"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${cellSize})`,
        width: 'min(90vw, 600px)',
        height: 'min(90vw, 600px)',
      }}
    >
      {Array.from({ length: gridSize * gridSize }, (_, i) => {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        const isObstacle = obstacles.some(
          (obstacle) => obstacle.x === x && obstacle.y === y
        );
        const isHead = snake[0].x === x && snake[0].y === y;

        return (
          <div
            key={i}
            className={`
              rounded-sm transition-colors duration-200
              ${isHead ? 'bg-green-600 dark:bg-green-500' : ''}
              ${isSnake && !isHead ? 'bg-green-400 dark:bg-green-400' : ''}
              ${isFood ? 'bg-red-500 dark:bg-red-400' : ''}
              ${isObstacle ? 'bg-gray-800 dark:bg-gray-900' : ''}
              ${!isSnake && !isFood && !isObstacle ? 'bg-white dark:bg-gray-600' : ''}
            `}
          />
        );
      })}
    </div>
  );
};