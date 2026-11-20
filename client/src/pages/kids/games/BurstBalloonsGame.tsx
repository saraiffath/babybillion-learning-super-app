import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Burst the Balloon Game - Pop correct answer balloons
const BurstBalloonsGame: React.FC = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const rounds = [
    { question: '2 + 2 = ?', answers: ['3', '4', '5'], correct: 1 },
    { question: '5 - 3 = ?', answers: ['1', '2', '3'], correct: 1 },
    { question: 'Count the stars: ⭐⭐⭐⭐', answers: ['3', '4', '5'], correct: 1 },
  ];

  const currentRound = rounds[round];

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Burst the Balloon</h1>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
          Round {round + 1} / {rounds.length}
        </div>
      </div>

      {/* Game Area */}
      <div className="p-4 flex-1 flex flex-col items-center">
        <div className="bg-white rounded-2xl p-4 shadow mb-4 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-4">{currentRound.question}</h2>
          <div className="grid grid-cols-3 gap-4">
            {currentRound.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => {
                  const correct = index === currentRound.correct;
                  setScore(s => s + (correct ? 10 : 0));
                  setTimeout(() => {
                    if (round < rounds.length - 1) {
                      setRound(r => r + 1);
                    } else {
                      setGameComplete(true);
                    }
                  }, 500);
                }}
                className={`w-20 h-20 rounded-full text-2xl font-bold shadow-lg transition-transform hover:scale-110`}
              >
                <div className={`bg-${index === currentRound.correct ? 'green' : 'orange'}-500 rounded-full w-full h-full flex items-center justify-center text-white`}>
                  {answer}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-4">
          <span className="text-4xl">🎈</span>
        </div>
      </div>

      {/* Score */}
      <div className="bg-white p-4">
        <div className="text-center">
          <span className="text-gray-600">Score: </span>
          <span className="font-bold text-2xl text-primary">{score}</span>
        </div>
      </div>

      {/* Game Complete */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Game Complete!</h2>
            <p className="text-gray-600 mb-4">Your Score: {score} points</p>
            <button
              onClick={() => navigate('/kids/games')}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold"
            >
              Back to Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurstBalloonsGame;