import React, { useState } from 'react';
import { ArrowRight, Mail, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { works } from '../data/works.js';
import { assetUrl } from '../utils/asset.js';

const entries = [
  ['图片作品', '/images', 'AIGC 图像、人物、场景与概念视觉'],
  ['海报作品', '/posters', '商业海报、产品广告与文旅传播'],
  ['视频作品', '/videos', 'AI 短片、漫剧、Vlog 与封面包装'],
  ['联系我', '/contact', '项目合作、岗位机会与作品沟通'],
];

function workRoute(item) {
  if (item?.category === 'AI海报') return '/posters';
  if (item?.category === '视频作品') return '/videos';
  return '/images';
}

export default function Home() {
  const heroWorks = [
    ...works.filter((item) => item.category === 'AI海报').slice(0, 2),
    ...works.filter((item) => item.category === '图片作品').slice(0, 2),
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWork = heroWorks[activeIndex] || heroWorks[0];
  const video = works.find((item) => item.category === '视频作品');

  return (
    <>
      <section className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 flex max-w-5xl items-center justify-center gap-5">
          <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-white/5 md:block" />
          <div className="text-center">
            <p className="text-3xl font-semibold uppercase tracking-[0.16em] text-white sm:text-4xl">AIGC Portfolio</p>
            <p className="mt-2 text-xs tracking-[0.52em] text-zinc-400">AI 赋能创意 · 无限想象</p>
          </div>
          <span className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-white/25 to-white/5 md:block" />
        </div>

        <div className="grid min-h-[680px] gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="relative z-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.36em] text-zinc-500">01 / Home</p>
            <h1 className="max-w-3xl text-[clamp(3rem,5vw,5rem)] font-semibold leading-[1.05] text-white">
              <span className="block whitespace-nowrap">AIGC 创造未来</span>
              <span className="mt-4 block text-[clamp(1.55rem,2.8vw,2.9rem)] font-normal text-zinc-300">想象无界 · 创意无限</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
              面向商业展示与个人求职的 AIGC 作品集，覆盖 AI 图像生成、海报设计、人物场景设定、短视频封面与分镜叙事。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/images" className="primary-button inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition">
                探索作品 <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="tech-button inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition">
                联系我 <Mail size={18} />
              </Link>
            </div>

          </div>

          <div className="showcase-stage relative min-h-[560px] overflow-hidden rounded-[12px] border border-white/18 bg-[#030609]/70 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
            {activeWork && (
              <img
                key={activeWork.id}
                src={assetUrl(activeWork.image)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.18] blur-[1px] transition-opacity duration-500"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(230,240,255,0.18),transparent_38%),linear-gradient(180deg,rgba(3,6,9,0.5),rgba(3,6,9,0.92)_80%)]" />
            <div className="absolute inset-x-5 top-5 z-20 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              <span>AIGC Portal</span>
              <span>Visual System</span>
            </div>
            <div className="absolute inset-0 perspective-grid opacity-55" />
            <div className="absolute left-1/2 top-[39%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 shadow-[0_0_90px_rgba(230,240,255,0.28),inset_0_0_54px_rgba(255,255,255,0.08)]" />
            <div className="absolute left-1/2 top-[39%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/24" />
            <div className="absolute left-1/2 top-[39%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/12 bg-black/30">
              {activeWork && <img src={assetUrl(activeWork.image)} alt={activeWork.title} className="h-full w-full object-cover opacity-80" />}
            </div>
            <div className="absolute bottom-36 left-1/2 h-28 w-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-800 shadow-[0_0_42px_rgba(255,255,255,0.32)]" />
            <div className="absolute bottom-32 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-white/25 blur-md" />

            {activeWork && (
              <div className="absolute left-6 right-6 top-14 z-20 flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Selected Work</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{activeWork.title}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">{activeWork.description}</p>
                </div>
                <Link to={workRoute(activeWork)} className="tech-button hidden shrink-0 items-center gap-2 px-4 py-2 text-xs text-zinc-200 transition sm:inline-flex">
                  查看作品 <ArrowRight size={14} />
                </Link>
              </div>
            )}

            <div className="absolute bottom-5 left-5 right-5 z-20 grid grid-cols-4 gap-3">
              {heroWorks.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`group relative aspect-[4/3] overflow-hidden rounded-[8px] border bg-white/[0.05] text-left transition duration-300 ${
                      isActive
                        ? 'border-white/70 shadow-[0_0_28px_rgba(255,255,255,0.18)]'
                        : 'border-white/18 opacity-78 hover:border-white/45 hover:opacity-100'
                    }`}
                    aria-label={`预览 ${item.title}`}
                    aria-pressed={isActive}
                  >
                    <img src={assetUrl(item.image)} alt="" className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 truncate text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100 sm:opacity-100">
                      {item.title}
                    </span>
                    {isActive && <span className="absolute inset-x-2 top-2 h-0.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.7)]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Featured Works</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">精选作品</h2>
          </div>
          <Link to="/images" className="hidden items-center gap-2 text-sm text-zinc-400 transition hover:text-white sm:inline-flex">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Link to="/videos" className="tech-card work-hover group relative min-h-[320px] overflow-hidden">
            {video && <img src={assetUrl(video.image)} alt={video.title} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105" />}
            <span className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/35 to-transparent" />
            <span className="absolute left-8 top-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/45 backdrop-blur">
              <Play size={25} fill="currentColor" />
            </span>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Video Highlight</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{video?.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-300">{video?.description}</p>
            </div>
          </Link>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {entries.map(([title, path, text]) => (
              <Link key={title} to={path} className="tech-card work-hover flex min-h-32 flex-col justify-between p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <ArrowRight size={18} />
                </div>
                <p className="mt-5 text-sm leading-6 text-zinc-400">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
