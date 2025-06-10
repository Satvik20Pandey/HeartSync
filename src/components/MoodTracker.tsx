import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, PieChart } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Props {
  onBack: () => void;
}

interface MoodEntry {
  date: string;
  mood: string;
}

const MoodTracker = ({ onBack }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('moodEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedMood, setSelectedMood] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😍', label: 'In Love' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
  ];

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleMoodSelect = (date: Date, mood: string) => {
    const dateStr = formatDate(date);
    const existingEntryIndex = moodEntries.findIndex(entry => entry.date === dateStr);

    if (existingEntryIndex !== -1) {
      const newEntries = [...moodEntries];
      newEntries[existingEntryIndex] = { date: dateStr, mood };
      setMoodEntries(newEntries);
    } else {
      setMoodEntries([...moodEntries, { date: dateStr, mood }]);
    }
    setSelectedMood(mood);
  };

  const getMoodForDate = (date: Date) => {
    const entry = moodEntries.find(entry => entry.date === formatDate(date));
    return entry?.mood || '';
  };

  const calculateMoodStats = () => {
    const currentMonthEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() === selectedDate.getMonth() &&
        entryDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    const stats = moods.reduce((acc, mood) => {
      acc[mood.label] = 0;
      return acc;
    }, {} as Record<string, number>);

    currentMonthEntries.forEach(entry => {
      const mood = moods.find(m => m.emoji === entry.mood)?.label || '';
      if (mood) stats[mood]++;
    });

    return stats;
  };

  const renderCalendar = () => {
    const days = [];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const mood = getMoodForDate(date);
      const isToday = formatDate(date) === formatDate(new Date());

      days.push(
        <div
          key={day}
          className={`h-12 border border-pink-100 rounded-lg relative ${
            isToday ? 'bg-pink-50' : ''
          }`}
        >
          <div className="absolute top-1 left-1 text-xs text-purple-600">{day}</div>
          <button
            onClick={() => handleMoodSelect(date, selectedMood)}
            className="w-full h-full flex items-center justify-center text-xl"
          >
            {mood || ''}
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={previousMonth}
            icon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>
          <h3 className="text-xl font-bold text-purple-800">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            icon={<ChevronRight size={16} />}
          >
            Next
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-purple-600 mb-2">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const renderMoodStats = () => {
    const stats = calculateMoodStats();
    const total = Object.values(stats).reduce((sum, count) => sum + count, 0);

    return (
      <Card className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="text-pink-500" size={24} />
          <h3 className="text-lg font-bold text-purple-800">Monthly Mood Summary</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(stats).map(([mood, count]) => (
            <div key={mood} className="flex items-center justify-between">
              <span className="text-purple-700">{mood}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500"
                    style={{
                      width: `${total ? (count / total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-purple-600">
                  {total ? Math.round((count / total) * 100) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
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
        Love Mood Tracker
      </h2>

      <Card className="mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">Select Your Mood</h3>
          <div className="flex justify-around">
            {moods.map(mood => (
              <button
                key={mood.emoji}
                onClick={() => setSelectedMood(mood.emoji)}
                className={`text-2xl p-2 rounded-full transition-all ${
                  selectedMood === mood.emoji
                    ? 'bg-pink-100 transform scale-110'
                    : 'hover:bg-pink-50'
                }`}
                title={mood.label}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </div>

        {renderCalendar()}
      </Card>

      {renderMoodStats()}
    </div>
  );
};

export default MoodTracker;