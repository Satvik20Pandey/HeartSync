import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Props {
  onBack: () => void;
}

interface Tip {
  id: number;
  title: string;
  content: string;
  category: 'communication' | 'romance' | 'growth' | 'conflict';
}

const DailyTips = ({ onBack }: Props) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [animateDirection, setAnimateDirection] = useState<'left' | 'right' | null>(null);

  const tips: Tip[] = [
    {
      id: 1,
      title: "The 5-Minute Check-In",
      content: "Set aside 5 minutes each day to ask your partner about their day. Listen actively without interrupting or offering solutions unless they ask for advice.",
      category: "communication"
    },
    {
      id: 2,
      title: "Gratitude Practice",
      content: "Share one thing you appreciate about your partner every day. Small acknowledgments build a foundation of positivity in your relationship.",
      category: "growth"
    },
    {
      id: 3,
      title: "Surprise Notes",
      content: "Leave little love notes in unexpected places for your partner to find throughout their day—in lunch boxes, coat pockets, or on the bathroom mirror.",
      category: "romance"
    },
    {
      id: 4,
      title: "The 10-Second Hug",
      content: "Long hugs (10+ seconds) release oxytocin, the bonding hormone. Make it a habit to share at least one long hug daily to strengthen your connection.",
      category: "romance"
    },
    {
      id: 5,
      title: "Curiosity Over Criticism",
      content: "When you feel critical of your partner, transform your reaction into curiosity. Ask questions to understand rather than making assumptions.",
      category: "conflict"
    },
    {
      id: 6,
      title: "Digital-Free Dinner",
      content: "Put away all devices during meals together. This simple practice enhances conversation and creates space for meaningful connection.",
      category: "communication"
    },
    {
      id: 7,
      title: "Repair Attempts",
      content: "Learn to recognize and respond to each other's 'repair attempts'—small gestures to deescalate tension during disagreements, like humor or apology.",
      category: "conflict"
    },
    {
      id: 8,
      title: "Weekly Adventure",
      content: "Try something new together each week, even if small. Shared novel experiences create lasting bonds and memories.",
      category: "growth"
    },
    {
      id: 9,
      title: "Appreciation Ritual",
      content: "Before sleep, share three things you appreciated about your partner today. This shifts focus to positivity and gratitude before rest.",
      category: "growth"
    },
    {
      id: 10,
      title: "Touch Connection",
      content: "Incorporate non-sexual touch throughout your day—hold hands while walking, touch their shoulder when passing by, or sit close during movies.",
      category: "romance"
    }
  ];

  const goToNextTip = () => {
    setAnimateDirection('right');
    setTimeout(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
      setAnimateDirection(null);
    }, 300);
  };

  const goToPreviousTip = () => {
    setAnimateDirection('left');
    setTimeout(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
      setAnimateDirection(null);
    }, 300);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'communication':
        return 'bg-blue-100 text-blue-600';
      case 'romance':
        return 'bg-pink-100 text-pink-600';
      case 'growth':
        return 'bg-green-100 text-green-600';
      case 'conflict':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
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
        Daily Love Tips
      </h2>

      <div className="relative mb-6">
        <div 
          className={`transition-all duration-300 ${
            animateDirection === 'right' 
              ? 'transform translate-x-full opacity-0' 
              : animateDirection === 'left' 
                ? 'transform -translate-x-full opacity-0' 
                : 'transform translate-x-0 opacity-100'
          }`}
        >
          <Card className="p-8">
            <div className="flex justify-between items-center mb-4">
              <span 
                className={`text-sm px-3 py-1 rounded-full ${getCategoryColor(tips[currentTipIndex].category)}`}
              >
                {tips[currentTipIndex].category.charAt(0).toUpperCase() + tips[currentTipIndex].category.slice(1)}
              </span>
              <span className="text-sm text-purple-600">
                Tip {currentTipIndex + 1} of {tips.length}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              {tips[currentTipIndex].title}
            </h3>
            
            <p className="text-purple-700 text-lg mb-8">
              {tips[currentTipIndex].content}
            </p>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPreviousTip}
                icon={<ChevronLeft size={18} />}
              >
                Previous
              </Button>
              
              <Button 
                variant="primary" 
                size="sm" 
                onClick={goToNextTip}
                icon={<ChevronRight size={18} className="ml-1" />}
              >
                Next Tip
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex space-x-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTipIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentTipIndex ? 'bg-pink-500' : 'bg-pink-200'
              }`}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyTips;