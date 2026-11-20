import React from 'react';
import { Link } from 'react-router-dom';

const KidsHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-pink-100">
      {/* Header with child avatar */}
      <div className="flex items-center justify-between p-4 bg-primary text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🐻</span>
          </div>
          <div>
            <div className="text-sm opacity-90">Hello, Emma!</div>
            <div className="font-bold text-lg">Let's Learn! 🌟</div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>▶️</span> Continue Learning
        </h2>
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold">Alphabet Tracing</div>
              <div className="text-sm text-gray-500">3 lessons remaining</div>
            </div>
            <Link to="/kids/games/alphabet-tracing" className="bg-primary text-white px-3 py-2 rounded-full text-sm">
              Start
            </Link>
          </div>
        </div>
      </div>

      {/* Learning Categories */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">📚 Learning Categories</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <Link to="/kids/categories" className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-sm font-medium">English</div>
          </Link>
          
          <Link to="/kids/categories" className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center">
            <div className="text-3xl mb-2">🔢</div>
            <div className="text-sm font-medium">Maths</div>
          </Link>
          
          <Link to="/kids/categories" className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center">
            <div className="text-3xl mb-2">📕</div>
            <div className="text-sm font-medium">Hindi</div>
          </Link>
          
          <Link to="/kids/categories" className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center">
            <div className="text-3xl mb-2">🐾</div>
            <div className="text-sm font-medium">Animals</div>
          </Link>
          
          <Link to="/kids/categories" className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center">
            <div className="text-3xl mb-2">🎨</div>
            <div className="text-sm font-medium">Colors</div>
          </Link>
          
          <Link to="/kids/games" className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center">
            <div className="text-3xl mb-2">🎮</div>
            <div className="text-sm font-medium">Games</div>
          </Link>

          <Link to="/kids/shorts" className="bg-white rounded-2xl p-4 shadow-lg items-center justify-center text-center">
            <div className="text-3xl mb-2">📱</div>
            <div className="text-sm font-medium">Shorts</div>
          </Link>
        </div>
      </div>

      {/* Add Shorts to Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center text-gray-400">
            <Link to="/kids/home" className="flex flex-col items-center">
              <span className="text-2xl">🏠</span>
              <span className="text-xs">Home</span>
            </Link>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Link to="/kids/shorts" className="flex flex-col items-center">
              <span className="text-2xl">📱</span>
              <span className="text-xs">Shorts</span>
            </Link>
          </button>
          <button className="flex flex-col items-center text-primary">
            <Link to="/kids/talking-baby" className="flex flex-col items-center">
              <span className="text-2xl">👶</span>
              <span className="text-xs">Baby</span>
            </Link>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Link to="/kids/categories" className="flex flex-col items-center">
              <span className="text-2xl">📚</span>
              <span className="text-xs">Categories</span>
            </Link>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Link to="/kids/games" className="flex flex-col items-center">
              <span className="text-2xl">🎮</span>
              <span className="text-xs">Games</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidsHome;