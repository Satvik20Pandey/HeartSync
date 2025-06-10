import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Props {
  onBack: () => void;
}

interface StoryOptions {
  season: string;
  date: string;
  destination: string;
}

const LoveStoryGenerator = ({ onBack }: Props) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<StoryOptions>({
    season: '',
    date: '',
    destination: ''
  });
  const [story, setStory] = useState<string>('');

  const seasons = ['Spring 🌸', 'Summer ☀️', 'Autumn 🍂', 'Winter ❄️'];
  const dates = ['Picnic in the Park 🧺', 'Candlelit Dinner 🕯️', 'Beach Sunset 🌅', 'Stargazing Night ⭐'];
  const destinations = ['Paris 🗼', 'Venice 🚣‍♂️', 'Santorini 🏖️', 'Swiss Alps ⛰️'];

  const generateStory = () => {
    const stories = [
      `It was a beautiful ${answers.season.split(' ')[0]} day when they decided to have a ${answers.date.split(' ')[0]}. The gentle breeze carried whispers of romance as they planned their dream trip to ${answers.destination.split(' ')[0]}. Little did they know, this would become their most cherished memory. 💕`,
      `Their love story began in ${answers.season.split(' ')[0]}, with a magical ${answers.date.split(' ')[0]}. As they shared their dreams of visiting ${answers.destination.split(' ')[0]}, they knew their hearts were meant to journey together. 💑`,
      `Under the ${answers.season.split(' ')[0]} sky, they found themselves on a perfect ${answers.date.split(' ')[0]}. Their shared dream of exploring ${answers.destination.split(' ')[0]} together made their bond even stronger. 💫`
    ];

    setStory(stories[Math.floor(Math.random() * stories.length)]);
  };

  const renderQuestion = () => {
    switch(step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold text-purple-800 mb-4">Pick your favorite season:</h3>
            <div className="grid grid-cols-2 gap-3">
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => {
                    setAnswers({ ...answers, season });
                    setStep(2);
                  }}
                  className={`p-4 rounded-lg transition-all ${
                    answers.season === season
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-white hover:bg-pink-50'
                  } border border-pink-200`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold text-purple-800 mb-4">Choose your dream date:</h3>
            <div className="grid grid-cols-2 gap-3">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setAnswers({ ...answers, date });
                    setStep(3);
                  }}
                  className={`p-4 rounded-lg transition-all ${
                    answers.date === date
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-white hover:bg-pink-50'
                  } border border-pink-200`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold text-purple-800 mb-4">Select your romantic destination:</h3>
            <div className="grid grid-cols-2 gap-3">
              {destinations.map((destination) => (
                <button
                  key={destination}
                  onClick={() => {
                    setAnswers({ ...answers, destination });
                    generateStory();
                    setStep(4);
                  }}
                  className={`p-4 rounded-lg transition-all ${
                    answers.destination === destination
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-white hover:bg-pink-50'
                  } border border-pink-200`}
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Your Love Story</h3>
            <div className="p-6 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 mb-6">
              <p className="text-purple-800 leading-relaxed">{story}</p>
            </div>
            <Button
              onClick={() => {
                setStep(1);
                setAnswers({ season: '', date: '', destination: '' });
                setStory('');
              }}
            >
              Generate New Story
            </Button>
          </div>
        );
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
        Love Story Generator
      </h2>

      <Card>
        {renderQuestion()}
      </Card>
    </div>
  );
};

export default LoveStoryGenerator;