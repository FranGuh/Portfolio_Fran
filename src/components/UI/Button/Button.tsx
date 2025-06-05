import { useNavigate } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
  text: string;
  redirection?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = ({ text, redirection, variant = 'primary' }: ButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirection) {
      const path = redirection.startsWith('/') ? redirection : `/${redirection}`;
      navigate(path);
    }
  };


  return (
    <button className={`button button--${variant}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
