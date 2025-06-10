import { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Props {
  onBack: () => void;
}

const LoveCalculator = ({ onBack }: Props) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (compatibilityScore !== null) {
      setCompatibilityScore(null);
      setShowResult(false);
    }
  }, [name1, name2]);

  const calculateCompatibility = () => {
    if (!name1 || !name2) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const combinedString = (name1 + name2).toLowerCase();
      let hash = 0;
      
      for (let i = 0; i < combinedString.length; i++) {
        hash = ((hash << 5) - hash) + combinedString.charCodeAt(i);
        hash = hash & hash;
      }
      
      const positiveHash = Math.abs(hash);
      let score = positiveHash % 101;
      
      // Adjust score based on name lengths
      if (name1.length + name2.length <= 8) {
        score = Math.min(score + 15, 100); // Higher score for shorter names
      } else if (name1.length + name2.length >= 15) {
        score = Math.max(score - 10, 1); // Lower score for longer names
      }
      
      setCompatibilityScore(score);
      setIsCalculating(false);
      setShowResult(true);
    }, 1500);
  };

  const getCompatibilityMessage = (score: number) => {
    if (score >= 80) {
      return "Amazing chemistry! You two are like stars aligned in the universe.";
    } else if (score >= 60) {
      return "Great potential! With effort and understanding, your love can flourish.";
    } else if (score >= 40) {
      return "There's a spark! Work on communication to strengthen your connection.";
    } else {
      return "Opposites attract! Your differences could complement each other beautifully.";
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
        Name-Based Love Calculator
      </h2>

      <Card>
        {!showResult ? (
          <div>
            <p className="text-purple-700 mb-6">
              Enter your names to discover your romantic compatibility score!
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name1" className="block text-sm font-medium text-purple-700 mb-1">
                  Your Name
                </label>
                <input
                  id="name1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="flex justify-center">
                <Heart className="text-pink-400" fill="#f472b6" />
              </div>
              
              <div>
                <label htmlFor="name2" className="block text-sm font-medium text-purple-700 mb-1">
                  Partner's Name
                </label>
                <input
                  id="name2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter partner's name"
                />
              </div>
            </div>

            <Button
              onClick={calculateCompatibility}
              disabled={!name1 || !name2 || isCalculating}
              className="w-full"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Compatibility'}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-800 mb-2">Love Compatibility</h3>
            <p className="text-lg mb-6">
              <span className="font-medium text-pink-600">{name1}</span>
              {' & '}
              <span className="font-medium text-pink-600">{name2}</span>
            </p>
            
            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Heart background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart
                  className="text-pink-100"
                  size={220}
                  fill="#fce7f3"
                />
              </div>
              
              {/* Animated heart filled according to score */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-pink-400 to-pink-300 animate-heartFill transition-all duration-2000"
                  style={{ 
                    height: `${compatibilityScore}%`,
                  }}
                ></div>
                <Heart
                  className="text-pink-500 relative z-10"
                  size={220}
                  strokeWidth={1.5}
                  fill="transparent"
                />
              </div>
              
              {/* Percentage in the middle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl font-bold text-white drop-shadow-md animate-pulse">
                  {compatibilityScore}%
                </div>
              </div>
              
              {/* Sparkle animations */}
              <div className="absolute top-0 right-0 animate-ping delay-300">✨</div>
              <div className="absolute bottom-0 left-0 animate-ping delay-500">✨</div>
              <div className="absolute top-1/4 left-0 animate-ping delay-700">✨</div>
              <div className="absolute bottom-1/4 right-0 animate-ping">✨</div>
            </div>

            <div className="mb-6">
              <p className="text-purple-800 text-lg">
                {getCompatibilityMessage(compatibilityScore!)}
              </p>
            </div>

            <Button 
              variant="outline" 
              onClick={() => setShowResult(false)}
            >
              Calculate Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoveCalculator;