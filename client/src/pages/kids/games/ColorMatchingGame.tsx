import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Color Matching Game - Match colors to objects
const ColorMatchingGame: React.FC = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);

  const rounds = [
    { color: '🔴', items: ['🍎', '🍅', '🍓'], correct: 0 },
    { color: '🟡', items: ['🌽', '🍌', '🟡'], correct: 1 },
    { color: '🟢', items: ['🍏', '🥬', '🐸'], correct: 0 },
  ];

  const currentRound = rounds[round];

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Color Matching</h1>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
          Round {round + 1} / {rounds.length}
        </div>
      </div>

      {/* Game Area */}
      <div className="p-4 flex-1 flex flex-col items-center">
        <div className="bg-white rounded-2xl p-6 shadow mb-6 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Find the {currentRound.color} object!</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {currentRound.items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  const correct = index === currentRound.correct;
                  setScore(s => s + (correct ? 10 : 0));
                  setTimeout(() => {
                    if (round < rounds.length - 1) {
                      setRound(r => r + 1);
                    }
                  }, 500);
                }}
                className="w-20 h-20 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center text-3xl font-bold"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="bg-white p-4">
        <div className="text-center">
          <span className="text-gray-600">Score: </span>
          <span className="font-bold text-2xl text-primary">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorMatchingGame;