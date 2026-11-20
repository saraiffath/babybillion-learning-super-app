import React from 'react';
import { Link } from 'react-router-dom';

interface Game {
  slug: string;
  title: string;
  description: string;
  category: string;
  minAge: number;
  maxAge: number;
  thumbnailUrl: string;
}

const GAMES: Game[] = [
  { slug: 'match-pair', title: 'Match the Pair', description: 'Find matching images', category: 'memory', minAge: 3, maxAge: 8, thumbnailUrl: '/avatars/game-1.png' },
  { slug: 'alphabet-tracing', title: 'Alphabet Tracing', description: 'Trace letters with touch', category: 'writing', minAge: 3, maxAge: 6, thumbnailUrl: '/avatars/game-2.png' },
  { slug: 'number-tracing', title: 'Number Tracing', description: 'Trace numbers', category: 'writing', minAge: 3, maxAge: 6, thumbnailUrl: '/avatars/game-3.png' },
  { slug: 'burst-balloons', title: 'Burst the Balloon', description: 'Pop the correct answer balloons', category: 'quick-thinking', minAge: 4, maxAge: 8, thumbnailUrl: '/avatars/game-4.png' },
  { slug: 'egg-surprise', title: 'Egg Surprise', description: 'Count the eggs', category: 'counting', minAge: 2, maxAge: 5, thumbnailUrl: '/avatars/game-5.png' },
  { slug: 'connect-dots', title: 'Connect the Dots', description: 'Connect numbered dots to reveal an image', category: 'drawing', minAge: 3, maxAge: 7, thumbnailUrl: '/avatars/game-6.png' },
  { slug: 'missing-number', title: 'Identify the Missing Number', description: 'Pick the missing number from options', category: 'math', minAge: 4, maxAge: 8, thumbnailUrl: '/avatars/game-7.png' },
  { slug: 'color-matching', title: 'Color Matching', description: 'Match colors to objects', category: 'colors', minAge: 2, maxAge: 5, thumbnailUrl: '/avatars/game-8.png' },
  { slug: 'number-counting', title: 'Number Counting', description: 'Count objects and select the right number', category: 'counting', minAge: 2, maxAge: 6, thumbnailUrl: '/avatars/game-9.png' },
  { slug: 'memory-matching', title: 'Basic Memory Matching', description: 'Classic memory card flip game', category: 'memory', minAge: 3, maxAge: 8, thumbnailUrl: '/avatars/game-10.png' },
];

const GameDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <h1 className="text-2xl font-bold">🎮 Learning Games</h1>
      </div>

      {/* Games List */}
      <div className="p-4">
        <div className="space-y-3">
          {GAMES.map((game) => (
            <Link
              key={game.slug}
              to={`/kids/games/${game.slug}`}
              className="bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{game.title}</div>
                <div className="text-sm text-gray-500">{game.description}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Ages {game.minAge} - {game.maxAge}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <Link to="/kids/home" className="flex flex-col items-center text-gray-400">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          <button className="flex flex-col items-center text-primary">
            <span className="text-2xl">🎮</span>
            <span className="text-xs">Games</span>
          </button>
          <Link to="/kids/categories" className="flex flex-col items-center text-gray-400">
            <span className="text-2xl">📚</span>
            <span className="text-xs">Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;