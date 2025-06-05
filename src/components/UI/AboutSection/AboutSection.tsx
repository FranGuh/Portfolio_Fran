import './AboutSection.css'

interface Props{
  title?: string;
  titleHead?: string;
  subtitle?: string;
  description?: string;
  source?: string;
  alt?: string;
}
const AboutSection = ({title,titleHead,subtitle,description,source,alt}:Props) => {
  return (
    <>
      <section className='AboutSection'>
        <div className='AboutSection-header'>
            <h3 className='AboutSection__titleHead'>{titleHead}</h3>
            <h1 className='AboutSection__title'>{title}</h1>
            <h2 className='AboutSection__subtitle'>{subtitle}</h2>
        <p className='AboutSection__description'>{description}</p>
        </div>
        <img src={source} alt={alt} className='AboutSection__img' loading='lazy'/>
       </section>
    </>
  )
}

export default AboutSection
