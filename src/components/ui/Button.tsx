import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon
}: ButtonProps) => {
  const baseClasses = "font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-200 active:scale-95",
    secondary: "bg-gradient-to-r from-purple-100 to-pink-100 text-pink-700 hover:shadow-md hover:shadow-pink-100 active:scale-95",
    outline: "bg-transparent border-2 border-pink-300 text-pink-600 hover:bg-pink-50 active:scale-95"
  };
  
  const sizeClasses = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-5",
    lg: "text-lg py-3 px-6"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;