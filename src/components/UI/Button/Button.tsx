import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  disabled,
  ...rest
}: ButtonProps) => {
  
  const buttonClasses = [
    'button',
    `button--${variant}`,
    isLoading ? 'button--loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      disabled={isLoading || disabled }
      aria-busy={isLoading}
      {...rest}
    >
      {/* Contenedor para evitar que el texto desaparezca y cause Layout Shift */}
      <span className="button__content" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </span>

      {/* El Spinner se posiciona absolutamente para no empujar el texto */}
      {isLoading && (
        <span className="button__loader" aria-hidden="true">
          <span className="button__spinner"></span>
        </span>
      )}
    </button>
  );
};

export default Button;
