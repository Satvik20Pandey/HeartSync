import { useState } from 'react';
import { ArrowLeft, Download, Share2, Heart } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

interface Props {
  onBack: () => void;
}

const LoveTest = ({ onBack }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "How often do you and your partner communicate about your feelings?",
      options: [
        { text: "Every day, we're always open with each other", score: 20 },
        { text: "Often, but not about everything", score: 15 },
        { text: "Sometimes, when issues come up", score: 10 },
        { text: "Rarely, we avoid talking about feelings", score: 5 }
      ]
    },
    {
      id: 2,
      text: "When you disagree, how do you typically handle it?",
      options: [
        { text: "We discuss calmly and find a solution together", score: 20 },
        { text: "We take some time apart, then talk it through", score: 15 },
        { text: "One of us usually gives in to avoid conflict", score: 10 },
        { text: "Arguments often escalate and remain unresolved", score: 5 }
      ]
    },
    {
      id: 3,
      text: "How would you describe the trust in your relationship?",
      options: [
        { text: "Complete trust, we're totally transparent", score: 20 },
        { text: "Strong trust with some boundaries", score: 15 },
        { text: "Trust is there but sometimes I have doubts", score: 10 },
        { text: "Trust has been broken and we're rebuilding", score: 5 }
      ]
    },
    {
      id: 4,
      text: "How often do you make time for fun and romance?",
      options: [
        { text: "Regularly scheduled date nights and spontaneous moments", score: 20 },
        { text: "We have date nights but could use more spontaneity", score: 15 },
        { text: "Special occasions, but daily life gets in the way", score: 10 },
        { text: "Rarely, we've fallen into a routine", score: 5 }
      ]
    },
    {
      id: 5,
      text: "How do you feel about your partner's friendships and social life?",
      options: [
        { text: "I'm supportive and sometimes join in", score: 20 },
        { text: "I'm supportive but prefer my own social circles", score: 15 },
        { text: "I sometimes worry about certain friends", score: 10 },
        { text: "I often feel uncomfortable with their social life", score: 5 }
      ]
    }
  ];

  const handleSelectOption = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      setTimeout(() => setAnimateResult(true), 500);
    }
  };

  const calculateScore = () => {
    const total = scores.reduce((acc, score) => acc + score, 0);
    return Math.floor((total / (questions.length * 20)) * 100);
  };

  const getAdvice = (score: number) => {
    if (score >= 85) {
      return "Your relationship shows incredible strength! Continue nurturing this connection with open communication and quality time together.";
    } else if (score >= 70) {
      return "You have a healthy relationship with great potential. Focus on deepening your emotional intimacy and maintaining trust.";
    } else if (score >= 50) {
      return "Your relationship has a solid foundation, but needs attention in some areas. Consider having more honest conversations about expectations and needs.";
    } else {
      return "Your relationship may benefit from focused attention. Consider relationship counseling or setting aside dedicated time to rebuild connection and trust.";
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
        Test Your Love
      </h2>

      {!showResult ? (
        <Card className="mb-6">
          <div className="mb-4">
            <div className="w-full bg-pink-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-purple-600 mt-1">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <h3 className="text-xl font-medium text-purple-800 mb-6">
            {questions[currentQuestion].text}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(option.score)}
                className="w-full text-left p-4 rounded-lg border border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="text-center">
          <h3 className="text-2xl font-bold text-purple-800 mb-6">Your Attraction Meter</h3>
          
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="w-full h-full rounded-full border-8 border-pink-100 flex items-center justify-center">
              <div 
                className={`text-5xl font-bold text-pink-500 transition-opacity duration-1000 ${animateResult ? 'opacity-100' : 'opacity-0'}`}
              >
                {calculateScore()}%
              </div>
            </div>
            
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: 'scale(1.2)' }}
            >
              <Heart 
                className={`text-pink-400 transition-all duration-2000 ease-out ${animateResult ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                size={180} 
                fill={animateResult ? '#ec4899' : 'transparent'} 
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-purple-700 mb-3">Relationship Advice</h4>
            <p className="text-purple-800">{getAdvice(calculateScore())}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="primary" 
              icon={<Download size={18} />}
            >
              Download Result
            </Button>
            <Button 
              variant="outline" 
              icon={<Share2 size={18} />}
            >
              Share with Partner
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LoveTest;