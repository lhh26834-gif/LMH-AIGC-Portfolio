import { videoHighlights } from './works.js';

export const videoWorks = videoHighlights.map((item) => ({
  ...item,
  poster: item.poster || item.image,
  type: item.tags?.[0] || 'AI视频',
}));
