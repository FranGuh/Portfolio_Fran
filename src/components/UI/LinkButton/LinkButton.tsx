import React from 'react';
import './LinkButton.css';

interface LinkButtonProps {
  children: React.ReactNode;
  Icon?: React.ComponentType<{ className?: string }>;
  href: string;
  onClick?: () => void;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, Icon, href, onClick, className = "" }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className={`LinkButton ${className}`}>
      <a
        href={href}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {Icon && <Icon className="LinkButton__icon" />}
        {children}
      </a>
    </div>
  );
};

export default LinkButton;