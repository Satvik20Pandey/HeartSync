import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  animated?: boolean;
}

const Card = ({ title, children, onClick, className = '', animated = false }: CardProps) => {
  return (
    <div 
      className={`
        bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-5 
        border border-pink-100
        ${animated ? 'hover:shadow-xl hover:scale-105 transform transition-all duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-xl font-bold mb-3 text-pink-600 font-display">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;