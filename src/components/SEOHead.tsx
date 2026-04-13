// src/components/SEOHead.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
}

export const SEOHead = ({ title, description, image, url }: SEOProps) => (
    <Helmet>
        <html lang="es" />
        <title>{`${title} | Gustavo Francisco — Full Stack Developer`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image || '/pictures/Homepicture.webp'} />
        <meta property="og:url" content={url || 'https://plynte.com'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={url || 'https://plynte.com'} />
    </Helmet>
);