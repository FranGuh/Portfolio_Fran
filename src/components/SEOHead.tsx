// src/components/SEOHead.tsx
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
}

export const SEOHead = ({ title, description, image, url }: SEOProps) => {
    const { language, t } = useLanguage();
    
    // Mapeo inteligente de metatags bilingües
    let displayTitle = title;
    let displayDescription = description;
    
    if (title === "Ingeniero Full Stack" || title === "Inicio" || title === "Home") {
        displayTitle = t("seo.homeTitle");
        displayDescription = t("seo.homeDesc");
    } else if (title === "Sobre Mí" || title === "About Me") {
        displayTitle = t("seo.aboutTitle");
        displayDescription = t("seo.aboutDesc");
    } else if (title === "Portafolio de Proyectos" || title === "Portfolio") {
        displayTitle = t("seo.portfolioTitle");
        displayDescription = t("seo.portfolioDesc");
    }
    
    return (
        <Helmet>
            <html lang={language} />
            <title>{`${displayTitle} | Gustavo Francisco — Full Stack Developer`}</title>
            <meta name="description" content={displayDescription} />
            <meta property="og:title" content={displayTitle} />
            <meta property="og:description" content={displayDescription} />
            <meta property="og:image" content={image || '/pictures/Homepicture.webp'} />
            <meta property="og:url" content={url || 'https://plynte.com'} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="canonical" href={url || 'https://plynte.com'} />
        </Helmet>
    );
};