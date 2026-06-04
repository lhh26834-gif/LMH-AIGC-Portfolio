import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { assetUrl } from '../utils/asset.js';

export default function PosterCard({ item, onOpen }) {
  return (
    <button type="button" onClick={onOpen} className="tech-card work-hover group block w-full cursor-pointer overflow-hidden text-left">
      <div className="artwork-cover">
        <img src={assetUrl(item.image)} alt={item.title} className="relative z-10 block h-full w-full rounded-[12px] object-cover transition duration-500 group-hover:scale-[1.015]" loading="lazy" />
        <span className="absolute bottom-4 right-4 z-30 translate-y-2 border border-white/15 bg-black/55 px-3 py-1 text-xs text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          查看大图
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">{item.category}</p>
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
          </div>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] border border-white/15 bg-white/5 text-zinc-300">
            <ArrowUpRight size={17} />
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">{item.description}</p>
      </div>
    </button>
  );
}
