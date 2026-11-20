import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Alphabet Tracing Game - Trace letters with touch
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const AlphabetTracingGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentLetter = LETTERS[currentLetterIndex];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Alphabet Tracing</h1>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
          {currentLetterIndex + 1} / {LETTERS.length}
        </div>
      </div>

      {/* Tracing Canvas */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mx-4 flex flex-col items-center">
          <div className="text-8xl font-bold text-primary mb-6">
            {currentLetter}
          </div>
          
          {/* Tracing Path - simplified canvas */}
          <div className="w-64 h-64 border-2 border-gray-300 rounded-full flex items-center justify-center mb-6">
            <div className="relative w-48 h-48 bg-yellow-100 rounded-full">
              <div className="absolute inset-0 border-2 border-primary rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-4 bg-primary rounded"></div>
            </div>
          </div>
          
          <div className="text-lg font-medium mb-6">Trace the letter <span className="text-3xl">{currentLetter}</span></div>
          
          <div className="flex gap-4">
            <button
              onClick={() => currentLetterIndex > 0 && setCurrentLetterIndex(currentLetterIndex - 1)}
              className="px-6 py-3 bg-gray-200 rounded-full font-medium"
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                setIsComplete(true);
              }}
              className="px-6 py-3 bg-secondary text-white rounded-full font-medium shadow-lg
              hover:shadow-xl transition-shadow"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Great Tracing!</h2>
            <p className="text-gray-600 mb-4">Well done tracing the letter {currentLetter}!</p>
            <button
              onClick={() => {
                if (currentLetterIndex < LETTERS.length - 1) {
                  setCurrentLetterIndex(currentLetterIndex + 1);
                  setIsComplete(false);
                } else {
                  setIsComplete(false);
                }
              }}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold"
            >
              {currentLetterIndex < LETTERS.length - 1 ? 'Next Letter' : 'Finish'}
            </button>
            <button
              onClick={() => navigate('/kids/games')}
              className="block mt-3 text-gray-500 hover:underline text-sm"
            >
              Back to Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetTracingGame;