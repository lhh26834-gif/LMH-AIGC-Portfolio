import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset.js';

const placement = [
  'lg:absolute lg:left-[2%] lg:top-[13%] lg:h-[455px] lg:w-[60%] lg:z-30',
  'lg:absolute lg:right-[3%] lg:top-[4%] lg:h-[218px] lg:w-[35%] lg:z-40',
  'lg:absolute lg:right-[1%] lg:top-[39%] lg:h-[270px] lg:w-[38%] lg:z-50 lg:rotate-[4deg]',
  'lg:absolute lg:left-[30%] lg:bottom-[1%] lg:h-[205px] lg:w-[43%] lg:z-40 lg:-rotate-[2deg]',
];

export default function HomeShowcase({ items }) {
  return (
    <div className="showcase-stage relative grid gap-4 overflow-visible sm:grid-cols-2 lg:block lg:min-h-[640px]">
      <div className="absolute inset-0 -z-20 rounded-[38px] border border-white/10 bg-white/[0.022] backdrop-blur-sm" />
      <div className="absolute left-[18%] top-[18%] -z-20 h-[420px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(185,215,245,0.2),transparent_66%)] blur-3xl" />
      <div className="perspective-grid absolute bottom-[-8%] left-[3%] right-[2%] -z-20 h-[46%] opacity-70" />
      <div className="orbit-line absolute left-[3%] top-[14%] -z-10 hidden h-[460px] w-[84%] rotate-[-10deg] rounded-[50%] lg:block" />
      <div className="orbit-line absolute left-[11%] top-[20%] -z-10 hidden h-[360px] w-[70%] rotate-[13deg] rounded-[50%] opacity-70 lg:block" />
      <div className="orbit-line absolute left-[21%] top-[30%] -z-10 hidden h-[230px] w-[48%] rotate-[-20deg] rounded-[50%] opacity-60 lg:block" />
      <div className="absolute inset-x-10 top-[38%] -z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute left-[46%] top-10 -z-10 h-[84%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="tech-grid absolute inset-0 -z-20 opacity-28" />
      <span className="glow-node absolute left-[14%] top-[23%] z-10 hidden lg:block" />
      <span className="glow-node absolute right-[21%] top-[31%] z-10 hidden lg:block" />
      <span className="glow-node absolute bottom-[19%] left-[51%] z-10 hidden lg:block" />
      <div className="absolute left-[8%] top-[9%] z-10 hidden h-px w-36 bg-gradient-to-r from-transparent via-white/30 to-transparent lg:block" />
      <div className="absolute bottom-[14%] right-[7%] z-10 hidden h-px w-44 bg-gradient-to-r from-transparent via-slate-200/25 to-transparent lg:block" />
      <div className="absolute right-10 top-14 z-10 hidden rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur lg:block">
        AIGC ENGINE
      </div>
      <div className="absolute right-[5%] top-[24%] z-10 hidden rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur lg:block">
        MIDJOURNEY
      </div>
      <div className="absolute bottom-[22%] right-[2%] z-10 hidden rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur lg:block">
        CONTROLNET
      </div>
      <div className="absolute bottom-12 left-8 z-10 hidden rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur lg:block">
        GENERATING...
      </div>

      {items.map((item, index) => (
        <ShowcaseCard key={item.type} item={item} className={placement[index]} />
      ))}
    </div>
  );
}

function ShowcaseCard({ item, className }) {
  const coverSrc = item.coverImage || item.image;

  return (
    <Link
      to={item.link}
      className={`tech-card work-hover group relative aspect-[4/3] overflow-hidden rounded-[22px] border-white/16 bg-white/[0.045] shadow-[0_30px_100px_rgba(0,0,0,0.55),0_0_34px_rgba(180,210,240,0.09)] backdrop-blur-xl lg:aspect-auto ${className}`}
    >
      <img
        src={assetUrl(coverSrc)}
        alt={item.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full border border-white/14 bg-black/48 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-200 backdrop-blur">
        {item.type}
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <div className="mt-2 flex items-center justify-between gap-4 text-xs text-zinc-300">
          <span>{item.description}</span>
          <span className="shrink-0 text-zinc-400">{item.meta}</span>
        </div>
      </div>
    </Link>
  );
}
