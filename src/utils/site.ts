export const SITE_URL = 'https://franguh.plynte.com';
export const SITE_NAME = 'FranGuh Portfolio';
export const DEFAULT_OG_IMAGE = '/pictures/Homepicture.webp';

export const toAbsoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
};
