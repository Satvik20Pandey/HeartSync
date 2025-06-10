import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LoveFact {
  id: number;
  text: string;
  emoji: string;
  background: string;
}

const LoveFactsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const loveFacts: LoveFact[] = [
    {
      id: 1,
      text: "Couples who laugh together are more likely to stay together",
      emoji: "❤️",
      background: "bg-gradient-to-br from-pink-100 to-rose-100"
    },
    {
      id: 2,
      text: "Looking into your partner's eyes can synchronize your heartbeats",
      emoji: "💓",
      background: "bg-gradient-to-br from-purple-100 to-lavender-100"
    },
    {
      id: 3,
      text: "Love activates the brain's reward center just like chocolate",
      emoji: "🍫",
      background: "bg-gradient-to-br from-peach-100 to-orange-100"
    },
    {
      id: 4,
      text: "Holding hands with your loved one can reduce physical pain",
      emoji: "🤝",
      background: "bg-gradient-to-br from-blue-100 to-sky-100"
    },
    {
      id: 5,
      text: "The average person falls in love 7 times before marriage",
      emoji: "💕",
      background: "bg-gradient-to-br from-pink-100 to-purple-100"
    },
    {
      id: 6,
      text: "Butterflies in your stomach are real - it's your nervous system!",
      emoji: "🦋",
      background: "bg-gradient-to-br from-yellow-100 to-amber-100"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % loveFacts.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [loveFacts.length]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      goToSlide((currentSlide + 1) % loveFacts.length);
    } else {
      goToSlide((currentSlide - 1 + loveFacts.length) % loveFacts.length);
    }
  };

  return (
    <div className="relative w-full mb-8">
      <div className="relative h-32 rounded-2xl overflow-hidden shadow-lg">
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          } ${loveFacts[currentSlide].background}`}
        >
          <div className="relative h-full flex items-center justify-center p-6">
            {/* Sparkle decorations */}
            <div className="absolute top-3 right-3 text-pink-300 animate-pulse">
              <Sparkles size={16} />
            </div>
            <div className="absolute bottom-3 left-3 text-purple-300 animate-pulse delay-500">
              <Sparkles size={12} />
            </div>
            
            {/* Heart decoration */}
            <div className="absolute top-3 left-3 text-pink-400 animate-pulse delay-1000">
              <Heart size={14} fill="currentColor" />
            </div>

            {/* Main content */}
            <div className="text-center max-w-md">
              <p className="text-purple-800 font-medium text-lg leading-relaxed">
                {loveFacts[currentSlide].text}
              </p>
              <div className="text-2xl mt-2">
                {loveFacts[currentSlide].emoji}
              </div>
            </div>
          </div>
        </div>

        {/* Touch/swipe area */}
        <div
          className="absolute inset-0 cursor-pointer"
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
            const handleTouchEnd = (endEvent: TouchEvent) => {
              const endX = endEvent.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                handleSwipe(diff > 0 ? 'left' : 'right');
              }
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchend', handleTouchEnd);
          }}
          onClick={() => goToSlide((currentSlide + 1) % loveFacts.length)}
        />
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {loveFacts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-pink-500 w-6'
                : 'bg-pink-200 hover:bg-pink-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoveFactsCarousel;