import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const SplashScreen = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in animation
    setOpacity(1);
    
    // Play background music (commented out as it would require user interaction)
    // const audio = new Audio('/path-to-romantic-music.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(e => console.log('Audio play failed:', e));
    
    return () => {
      // audio.pause();
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div className="relative">
        <Heart className="text-pink-500 w-24 h-24 animate-pulse absolute -top-16 -left-16 opacity-70" />
        <Heart className="text-purple-400 w-16 h-16 animate-pulse absolute -top-12 -right-12 opacity-60" />
        <Heart className="text-red-400 w-20 h-20 animate-pulse absolute -bottom-16 -left-12 opacity-80" />
        <Heart className="text-pink-300 w-14 h-14 animate-pulse absolute -bottom-12 -right-16 opacity-70" />
        
        <div className="text-center relative z-10">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display animate-fadeIn">
            HeartSync 💖
          </h1>
          <p className="text-xl text-purple-700 font-medium italic animate-fadeInUp">
            Where Hearts Connect & Love Grows
          </p>
        </div>
      </div>
      
      <div className="mt-16 relative">
        <div className="w-64 h-1 bg-pink-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;