import React, { useCallback, useState } from 'react';
import ImageLightbox from '../components/ImageLightbox.jsx';
import PosterCard from '../components/PosterCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { works } from '../data/works.js';

const posterWorks = works.filter((item) => item.category === 'AI海报');

export default function PosterWorks() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const moveLightbox = useCallback((direction) => {
    setLightboxIndex((current) => (current + direction + posterWorks.length) % posterWorks.length);
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="04 / Poster Works"
        title="海报作品"
        description="使用接近真实海报的竖版比例，突出商业视觉、产品广告和文旅传播画面。"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posterWorks.map((item, index) => (
          <PosterCard key={item.id} item={item} onOpen={() => setLightboxIndex(index)} />
        ))}
      </div>
      <ImageLightbox items={posterWorks} activeIndex={lightboxIndex} onClose={() => setLightboxIndex(-1)} onMove={moveLightbox} />
    </section>
  );
}
