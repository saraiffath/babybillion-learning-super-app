import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Egg Surprise Game - Count eggs
const EggSurpriseGame: React.FC = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showEggs, setShowEggs] = useState(false);

  const rounds = [
    { eggs: 3, options: [1, 2, 3, 4, 5] },
    { eggs: 5, options: [3, 4, 5, 6, 7] },
    { eggs: 2, options: [1, 2, 3, 4, 5] },
  ];

  const currentRound = rounds[round];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-orange-600 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mb-2">←</button>
        <h1 className="text-xl font-bold">Egg Surprise!</h1>
        <div className="text-sm">Round {round + 1} / {rounds.length}</div>
      </div>

      {/* Game Area */}
      <div className="p-4 flex-1 flex flex-col items-center">
        <div className="bg-white rounded-2xl p-6 shadow mb-6 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">🥚 Egg Surprise!</h2>
          
          {!showEggs ? (
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <button
                onClick={() => setShowEggs(true)}
                className="px-8 py-4 bg-yellow-400 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                🥚 Click to Crack the Eggs!
              </button>
            </div>
          ) : (
            <div className="py-4">
              <div className="text-6xl mb-4 flex justify-center gap-2">
                {Array.from({ length: currentRound.eggs }).map((_, i) => (
                  <span key={i} className="text-4xl">🥚</span>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {currentRound.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const correct = option === currentRound.eggs;
                      setScore(s => s + (correct ? 10 : 0));
                      setTimeout(() => {
                        setShowEggs(false);
                        if (round < rounds.length - 1) {
                          setRound(r => r + 1);
                        }
                      }, 1000);
                    }}
                    className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center font-bold text-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
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

export default EggSurpriseGame;