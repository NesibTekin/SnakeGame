import { useState, useEffect, useCallback } from 'react';

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
export type Position = { x: number; y: number };

interface GameState {
  snake: Position[];
  food: Position;
  obstacles: Position[];
  direction: Direction;
  isGameOver: boolean;
  score: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const OBSTACLE_COUNT = 5;

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const [highScores, setHighScores] = useState<number[]>([]);
  const [gameSpeed, setGameSpeed] = useState(200);

  function initializeGame(): GameState {
    const snake = Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
      x: Math.floor(GRID_SIZE / 2),
      y: Math.floor(GRID_SIZE / 2) + i,
    }));

    const obstacles = generateObstacles(snake);
    const food = generateFood(snake, obstacles);

    return {
      snake,
      food,
      obstacles,
      direction: 'UP',
      isGameOver: false,
      score: 0,
    };
  }

  function generateObstacles(snake: Position[]): Position[] {
    const obstacles: Position[] = [];
    while (obstacles.length < OBSTACLE_COUNT) {
      const position = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      const isValidPosition = !snake.some(
        (segment) => segment.x === position.x && segment.y === position.y
      );

      if (isValidPosition) {
        obstacles.push(position);
      }
    }
    return obstacles;
  }

  function generateFood(snake: Position[], obstacles: Position[]): Position {
    let food: Position;
    do {
      food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some((segment) => segment.x === food.x && segment.y === food.y) ||
      obstacles.some((obstacle) => obstacle.x === food.x && obstacle.y === food.y)
    );
    return food;
  }

  const moveSnake = useCallback(() => {
    if (gameState.isGameOver) return;

    setGameState((prev) => {
      const newHead = { ...prev.snake[0] };
      switch (prev.direction) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
      }

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        return { ...prev, isGameOver: true };
      }

      // Check collision with obstacles
      if (
        prev.obstacles.some(
          (obstacle) => obstacle.x === newHead.x && obstacle.y === newHead.y
        )
      ) {
        return { ...prev, isGameOver: true };
      }

      // Check collision with self
      if (
        prev.snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        return { ...prev, isGameOver: true };
      }

      const newSnake = [newHead, ...prev.snake];
      let newFood = prev.food;
      let newScore = prev.score;

      // Check if food is eaten
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        newFood = generateFood(newSnake, prev.obstacles);
        newScore += 10;
      } else {
        newSnake.pop();
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore,
      };
    });
  }, [gameState.isGameOver]);

  const rotateRight = () => {
    setGameState((prev) => {
      const directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
      const currentIndex = directions.indexOf(prev.direction);
      const newDirection = directions[(currentIndex + 1) % 4];
      return { ...prev, direction: newDirection };
    });
  };

  const rotateLeft = () => {
    setGameState((prev) => {
      const directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
      const currentIndex = directions.indexOf(prev.direction);
      const newDirection = directions[(currentIndex - 1 + 4) % 4];
      return { ...prev, direction: newDirection };
    });
  };

  const restartGame = () => {
    setHighScores((prev) => [...prev, gameState.score].sort((a, b) => b - a).slice(0, 5));
    setGameState(initializeGame());
  };

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, gameSpeed]);

  return {
    gameState,
    highScores,
    rotateLeft,
    rotateRight,
    restartGame,
    GRID_SIZE,
  };
};