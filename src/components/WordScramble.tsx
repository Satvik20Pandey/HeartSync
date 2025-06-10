import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Props {
  onBack: () => void;
}

interface Word {
  scrambled: string;
  correct: string;
  hint: string;
}

const WordScramble = ({ onBack }: Props) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  const words: Word[] = [
    { scrambled: 'OEVL', correct: 'LOVE', hint: 'The strongest emotion' },
    { scrambled: 'RTAHE', correct: 'HEART', hint: 'Symbol of romance' },
    { scrambled: 'SSIK', correct: 'KISS', hint: 'A romantic gesture' },
    { scrambled: 'OEACNRM', correct: 'ROMANCE', hint: 'What makes love special' },
    { scrambled: 'GHU', correct: 'HUG', hint: 'A warm embrace' },
    { scrambled: 'RLNPTAIFE', correct: 'SOULMATE', hint: 'Your perfect match' },
    { scrambled: 'ONITFEFAC', correct: 'AFFECTION', hint: 'Showing care and love' },
    { scrambled: 'ATEDOIN', correct: 'DEVOTION', hint: 'Deep love and loyalty' },
    { scrambled: 'SSIBL', correct: 'BLISS', hint: 'Perfect happiness' },
    { scrambled: 'DLEUCUD', correct: 'CUDDLE', hint: 'Cozy embrace' }
  ];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const startNewWord = () => {
    setCurrentWord(getRandomWord());
    setUserInput('');
    setMessage('');
  };

  useEffect(() => {
    startNewWord();
  }, []);

  const handleSubmit = () => {
    if (!currentWord) return;

    if (userInput.toUpperCase() === currentWord.correct) {
      setMessage('Correct! 💖');
      setScore(score + 1);
      setTimeout(startNewWord, 1500);
    } else {
      setMessage('Try again! 💭');
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
        Love Word Scramble
      </h2>

      <Card>
        <div className="text-center">
          <div className="mb-6">
            <p className="text-purple-700 mb-2">Score: {score}</p>
            <h3 className="text-2xl font-bold text-pink-600 mb-4">
              {currentWord?.scrambled}
            </h3>
            <p className="text-purple-600 italic">Hint: {currentWord?.hint}</p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-center text-xl uppercase"
              placeholder="Type your answer"
              maxLength={currentWord?.correct.length || 10}
            />
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleSubmit}
              className="w-full"
            >
              Check Answer
            </Button>

            <Button
              variant="outline"
              onClick={startNewWord}
              icon={<RefreshCw size={18} />}
            >
              New Word
            </Button>
          </div>

          {message && (
            <p className="mt-4 text-lg font-medium text-pink-600 animate-fadeIn">
              {message}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WordScramble;