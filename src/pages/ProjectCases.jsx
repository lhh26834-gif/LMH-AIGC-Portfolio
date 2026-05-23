import React from 'react';
import { Film, ImageIcon, Layers, PlayCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { projectAssets, projectCases, videoWorks } from '../data/projects.js';
import { assetUrl } from '../utils/asset.js';

const labels = {
  objective: '项目目标',
  process: '制作流程',
  style: '视觉风格',
  tools: '使用工具',
  abilities: '能力体现',
  result: '最终成果',
  timeline: '项目流程',
};

function Pill({ children }) {
  return <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-gray-300">{children}</span>;
}

function ProjectCaseCard({ item }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-panel shadow-card backdrop-blur-xl">
      <div className="aspect-[16/10] overflow-hidden bg-black/40">
        <img src={assetUrl(item.cover)} alt={item.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="p-5 sm:p-6">
        <p className="mb-3 inline-flex items-center gap-2 text-xs text-cyan">
          <Layers size={15} />
          {item.category}
        </p>
        <h2 className="text-xl font-semibold text-white">{item.title}</h2>

        <div className="mt-5 grid gap-5 text-sm leading-7 text-muted">
          <div>
            <h3 className="mb-2 font-semibold text-white">{labels.objective}</h3>
            <p>{item.objective}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-white">{labels.process}</h3>
            <p>{item.process.join(' → ')}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-white">{labels.style}</h3>
            <p>{item.style}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-white">{labels.result}</h3>
            <p>{item.result}</p>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="mb-3 text-sm font-semibold text-white">{labels.abilities}</h3>
          <div className="flex flex-wrap gap-2">{item.abilities.map((ability) => <Pill key={ability}>{ability}</Pill>)}</div>
        </div>

        <div className="mt-5">
          <h3 className="mb-3 text-sm font-semibold text-white">{labels.tools}</h3>
          <div className="flex flex-wrap gap-2">{item.tools.map((tool) => <Pill key={tool}>{tool}</Pill>)}</div>
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <h3 className="mb-3 text-sm font-semibold text-white">{labels.timeline}</h3>
          <div className="flex flex-wrap gap-2">
            {item.timeline.map((step, index) => (
              <span key={step} className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan">
                {index + 1}. {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function VideoCard({ item }) {
  const [isPlayingEmbed, setIsPlayingEmbed] = React.useState(false);
  const [embedNonce, setEmbedNonce] = React.useState(0);
  const embedPlayUrl = `${item.embedUrl}${item.embedUrl.includes('?') ? '&' : '?'}autoplay=1&t=0&start=0&fresh=${embedNonce}`;

  return (
    <article className="rounded-2xl border border-line bg-panel p-3 shadow-card backdrop-blur-xl">
      <div className="overflow-hidden rounded-xl bg-black">
        {isPlayingEmbed ? (
          <iframe
            key={embedPlayUrl}
            className="aspect-video w-full"
            src={embedPlayUrl}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setEmbedNonce(Date.now());
              setIsPlayingEmbed(true);
            }}
            className="group block aspect-video w-full overflow-hidden bg-black text-left"
            aria-label={`播放 ${item.title}`}
          >
            <img src={assetUrl(item.poster)} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" />
          </button>
        )}
      </div>
      <div className="px-2 py-4">
        <p className="mb-2 inline-flex items-center gap-2 text-xs text-cyan">
          <PlayCircle size={15} />
          {item.type}
        </p>
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-gray-200 transition hover:border-cyan/60 hover:text-cyan"
        >
          打开视频
        </a>
      </div>
    </article>
  );
}

function ImageAssetCard({ item }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-panel shadow-card backdrop-blur-xl">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-black/35">
        <img src={assetUrl(item.image)} alt={item.title} className="h-full w-full object-contain" loading="lazy" />
      </div>
      <div className="p-4">
        <p className="mb-2 text-xs text-cyan">{item.category}</p>
        <h3 className="text-base font-semibold leading-6 text-white">{item.title}</h3>
      </div>
    </article>
  );
}

function AssetSection({ title, items }) {
  return (
    <div className="mt-14 border-t border-line pt-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan/10 text-cyan">
          <ImageIcon size={19} />
        </span>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ImageAssetCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectCases() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <SectionHeader
        eyebrow="Cases"
        title="项目案例"
        description="按完整项目能力展示：目标、流程、风格、工具、能力体现和最终成果，便于面试沟通。"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {projectCases.map((item) => (
          <ProjectCaseCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-cyan">
            <Film size={17} />
            Video
          </p>
          <h2 className="text-3xl font-semibold text-white">视频作品</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            展示 AI 短视频创作、镜头节奏、剪辑包装和内容成片能力。点击封面在当前页面播放，按钮可跳转 B 站。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {videoWorks.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <AssetSection title="分镜图片" items={projectAssets.storyboards} />
      <AssetSection title="人物设定" items={projectAssets.characters} />
      <AssetSection title="场景设定" items={projectAssets.scenes} />
      <AssetSection title="视频封面" items={projectAssets.covers} />
    </section>
  );
}
