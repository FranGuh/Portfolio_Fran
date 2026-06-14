export const SITE_URL = 'https://franguh.plynte.com';
export const SITE_NAME = 'FranGuh Portfolio';
export const DEFAULT_OG_IMAGE = '/pictures/Homepicture.webp';

export const toAbsoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Plain concatenation (SITE_URL has no trailing slash, path is rooted) keeps
  // this util free of the `URL` runtime global so it can be imported from
  // build-time / node code as well as the browser.
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
