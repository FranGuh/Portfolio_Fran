import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { DEFAULT_OG_IMAGE, SITE_NAME, toAbsoluteUrl } from '../utils/site';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  robots?: string;
}

export const SEOHead = ({ title, description, image, url, robots }: SEOProps) => {
  const { language, t } = useLanguage();
  const location = useLocation();

  let displayTitle = title;
  let displayDescription = description;

  if (title === 'Ingeniero Full Stack' || title === 'Inicio' || title === 'Home') {
    displayTitle = t('seo.homeTitle');
    displayDescription = t('seo.homeDesc');
  } else if (title === 'Sobre Mí' || title === 'About Me') {
    displayTitle = t('seo.aboutTitle');
    displayDescription = t('seo.aboutDesc');
  } else if (title === 'Portafolio de Proyectos' || title === 'Portfolio') {
    displayTitle = t('seo.portfolioTitle');
    displayDescription = t('seo.portfolioDesc');
  }

  const canonicalUrl = url ? toAbsoluteUrl(url) : toAbsoluteUrl(location.pathname);
  const previewImage = toAbsoluteUrl(image || DEFAULT_OG_IMAGE);
  const robotsContent =
    robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      <html lang={language} />
      <title>{`${displayTitle} | Gustavo Francisco — Full Stack Developer`}</title>
      <meta name="description" content={displayDescription} />
      <meta name="robots" content={robotsContent} />
      <meta name="author" content="Gustavo Francisco Salgado Andrade" />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={previewImage} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
