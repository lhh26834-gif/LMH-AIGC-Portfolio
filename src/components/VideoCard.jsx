import React from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { assetUrl } from '../utils/asset.js';

export default function VideoCard({ item, duration = '01:20' }) {
  const hasVideo = Boolean(item.video);
  const previewImage = item.poster || item.image;
  const posterSrc = previewImage ? assetUrl(previewImage) : undefined;

  const externalPreview = (
    <>
      {previewImage ? (
        <img src={assetUrl(previewImage)} alt={item.title} className="relative z-10 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" loading="lazy" />
      ) : (
        <span className="relative z-10 flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.16),transparent_44%),linear-gradient(135deg,#090b0f,#141821)] text-xs uppercase tracking-[0.28em] text-zinc-500">
          Video
        </span>
      )}
      <span className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/12 to-transparent" />
      <span className="absolute left-1/2 top-1/2 z-30 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/42 text-white shadow-[0_0_36px_rgba(220,235,255,0.18)] backdrop-blur-md">
        <Play size={25} fill="currentColor" />
      </span>
      <span className="absolute bottom-4 right-4 z-30 border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-zinc-200 backdrop-blur">{duration}</span>
    </>
  );

  return (
    <article className="tech-card work-hover group overflow-hidden">
      {hasVideo ? (
        <div className="relative aspect-video overflow-hidden bg-[#0b0b0f]">
          <video src={assetUrl(item.video)} poster={posterSrc} controls playsInline preload="metadata" className="h-full w-full object-cover">
            当前浏览器不支持视频播放。
          </video>
          <span className="pointer-events-none absolute bottom-4 right-4 border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-zinc-200 backdrop-blur">{duration}</span>
        </div>
      ) : (
        <a href={item.externalUrl} target="_blank" rel="noreferrer" className="relative block aspect-video overflow-hidden bg-[#0b0b0f]">
          {externalPreview}
        </a>
      )}

      <div className="p-5 sm:p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">{item.type || item.category}</p>
        <h2 className="text-xl font-semibold text-white">{item.title}</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{item.description}</p>
        {hasVideo ? (
          <p className="mt-5 text-xs text-zinc-500">可在页面内直接播放</p>
        ) : (
          <a href={item.externalUrl} target="_blank" rel="noreferrer" className="tech-button mt-5 inline-flex items-center gap-2 px-3 py-2 text-xs text-zinc-200 transition">
            <span>打开视频</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
