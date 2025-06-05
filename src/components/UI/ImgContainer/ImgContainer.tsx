import './ImgContainer.css';

interface LoaderProps {
  source?: string;
  alt?: string;
  title?: string;
   href?: string;
}

const ImgContainer = ({source, alt, title, href}:LoaderProps) => {
  const content = (
    <article className='ImgContainer'>
      <img src={source} alt={alt} className='ImgContainer__img' loading="lazy"/>
      <h3 className='ImgContainer__title'>{title}</h3>
    </article>
  )

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className='ImgContainer'>
      {content}
    </a>
  ) : (
    content
  );
}



export default ImgContainer;
