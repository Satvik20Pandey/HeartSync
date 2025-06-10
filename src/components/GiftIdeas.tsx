import { useState } from 'react';
import { ArrowLeft, Gift, Heart } from 'lucide-react';
import Card from './ui/Card';

interface Props {
  onBack: () => void;
}

interface GiftIdea {
  id: number;
  title: string;
  description: string;
  emoji: string;
  category: string;
}

const GiftIdeas = ({ onBack }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Gifts', emoji: '🎁' },
    { id: 'romantic', name: 'Romantic', emoji: '💝' },
    { id: 'creative', name: 'Creative', emoji: '🎨' },
    { id: 'experiences', name: 'Experiences', emoji: '✨' }
  ];

  const giftIdeas: GiftIdea[] = [
    {
      id: 1,
      title: "Personalized Love Book",
      description: "Create a custom book telling your love story with photos and memories.",
      emoji: "📖",
      category: "creative"
    },
    {
      id: 2,
      title: "Heart Locket Necklace",
      description: "A classic romantic gift with your photos inside.",
      emoji: "📿",
      category: "romantic"
    },
    {
      id: 3,
      title: "Couple's Cooking Class",
      description: "Learn to cook together and enjoy a romantic meal.",
      emoji: "👩‍🍳",
      category: "experiences"
    },
    {
      id: 4,
      title: "Love Letter Jar",
      description: "365 tiny love notes, one for each day of the year.",
      emoji: "💌",
      category: "creative"
    },
    {
      id: 5,
      title: "Star Map Print",
      description: "Custom star map from the night you met or first date.",
      emoji: "🌟",
      category: "romantic"
    },
    {
      id: 6,
      title: "Sunset Picnic",
      description: "Plan a romantic picnic with their favorite foods.",
      emoji: "🧺",
      category: "experiences"
    },
    {
      id: 7,
      title: "Custom Song",
      description: "Write or commission a song about your love story.",
      emoji: "🎵",
      category: "creative"
    },
    {
      id: 8,
      title: "Spa Day Together",
      description: "Relaxing couple's massage and spa treatments.",
      emoji: "💆‍♀️",
      category: "experiences"
    },
    {
      id: 9,
      title: "Love Coupon Book",
      description: "Handmade coupons for massages, date nights, etc.",
      emoji: "🎫",
      category: "creative"
    },
    {
      id: 10,
      title: "Memory Scrapbook",
      description: "Handcrafted book filled with tickets, photos, and memories.",
      emoji: "📔",
      category: "romantic"
    }
  ];

  const filteredGifts = selectedCategory === 'all' 
    ? giftIdeas 
    : giftIdeas.filter(gift => gift.category === selectedCategory);

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
        Gift Ideas for Your Love
      </h2>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                : 'bg-white text-purple-700 hover:bg-pink-50'
            } border border-pink-200`}
          >
            {category.emoji} {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGifts.map(gift => (
          <Card 
            key={gift.id}
            className="hover:scale-102 transition-transform"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{gift.emoji}</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  {gift.title}
                </h3>
                <p className="text-purple-600">
                  {gift.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GiftIdeas;