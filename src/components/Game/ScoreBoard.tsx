import React from 'react';

interface ScoreBoardProps {
  scores: number[];
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  const topScores = scores.slice(0, 3);

  return (
    <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Top Scores</h2>
      <div className="space-y-2">
        {topScores.map((score, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 text-lg font-medium
              text-gray-700 dark:text-gray-200"
          >
            <span className="text-gray-500 dark:text-gray-400">#{index + 1}</span>
            <span>{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};