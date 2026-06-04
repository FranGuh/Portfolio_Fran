import LinkButtom from '../../components/UI/LinkButton/LinkButton';
import './AboutSection.css'
import { useEffect, useRef } from 'react';

interface Props {
  title?: string;
  titleHead?: string;
  subtitle?: string;
  description?: string;
  source?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
}
const AboutSection = ({ title, titleHead, subtitle, description, source, alt, className, imageClassName}: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
useEffect(() => {
  if (!imgRef.current) return;

  const img = imgRef.current;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
        img.style.transform = 'translateY(0px)';
      }
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(img);

  function handleScroll() {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollProgress = 1 - rect.top / windowHeight;
    const maxOffset = 30;
    const offset = Math.min(maxOffset, Math.max(0, scrollProgress * maxOffset));
    img.style.transform = `translateY(${offset}px)`;
  }

  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', handleScroll);
  };
}, []);





  return (
    <>
      <section id='SobreMi' className={`AboutSection ${className || ''}`.trim()}>
        <div className='AboutSection-header'>
          <h3 className='AboutSection__titleHead'>{titleHead}</h3>
          <h1 className='AboutSection__title'>{title}</h1>
          <h2 className='AboutSection__subtitle'>{subtitle}</h2>
          <p className='AboutSection__description'>{description}</p>

          <div className="AboutSection__contact">
            <LinkButtom
            href='https://linkedin.com/in/gustavo-francisco-salgado-andrade-496553337'
            >
              Linkedin
            </LinkButtom>
            <LinkButtom
              href='https://github.com/FranGuh'
            >
              Github
            </LinkButtom>
          </div>
        </div>
        <img
          ref={imgRef}
          src={source}
          alt={alt}
          className={`AboutSection__img ${imageClassName || ''}`.trim()}
          loading='lazy'
          decoding='async'
        />
      </section>
    </>
  )
}

export default AboutSection
