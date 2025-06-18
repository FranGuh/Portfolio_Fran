// LinkButtom.tsx
import React from 'react';
import './LinkButtom.css';

interface LinkButtomProps {
  text: string;
  Icon?: React.ComponentType<{ className?: string }>;
  href: string;
  onClick?: () => void;
}

const LinkButtom: React.FC<LinkButtomProps> = ({ text, Icon, href, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="LinkButtom">
      <a
        href={href}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {Icon && <Icon className="LinkButtom__icon" />}
        {text}
      </a>
    </div>
  );
};

export default LinkButtom;
