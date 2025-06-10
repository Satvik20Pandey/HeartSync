import { useEffect, useState, useRef } from 'react';
import { Heart } from 'lucide-react';

const BackgroundParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number;
    size: number;
    speed: number;
    opacity: number;
    color: string;
  }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const particleCount = Math.min(Math.floor(width * height / 30000), 15);
    
    const colors = ['#f9a8d4', '#c4b5fd', '#f472b6', '#e879f9'];
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 15,
      speed: 0.5 + Math.random() * 1,
      opacity: 0.3 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setParticles(newParticles);
    
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => {
          let newY = particle.y - particle.speed;
          
          if (newY < -50) {
            newY = height + 50;
          }
          
          return {
            ...particle,
            y: newY
          };
        })
      );
    };
    
    const intervalId = setInterval(animateParticles, 50);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.opacity,
            transform: `scale(${particle.size / 20})`,
            color: particle.color,
            transition: 'top 0.5s linear'
          }}
        >
          <Heart size={20} fill={particle.color} stroke="none" />
        </div>
      ))}
    </div>
  );
};

export default BackgroundParticles;