import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Home from './components/Home';
import BackgroundParticles from './components/ui/BackgroundParticles';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100">
      <BackgroundParticles />
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;