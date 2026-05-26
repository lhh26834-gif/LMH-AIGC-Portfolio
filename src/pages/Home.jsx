import React from 'react';
import { ArrowRight, Box, Clapperboard, Download, Image, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { works } from '../data/works.js';
import { assetUrl } from '../utils/asset.js';

const findWork = (...ids) => ids.map((id) => works.find((item) => item.id === id)).find(Boolean);

const mainWork =
  findWork('graystone-model-poster', 'xicoco-product-visual', 'berrybutter-product-visual') ||
  works.find((item) => item.category === 'AI海报');

const sideWorks = [
  {
    label: '城市 / 文化海报',
    work: findWork('luxury-china-poster', 'retro-sanya-travel-poster', 'beijing-unfolded'),
    path: '/posters',
  },
  {
    label: '品牌 / 视觉延展',
    work: findWork('berrybutter-product-visual', 'xicoco-product-visual', 'muzi-egg-tart-brand'),
    path: '/posters',
  },
  {
    label: '视频 / 分镜脚本',
    work: findWork('pet-vlog-storyboard', 'headphone-tvc', 'rebirth-storyboard-1'),
    path: '/videos',
  },
].filter((item) => item.work);

const featuredCards = [
  {
    label: '商业海报',
    path: '/posters',
    icon: Image,
    work: findWork('graystone-model-poster', 'sf500-farm-model-poster', 'nike-future-sport-poster'),
  },
  {
    label: '品牌视觉',
    path: '/posters',
    icon: Box,
    work: findWork('berrybutter-product-visual', 'xicoco-product-visual', 'muzi-egg-tart-brand'),
  },
  {
    label: '视频分镜',
    path: '/videos',
    icon: Clapperboard,
    work: findWork('headphone-tvc', 'pet-vlog-storyboard', 'rebirth-storyboard-1'),
  },
  {
    label: '创意图像',
    path: '/images',
    icon: Sparkles,
    work: findWork('beijing-unfolded', 'shanghai-miniature-model', 'dark-throne-cosmic-ruins'),
  },
].filter((item) => item.work);

function getWorkImage(work) {
  return work?.poster || work?.image;
}

function WorkStageCard({ item, index }) {
  const image = getWorkImage(item.work);

  return (
    <Link
      to={item.path}
      className="home-side-card group relative grid grid-cols-[1fr_auto] items-center gap-4 rounded-[14px] border border-white/14 bg-white/[0.045] p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/36 hover:bg-white/[0.07]"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-[10px] bg-[#090a0d]">
        <img src={assetUrl(image)} alt={item.work.title} className="h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/5 to-transparent" />
      </span>
      <span className="max-w-[5.5rem] text-xs leading-5 text-zinc-300 transition group-hover:text-white">{item.label}</span>
    </Link>
  );
}

function FeaturedCard({ item }) {
  const Icon = item.icon;
  const image = getWorkImage(item.work);

  return (
    <Link
      to={item.path}
      className="group relative h-[190px] overflow-hidden rounded-[14px] border border-white/12 bg-[#090a0d] shadow-[0_18px_55px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-1 hover:border-white/32 sm:h-[210px]"
    >
      <img src={assetUrl(image)} alt={item.work.title} className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-500 group-hover:scale-105 group-hover:opacity-88" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-black/8" />
      <span className="absolute left-4 top-4 inline-flex items-center gap-2 text-xs font-medium text-zinc-200">
        <Icon size={15} />
        {item.label}
      </span>
      <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/16 bg-black/36 text-white backdrop-blur transition group-hover:border-white/42 group-hover:bg-white group-hover:text-black">
        <ArrowRight size={15} />
      </span>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-white">{item.work.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">{item.work.description}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(140,170,255,0.105),transparent_34%),radial-gradient(circle_at_42%_52%,rgba(75,230,255,0.07),transparent_30%),linear-gradient(180deg,#050505_0%,#07080d_48%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

        <div className="relative mx-auto grid min-h-[720px] w-full max-w-[1500px] gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:px-10 xl:px-16">
          <div className="relative z-20">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.38em] text-zinc-400">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.85)]" />
              AIGC Visual Designer
            </div>

            <h1 className="mt-8 max-w-[680px] text-[clamp(3.25rem,6.6vw,6.35rem)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              <span className="block">AIGC视觉设计师</span>
              <span className="mt-2 block">让作品更有说服力</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              聚焦 AI 商业海报、品牌视觉延展、视频分镜与创意图像生成，完成从创意构思、Prompt 设计、生成优化到作品包装展示的完整流程。
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/posters" className="primary-button inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition">
                查看商业海报 <ArrowRight size={17} />
              </Link>
              <Link to="/videos" className="tech-button inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition">
                查看视频分镜 <ArrowRight size={17} />
              </Link>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="tech-button inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition">
                下载简历 PDF <Download size={16} />
              </a>
            </div>
          </div>

          <div className="showcase-stage home-hero-stage relative z-10 min-h-[560px] lg:min-h-[640px]">
            <div className="absolute left-[6%] top-[5%] h-[92%] w-[88%] rounded-full border border-white/[0.075]" />
            <div className="absolute left-[14%] top-[14%] h-[72%] w-[72%] rounded-full border border-dashed border-cyan-200/[0.14]" />
            <div className="absolute left-[2%] top-[26%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.85)]" />
            <div className="absolute right-[7%] top-[34%] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_20px_rgba(196,181,253,0.75)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[42%] perspective-grid opacity-70" />

            {mainWork && (
              <Link
                to="/posters"
                className="group absolute left-0 top-1/2 z-20 w-[58%] max-w-[430px] -translate-y-1/2 overflow-hidden rounded-[20px] border border-white/18 bg-[#090a0d] p-2 shadow-[0_34px_110px_rgba(0,0,0,0.58),0_0_46px_rgba(130,210,230,0.14)] transition duration-500 hover:-translate-y-[52%] hover:border-white/34"
              >
                <span className="block overflow-hidden rounded-[15px]">
                  <img src={assetUrl(getWorkImage(mainWork))} alt={mainWork.title} className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </span>
                <span className="absolute inset-2 rounded-[15px] bg-gradient-to-t from-black/58 via-transparent to-transparent" />
                <span className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.24em] text-zinc-300">LMH AIGC Poster</span>
                <span className="absolute bottom-6 left-6 right-6">
                  <span className="block text-xs uppercase tracking-[0.26em] text-cyan-100/70">Main Work</span>
                  <span className="mt-2 block text-2xl font-semibold text-white">{mainWork.title}</span>
                </span>
              </Link>
            )}

            <div className="absolute bottom-[9%] left-[8%] z-10 h-6 w-[44%] rounded-full bg-cyan-200/45 blur-2xl" />
            <div className="absolute bottom-[12%] left-[7%] z-10 h-px w-[46%] bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent" />

            <div className="absolute right-0 top-1/2 z-30 grid w-[48%] -translate-y-1/2 gap-4 sm:gap-5">
              {sideWorks.map((item, index) => (
                <WorkStageCard key={item.label} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-4 pb-20 pt-12 sm:px-6 lg:px-10 xl:px-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-4 w-1 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.65)]" />
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">精选作品</h2>
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.6)]" />
          </div>
          <Link to="/images" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            查看全部作品 <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredCards.map((item) => (
            <FeaturedCard key={item.label} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
