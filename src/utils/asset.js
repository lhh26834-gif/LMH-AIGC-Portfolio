const MATERIAL_ROOT = 'images/AIGC%E4%BD%9C%E5%93%81%E9%9B%86%E7%B4%A0%E6%9D%90';

export function assetUrl(path) {
  const baseUrl = globalThis.__LMH_ASSET_BASE__ || import.meta.env.BASE_URL;
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path)) return path;
  if (path.startsWith(baseUrl)) return path;
  if (path.startsWith('/assets/')) return `${baseUrl.replace(/\/$/, '')}${path}`;

  const cleanPath = path.replace(/^\/+/, '');
  const materialFolders = /^(0[1-8]_|04_AI|05_)/;
  const encodedPath = cleanPath.split('/').map(encodeURIComponent).join('/');
  const normalizedPath = materialFolders.test(cleanPath)
    ? `${MATERIAL_ROOT}/${encodedPath}`
    : encodedPath;

  return `${baseUrl}${normalizedPath}`;
}
