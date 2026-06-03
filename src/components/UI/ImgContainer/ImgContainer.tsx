import './ImgContainer.css';
import { Link } from 'react-router-dom';

interface LoaderProps {
  source?: string;
  alt?: string;
  title?: string;
  href?: string; 
}

const ImgContainer = ({ source, alt, title, href }: LoaderProps) => {
  const content = (
    <>
      <img src={source} alt={alt} className='ImgContainer__img' loading="lazy" decoding="async" />
      <h3 className='ImgContainer__title'>{title}</h3>
    </>
  );

  if (!href) {
    return <article className='ImgContainer'>{content}</article>;
  }

  if (href.startsWith('http')) {
    return (
      <a className='ImgContainer' href={href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${title ?? 'proyecto'} en una pestaña nueva`}>
        {content}
      </a>
    );
  }

  return (
    <Link className='ImgContainer' to={href} aria-label={`Ver detalle de ${title ?? 'proyecto'}`}>
      {content}
    </Link>
  );
};

export default ImgContainer;
