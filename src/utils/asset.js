const MATERIAL_ROOT = 'images/AIGC%E4%BD%9C%E5%93%81%E9%9B%86%E7%B4%A0%E6%9D%90';

export function assetUrl(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path)) return path;

  const cleanPath = path.replace(/^\/+/, '');
  const materialFolders = /^(0[1-8]_|04_AI|05_)/;
  const encodedPath = cleanPath.split('/').map(encodeURIComponent).join('/');
  const normalizedPath = materialFolders.test(cleanPath)
    ? `${MATERIAL_ROOT}/${encodedPath}`
    : encodedPath;

  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}
