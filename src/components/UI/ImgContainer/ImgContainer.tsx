import './ImgContainer.css';
import { useNavigate } from 'react-router-dom';

interface LoaderProps {
  source?: string;
  alt?: string;
  title?: string;
  href?: string; 
}

const ImgContainer = ({ source, alt, title, href }: LoaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href && !href.startsWith('http')) {
      navigate(href);
    } else if (href) {
      window.open(href, '_blank');
    }
  };

  return (
    <article className='ImgContainer' onClick={handleClick} style={{ cursor: href ? 'pointer' : 'default' }}>
      <img src={source} alt={alt} className='ImgContainer__img' loading="lazy" />
      <h3 className='ImgContainer__title'>{title}</h3>
    </article>
  );
};

export default ImgContainer;
