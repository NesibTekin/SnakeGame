import React from 'react';
import { useGameLogic } from './components/Game/useGameLogic';
import { GameBoard } from './components/Game/GameBoard';
import { ControlButton } from './components/Game/ControlButton';
import { ScoreBoard } from './components/Game/ScoreBoard';
import { ThemeToggle } from './components/UI/ThemeToggle';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { gameState, highScores, rotateLeft, rotateRight, restartGame, GRID_SIZE } =
    useGameLogic();
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen transition-colors duration-200
      bg-gradient-to-br from-blue-50 to-purple-50
      dark:from-gray-900 dark:to-gray-800"
    >
      <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <GameBoard
              snake={gameState.snake}
              food={gameState.food}
              obstacles={gameState.obstacles}
              gridSize={GRID_SIZE}
              isDark={isDark}
            />
            {gameState.isGameOver && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm 
                flex flex-col items-center justify-center gap-6 rounded-lg"
              >
                <div className="text-center">
                  <h2 className="text-white text-3xl font-bold mb-4">Game Over!</h2>
                  <p className="text-gray-200 text-xl mb-4">Score: {gameState.score}</p>
                  <button
                    onClick={restartGame}
                    className="bg-white px-6 py-3 rounded-lg text-gray-800 font-semibold
                      hover:bg-gray-100 transition-colors duration-200"
                  >
                    Play Again
                  </button>
                </div>
                <ScoreBoard scores={highScores} />
              </div>
            )}
          </div>
        </div>
      </div>
      <ControlButton direction="left" onClick={rotateLeft} isDark={isDark} />
      <ControlButton direction="right" onClick={rotateRight} isDark={isDark} />
    </div>
  );
}

export default App;