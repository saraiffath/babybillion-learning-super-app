import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Match the Pair Game - Memory matching game for kids
interface Card {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MatchPairGame: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Generate cards on mount
  React.useEffect(() => {
    const values = ['🐻', '🦁', '🐘', '🐰', '🐧', '🐶', '🦄', '🦋'];
    const shuffledValues = [...values, ...values].sort(() => Math.random() - 0.5);
    const initialCards = shuffledValues.map((value, index) => ({
      id: `${index}-${value}`,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
  }, []);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedIndices.length === 2) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].value === cards[second].value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map((card, i) => 
            i === first || i === second ? { ...card, isMatched: true } : card
          ));
          setFlippedIndices([]);
          
          // Check if all matched
          if (cards.every(c => c.isMatched)) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards([]);
    setFlippedIndices([]);
    setMoves(0);
    setGameComplete(false);
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Match the Pair</h1>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
          Moves: {moves}
        </div>
      </div>

      {/* Game Board */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.isMatched || gameComplete}
              className={`w-16 h-16 rounded-lg text-2xl flex items-center justify-center transition-transform duration-300 ${
                card.isFlipped || card.isMatched ? 'bg-secondary' : 'bg-primary'
              }`}
            >
              {(card.isFlipped || card.isMatched) && card.value}
            </button>
          ))}
        </div>
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Well Done!</h2>
            <p className="text-gray-600 mb-4">Completed in {moves} moves!</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold"
            >
              Play Again
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

      {/* Instructions */}
      {!gameComplete && (
        <div className="p-4">
          <div className="bg-yellow-100 rounded-xl p-3 text-sm">
            <div className="font-medium mb-1">How to Play:</div>
            Tap cards to flip them. Find matching pairs!
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPairGame;