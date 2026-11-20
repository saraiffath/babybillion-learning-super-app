import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Identify the Missing Number Game
const MissingNumberGame: React.FC = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);

  const rounds = [
    { equation: '3 + ? = 7', options: [2, 3, 4, 5], answer: 4 },
    { equation: '10 - ? = 6', options: [3, 4, 5, 6], answer: 4 },
    { equation: '? + 5 = 9', options: [2, 3, 4, 5], answer: 4 },
  ];

  const currentRound = rounds[round];

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mb-2">←</button>
        <h1 className="text-xl font-bold">Missing Number</h1>
        <div className="text-sm">Round {round + 1} / {rounds.length}</div>
      </div>

      {/* Game Area */}
      <div className="p-4 flex-1 flex flex-col items-center">
        <div className="bg-white rounded-2xl p-6 shadow mb-6 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">🧮 What's Missing?</h2>
          
          <div className="text-4xl font-bold mb-6">{currentRound.equation}</div>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            {currentRound.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const correct = option === currentRound.answer;
                  setScore(s => s + (correct ? 10 : 0));
                  setTimeout(() => {
                    if (round < rounds.length - 1) {
                      setRound(r => r + 1);
                    }
                  }, 500);
                }}
                className="w-14 h-14 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center font-bold text-xl"
              >
                {option}
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

export default MissingNumberGame;