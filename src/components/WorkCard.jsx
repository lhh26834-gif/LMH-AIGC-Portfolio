import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset.js';

const categoryRoutes = {
  AI海报: '/posters',
  图片作品: '/images',
  视频作品: '/videos',
  AI短剧分镜: '/images',
  人物设定: '/images',
  场景设定: '/images',
};

export default function WorkCard({ work, onOpen }) {
  const content = (
    <>
      <div className="abstract-cover aspect-[4/3] overflow-hidden">
        <img src={assetUrl(work.image)} alt={work.title} className="relative z-10 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" loading="lazy" />
        <span className="absolute inset-0 z-20 bg-gradient-to-t from-black/62 via-transparent to-transparent" />
        <span className="absolute bottom-4 right-4 z-30 translate-y-2 border border-white/15 bg-black/55 px-3 py-1 text-xs text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          查看大图
        </span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">{work.category}</p>
            <h3 className="text-lg font-semibold text-white">{work.title}</h3>
          </div>
          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] border border-white/15 bg-white/5 text-zinc-300 transition group-hover:border-white/35 group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-zinc-400">{work.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(work.tags || []).slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className="tech-card work-hover group block w-full cursor-pointer overflow-hidden text-left">
        {content}
      </button>
    );
  }

  return (
    <Link to={categoryRoutes[work.category] || '/images'} className="tech-card work-hover group overflow-hidden">
      {content}
    </Link>
  );
}
