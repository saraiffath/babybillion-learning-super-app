import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Connect the Dots Game - Connect numbered dots
const ConnectTheDotsGame: React.FC = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  // 3x3 grid of dots numbered 1-9
  const dots = [
    { x: 50, y: 50, num: 1 },
    { x: 150, y: 50, num: 2 },
    { x: 250, y: 50, num: 3 },
    { x: 50, y: 150, num: 4 },
    { x: 150, y: 150, num: 5 },
    { x: 250, y: 150, num: 6 },
    { x: 50, y: 250, num: 7 },
    { x: 150, y: 250, num: 8 },
    { x: 250, y: 250, num: 9 },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mb-2">←</button>
        <h1 className="text-xl font-bold">Connect the Dots</h1>
      </div>

      {/* Game Area */}
      <div className="p-4 flex-1 flex flex-col items-center">
        <div className="bg-white rounded-2xl p-6 shadow mb-6 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Connect the dots!</h2>
          
          <div className="relative w-64 h-64 border-2 border-gray-300 rounded-full mb-4">
            {dots.map((dot, index) => (
              <React.Fragment key={index}>
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r="8"
                  fill={dot.num <= 5 ? '#4ECDC4' : '#CCCCCC'}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={dot.x}
                  y={dot.y + 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-bold text-sm fill-white"
                >
                  {dot.num}
                </text>
              </React.Fragment>
            ))}
          </div>
          
          <p className="text-gray-600 mb-4">Connect numbers 1-9 in order</p>
          
          {!completed && (
            <button
              onClick={() => setCompleted(true)}
              className="px-6 py-3 bg-secondary text-white rounded-full font-semibold"
            >
              I've Connected All Dots!
            </button>
          )}
          
          {completed && (
            <div className="mt-4 p-4 bg-green-100 rounded-full">
              <div className="text-2xl font-bold text-green-700">🎉 Great Job! 🐘</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate('/kids/games')}
          className="px-4 py-2 bg-gray-200 rounded-full"
        >
          Back to Games
        </button>
      </div>
    </div>
  );
};

export default ConnectTheDotsGame;