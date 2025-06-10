import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

interface Answer {
  question: number;
  answer: string;
}

interface DreamPartnerAnalyzerProps {
  onBack: () => void;
}

const DreamPartnerAnalyzer = ({ onBack }: DreamPartnerAnalyzerProps) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 0,
      text: "What quality do you value most in a partner?",
      options: [
        "Honesty and trustworthiness",
        "Sense of humor that matches mine",
        "Ambition and drive"
      ]
    },
    {
      id: 1,
      text: "What kind of relationship dynamic do you prefer?",
      options: [
        "Calm and stable",
        "Simple and meaningful",
        "Adventurous and spontaneous"
      ]
    },
    {
      id: 2,
      text: "How do you prefer to handle conflicts?",
      options: [
        "Take time to cool off, then discuss calmly",
        "Address issues immediately and directly",
        "Seek compromise and middle ground"
      ]
    }
  ];

  const calculateResult = () => {
    let matchPercentage = 0;
    
    // More varied percentages based on answers
    if (answers[0]?.answer === "Honesty and trustworthiness") {
      matchPercentage += Math.floor(Math.random() * 10) + 25; // 25-35%
    } else if (answers[0]?.answer === "Sense of humor that matches mine") {
      matchPercentage += Math.floor(Math.random() * 15) + 10; // 10-25%
    } else {
      matchPercentage += Math.floor(Math.random() * 8) + 2; // 2-10%
    }
    
    if (answers[1]?.answer === "Calm and stable") {
      matchPercentage += Math.floor(Math.random() * 15) + 20; // 20-35%
    } else if (answers[1]?.answer === "Simple and meaningful") {
      matchPercentage += Math.floor(Math.random() * 10) + 10; // 10-20%
    } else {
      matchPercentage += Math.floor(Math.random() * 10) + 5; // 5-15%
    }
    
    if (answers[2]?.answer === "Take time to cool off, then discuss calmly") {
      matchPercentage += Math.floor(Math.random() * 15) + 15; // 15-30%
    } else if (answers[2]?.answer === "Address issues immediately and directly") {
      matchPercentage += Math.floor(Math.random() * 10) + 5; // 5-15%
    } else {
      matchPercentage += Math.floor(Math.random() * 8) + 3; // 3-11%
    }
    
    // Ensure result is between 1-35%
    return Math.max(1, Math.min(35, matchPercentage));
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      const existingIndex = newAnswers.findIndex(a => a.question === questionId);
      
      if (existingIndex !== -1) {
        newAnswers[existingIndex] = { question: questionId, answer };
      } else {
        newAnswers.push({ question: questionId, answer });
      }
      
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    if (answers.length === questions.length) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers([]);
    setShowResult(false);
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

      <Card>
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display">
          Dream Partner Analyzer
        </h2>

        {!showResult ? (
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-4">
                <p className="text-lg font-medium text-purple-800">{question.text}</p>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(question.id, option)}
                      className={`w-full p-3 text-left rounded-lg transition-colors ${
                        answers.find(a => a.question === question.id && a.answer === option)
                          ? 'bg-pink-100 text-pink-700'
                          : 'hover:bg-purple-50 text-purple-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={answers.length !== questions.length}
              className="w-full mt-6"
            >
              Analyze My Preferences
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl font-bold text-pink-500 mb-4">
              {calculateResult()}%
            </div>
            <p className="text-lg text-purple-700">
              This percentage represents how unique your partner preferences are compared to others.
              A lower percentage suggests more common preferences, while a higher percentage indicates more unique tastes.
            </p>
            <Button
              variant="secondary"
              onClick={handleReset}
              className="mt-4"
            >
              Start Over
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DreamPartnerAnalyzer;