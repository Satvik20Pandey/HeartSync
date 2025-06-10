import { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Props {
  onBack: () => void;
}

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const HeartMemoryMatch = ({ onBack }: Props) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const emojis = ['💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5);
    
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setIsLocked(false);
  };

  const handleCardClick = (id: number) => {
    if (isLocked) return;
    if (flippedCards.length === 2) return;
    if (cards[id].isMatched) return;
    if (flippedCards.includes(id)) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      setIsLocked(true);

      const [firstCard, secondCard] = newFlippedCards;
      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        // Match found
        newCards[firstCard].isMatched = true;
        newCards[secondCard].isMatched = true;
        setCards(newCards);
        setMatches(prev => prev + 1);
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        // No match
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[secondCard].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-purple-600 mb-6 hover:text-pink-500 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </button>

      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display">
        Heart Memory Match
      </h2>

      <Card>
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-purple-700">Moves: {moves}</p>
            <p className="text-purple-700">Matches: {matches}/{emojis.length}</p>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square text-3xl rounded-lg transition-all duration-300 transform ${
                  card.isFlipped || card.isMatched
                    ? 'bg-pink-100 rotate-0'
                    : 'bg-gradient-to-r from-pink-400 to-purple-500 rotate-180'
                } ${
                  !card.isFlipped && !card.isMatched
                    ? 'hover:scale-105'
                    : ''
                }`}
                disabled={isLocked || card.isMatched}
              >
                <span className={`transition-opacity duration-300 ${
                  card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'
                }`}>
                  {card.emoji}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={initializeGame}
          variant="outline"
          className="w-full"
        >
          New Game
        </Button>
      </Card>
    </div>
  );
};

export default HeartMemoryMatch;