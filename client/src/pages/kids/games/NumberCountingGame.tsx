import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Number Counting Game - Count objects and select the right number
const NumberCountingGame: React.FC = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const rounds = [
    { objects: '🍎🍎🍎', maxNumber: 5, correct: 3 },
    { objects: '🐾🐾🐾🐾🐾', maxNumber: 5, correct: 5 },
    { objects: '⭐⭐', maxNumber: 5, correct: 2 },
  ];

  const currentRound = rounds[round];

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    setShowResult(true);
  };

  const nextRound = () => {
    if (round < rounds.length - 1) {
      setRound(r => r + 1);
    } else {
      // Game complete - show final score
    }
    setSelectedNumber(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <div className="bg-yellow-600 text-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Number Counting</h1>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
          Round {round + 1} / {rounds.length}
        </div>
      </div>

      {/* Game Area */}
      <div className="p-4 flex-1 flex flex-col items-center">
        <div className="bg-white rounded-2xl p-6 shadow mb-6 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Count the objects!</h2>
          <div className="text-6xl mb-4">{currentRound.objects}</div>
          
          {!showResult && (
            <div className="grid grid-cols-5 gap-2 justify-center mb-4">
              {Array.from({ length: currentRound.maxNumber }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center font-bold text-lg"
                >
                  {num}
                </button>
              ))}
            </div>
          )}
          
          {showResult && (
            <div>
              <div className="text-3xl mb-2">
                You counted: {selectedNumber}
              </div>
              <div className={`text-xl font-bold ${selectedNumber === currentRound.correct ? 'text-green-500' : 'text-red-500'}`}>
                {selectedNumber === currentRound.correct ? 'Correct! 🎉' : 'Oops! Try again!'}
              </div>
              <button
                onClick={nextRound}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-full font-semibold"
              >
                {round < rounds.length - 1 ? 'Next' : 'Finish'}
              </button>
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

export default NumberCountingGame;