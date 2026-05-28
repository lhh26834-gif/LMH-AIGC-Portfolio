import React, { useCallback, useMemo, useState } from 'react';
import ImageLightbox from '../components/ImageLightbox.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import WorkCard from '../components/WorkCard.jsx';
import { useManagedWorks } from '../utils/adminStore.js';

const filters = ['全部', 'AI短剧分镜', '人物设定', '场景设定', '图片作品', 'AI海报'];

export default function ImageWorks() {
  const works = useManagedWorks();
  const [active, setActive] = useState('全部');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const imageWorks = useMemo(() => works.filter((item) => item.category !== '视频作品'), [works]);
  const filteredWorks = useMemo(() => (active === '全部' ? imageWorks : imageWorks.filter((item) => item.category === active)), [active, imageWorks]);
  const moveLightbox = useCallback((direction) => {
    setLightboxIndex((current) => (current + direction + filteredWorks.length) % filteredWorks.length);
  }, [filteredWorks.length]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="03 / Image Works"
        title="图片作品"
        description="以网格画廊展示 AIGC 图像、人物设定、场景设定、短剧分镜和概念视觉。"
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActive(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                active === item
                  ? 'border-white bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.18)]'
                  : 'border-white/12 bg-white/[0.035] text-zinc-400 hover:border-white/35 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="text-sm text-zinc-500">{filteredWorks.length} 件作品</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorks.map((item, index) => (
          <WorkCard key={item.id} work={item} onOpen={() => setLightboxIndex(index)} />
        ))}
      </div>

      <ImageLightbox items={filteredWorks} activeIndex={lightboxIndex} onClose={() => setLightboxIndex(-1)} onMove={moveLightbox} />
    </section>
  );
}
