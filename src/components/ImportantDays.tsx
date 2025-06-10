import { useState } from 'react';
import { ArrowLeft, Calendar, Heart } from 'lucide-react';
import Card from './ui/Card';

interface Props {
  onBack: () => void;
}

interface LoveDay {
  date: string;
  name: string;
  description: string;
  emoji: string;
}

const ImportantDays = ({ onBack }: Props) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(1); // Default to January

  const valentineWeek: LoveDay[] = [
    {
      date: "February 7",
      name: "Rose Day",
      description: "Express love with the beauty of roses",
      emoji: "🌹"
    },
    {
      date: "February 8",
      name: "Propose Day",
      description: "The perfect day to express your feelings",
      emoji: "💍"
    },
    {
      date: "February 9",
      name: "Chocolate Day",
      description: "Share sweetness with your loved ones",
      emoji: "🍫"
    },
    {
      date: "February 10",
      name: "Teddy Day",
      description: "Gift a cuddly companion",
      emoji: "🧸"
    },
    {
      date: "February 11",
      name: "Promise Day",
      description: "Make meaningful commitments",
      emoji: "🤝"
    },
    {
      date: "February 12",
      name: "Hug Day",
      description: "Share warm embraces",
      emoji: "🤗"
    },
    {
      date: "February 13",
      name: "Kiss Day",
      description: "Express love through kisses",
      emoji: "💋"
    },
    {
      date: "February 14",
      name: "Valentine's Day",
      description: "Celebrate love in all its forms",
      emoji: "❤️"
    }
  ];

  const otherLoveDays: LoveDay[] = [
    {
      date: "August 1",
      name: "Girlfriend Day",
      description: "Celebrate the special woman in your life",
      emoji: "👩‍❤️‍👨"
    },
    {
      date: "October 3",
      name: "Boyfriend Day",
      description: "Show appreciation for your special man",
      emoji: "👨‍❤️‍👩"
    },
    {
      date: "April 11",
      name: "Pet Day",
      description: "Show extra love to your furry friends",
      emoji: "🐾"
    },
    {
      date: "July 6",
      name: "Kiss Day",
      description: "International day of kissing",
      emoji: "💋"
    },
    {
      date: "July 30",
      name: "Friendship Day",
      description: "Celebrate all kinds of love",
      emoji: "🤝"
    }
  ];

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const filterDaysByMonth = (days: LoveDay[]) => {
    return days.filter(day => {
      const month = new Date(day.date + ", 2024").getMonth() + 1;
      return month === selectedMonth;
    });
  };

  const allDaysInMonth = [...filterDaysByMonth(valentineWeek), ...filterDaysByMonth(otherLoveDays)];

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
        Important Love Days
      </h2>

      <div className="mb-6">
        <div className="flex items-center justify-between bg-pink-50 rounded-lg p-4">
          <Calendar className="text-pink-500" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="ml-4 px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {allDaysInMonth.length > 0 ? (
        <div className="grid gap-4">
          {allDaysInMonth.map((day, index) => (
            <Card 
              key={index}
              className="transform transition-all hover:scale-102 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-purple-800">
                    {day.name} {day.emoji}
                  </h3>
                  <p className="text-pink-600 font-medium">{day.date}</p>
                  <p className="text-purple-600 mt-2">{day.description}</p>
                </div>
                <Heart 
                  className="text-pink-400 animate-pulse" 
                  fill="#f472b6"
                  size={32}
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <p className="text-purple-600">No special days this month! 🎈</p>
          <p className="text-pink-500 mt-2">But every day is special with love! ❤️</p>
        </Card>
      )}
    </div>
  );
};

export default ImportantDays;