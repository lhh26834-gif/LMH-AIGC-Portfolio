import React from 'react';
import { Clock, ExternalLink, Play, Tag } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import VideoCard from '../components/VideoCard.jsx';
import { videoWorks } from '../data/projects.js';
import { assetUrl } from '../utils/asset.js';

const durationById = {
  'headphone-tvc': '00:15',
  'pet-vlog-video': '02:45',
  'perfume-tvc': 'TVC',
  'motorcycle-tvc': 'TVC',
  'thriller-video': '01:32',
  'resume-video': '02:10',
  'rebirth-video': '02:58',
};

const featuredVideo = videoWorks.find((item) => item.id === 'pet-vlog-video') || videoWorks[0];
const otherVideos = videoWorks.filter((item) => item.id !== featuredVideo?.id);

export default function VideoWorks() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="05 / Video Works"
        title="视频作品"
        description="以主推项目和视频卡片展示 AI 短片、Vlog、漫剧和求职视频包装能力。"
      />

      {featuredVideo && (
        <article className="tech-card corner-frame mb-10 grid gap-6 overflow-hidden p-4 lg:grid-cols-[1.15fr_0.85fr] lg:p-5">
          <a href={featuredVideo.video ? assetUrl(featuredVideo.video) : featuredVideo.externalUrl} target="_blank" rel="noreferrer" className="group relative block aspect-video overflow-hidden rounded-[10px] bg-[#0b0b0f]">
            <img src={assetUrl(featuredVideo.poster)} alt={featuredVideo.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent" />
            <span className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white shadow-[0_0_44px_rgba(220,235,255,0.22)] backdrop-blur-md">
              <Play size={30} fill="currentColor" />
            </span>
            <span className="absolute bottom-4 right-4 border border-white/15 bg-black/65 px-3 py-1 text-xs text-zinc-200 backdrop-blur">{durationById[featuredVideo.id] || '01:00'}</span>
          </a>

          <div className="flex flex-col justify-center p-2 sm:p-4 lg:p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Featured Video</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{featuredVideo.title}</h2>
            <p className="mt-5 text-base leading-8 text-zinc-400">{featuredVideo.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[featuredVideo.type, 'AIGC', ...(featuredVideo.tags?.includes('非商业练习项目') ? ['非商业练习项目'] : ['视觉包装'])].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300">
                  <Tag size={13} />
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300">
                <Clock size={13} />
                {durationById[featuredVideo.id] || '01:00'}
              </span>
            </div>
            <a href={featuredVideo.video ? assetUrl(featuredVideo.video) : featuredVideo.externalUrl} target="_blank" rel="noreferrer" className="primary-button mt-8 inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-semibold transition">
              {featuredVideo.video ? '播放主推视频' : '打开主推视频'} <ExternalLink size={16} />
            </a>
          </div>
        </article>
      )}

      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">More Videos</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">更多视频项目</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {otherVideos.map((item, index) => (
          <VideoCard key={item.id} item={item} duration={durationById[item.id] || '01:00'} />
        ))}
      </div>
    </section>
  );
}
