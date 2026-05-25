import React from 'react';
import { ArrowRight, BriefcaseBusiness, Mail, MapPin, Sparkles, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset.js';

const coreAbilities = [
  'AIGC视觉设计',
  'AI商业海报',
  'Prompt设计',
  'AI视频分镜',
  '产品广告视觉',
  '人物与场景设定',
  '短视频封面设计',
  'UI界面设计',
  '作品集网站搭建',
];

const tools = ['ChatGPT', '即梦', '可灵', 'Midjourney', 'Stable Diffusion', 'ComfyUI', 'Photoshop', '剪映', 'Adobe Illustrator', 'Word', 'Excel'];

const projects = [
  {
    title: '头戴式无线降噪耳机 15 秒 TVC 广告分镜设计',
    type: '产品广告 / AI视频分镜 / 非商业练习项目',
    description:
      '基于单张黑色头戴式无线降噪耳机产品图，完成 15 秒概念广告分镜设计。项目以“无线降噪耳机｜沉浸之声｜即刻入场”为核心方向，通过黑色科技感、冷光轮廓、产品悬浮、微距细节、通勤降噪场景和声场粒子视觉，表现产品的降噪感、沉浸感与高级质感。',
    responsibility: '产品卖点提炼、广告创意构思、6个镜头分镜拆解、AI视频生成提示词、字幕音效规划、剪映成片练习。',
    highlight: '完整模拟了产品广告从产品图到 15 秒 TVC 分镜方案的创作流程，体现广告思维、镜头语言、AI视频提示词编写和后期剪辑节奏规划能力。',
    note: '个人非商业练习项目，不涉及真实品牌商业合作。',
  },
  {
    title: 'AIGC个人作品集网站设计与搭建',
    type: '个人作品集 / AIGC视觉展示 / 求职作品整理',
    description: '围绕 AIGC视觉设计求职方向，搭建个人作品集网站，用于集中展示 AI海报、产品广告、人物设定、短视频分镜、UI界面等作品内容。',
    responsibility: '作品分类整理、首页视觉规划、项目介绍文案、页面展示逻辑、视觉风格优化。',
    highlight: '通过网站集中展示个人 AIGC 创作能力，使面试官可以快速了解我的视觉风格、项目类型、工具能力和执行能力。',
  },
  {
    title: 'AI商业海报与创意视觉设计',
    type: 'AI海报 / 商业视觉 / 主题创意设计',
    description: '围绕不同主题进行 AI视觉创作，包括电影感海报、节日主题海报、城市文旅海报、人物写真海报、概念视觉海报等方向。',
    responsibility: '主题拆解、Prompt编写、画面风格控制、生成结果筛选、后期优化和作品集展示整理。',
    highlight: '具备从创意主题到视觉成图的完整执行能力，能够快速产出适合作品集展示、社交平台发布和广告视觉参考的 AI海报内容。',
  },
  {
    title: 'AI短视频分镜与生成提示词设计',
    type: 'AI短视频 / 分镜脚本 / 视频提示词 / 封面图',
    description: '围绕 AI短剧、剧情短片、产品广告片和短视频内容，完成从创意构思、故事脚本、人物设定、场景设定到镜头分解和视频提示词设计的完整流程。',
    responsibility: '镜头节奏拆解、人物动作设计、场景氛围描述、景别变化、视频生成提示词、字幕音效和转场建议。',
    highlight: '能够将文字创意转化为可直接执行的 AI视频生成方案，具备 AI视频内容前期策划、镜头拆解和分镜执行能力。',
  },
];

const basicInfo = [
  { icon: UserRound, label: '姓名', value: '李民昊' },
  { icon: MapPin, label: '所在城市', value: '北京' },
  { icon: BriefcaseBusiness, label: '求职方向', value: 'AIGC视觉设计师 / AI内容创作者 / AI创意设计' },
  { icon: Mail, label: '邮箱', value: 'l15515479790@163.com' },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">{eyebrow}</p>
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        {description && <p className="max-w-2xl text-sm leading-7 text-zinc-500 md:text-right">{description}</p>}
      </div>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-white/35 via-white/10 to-transparent" />
    </div>
  );
}

export default function About() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <aside className="relative overflow-hidden rounded-[12px] border border-white/10 bg-white/[0.025] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.42)]">
          <div className="relative overflow-hidden rounded-[10px] border border-white/12 bg-[#080b0f]">
            <img src={assetUrl('07_个人头像与简介/个人头像-AIGC.png')} alt="李民昊头像" className="aspect-[4/5] w-full object-cover object-top" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_30%,rgba(0,0,0,0.18)_72%),linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.82)_100%)]" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">About / Resume</p>
              <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">李民昊</h1>
              <p className="mt-2 text-sm text-zinc-300">AIGC视觉设计师 / AI内容创作者 / AI创意设计方向</p>
            </div>
          </div>

          <div className="relative mt-5 min-h-[260px] overflow-hidden">
            <div className="profile-grid-motion absolute inset-0 tech-grid opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(230,240,255,0.09),transparent_46%)]" />
            <div className="profile-orbit absolute left-1/2 top-12 h-44 w-44 -translate-x-1/2 rounded-full border border-white/18 shadow-[0_0_70px_rgba(220,235,255,0.08)]">
              <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
            </div>
            <div className="profile-orbit-reverse absolute left-1/2 top-20 h-28 w-28 -translate-x-1/2 rounded-full border border-dashed border-white/20">
              <span className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.6)]" />
            </div>
            <div className="profile-beam absolute left-1/2 top-32 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-white/65 to-transparent shadow-[0_0_22px_rgba(255,255,255,0.32)]" />
            <div className="profile-scan-line absolute bottom-8 left-8 h-px w-36 bg-gradient-to-r from-white/35 to-transparent" />
            <div className="profile-scan-line absolute bottom-8 right-8 h-px w-28 bg-gradient-to-l from-white/35 to-transparent" />
            <div className="profile-node absolute left-10 top-10 h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
            <div className="profile-node profile-node-delay absolute right-16 top-28 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_14px_rgba(255,255,255,0.45)]" />
          </div>
        </aside>

        <div className="tech-card relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/10 opacity-50" />
          <div className="absolute right-20 top-20 h-px w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="text-xs uppercase tracking-[0.36em] text-zinc-500">02 / Personal Position</p>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            AIGC视觉设计师 / AI内容创作者 / AI创意设计方向
          </h2>
          <div className="mt-7 space-y-5 text-sm leading-8 text-zinc-400 sm:text-base">
            <p>
              我是李民昊，求职方向为 AIGC视觉设计师、AI内容创作者、AI创意设计相关岗位。具备平面设计、前端 UI 设计制作及 AI 工具应用经验，熟悉 ChatGPT、即梦、可灵、Midjourney、Stable Diffusion、ComfyUI 等工具，能够围绕项目需求完成创意构思、视觉风格拆解、Prompt 编写、AI 图像生成、视频分镜设计、后期整理与作品展示。
            </p>
            <p>
              我目前的创作方向主要包括 AI商业海报、产品广告视觉、人物与场景设定、AI短视频分镜、TVC概念广告、UI界面样机及个人作品集网站设计。相比单纯生成图片，我更关注从需求到结果的完整流程：创意构思 → 视觉拆解 → Prompt设计 → 生成优化 → 分镜规划 → 后期整理 → 作品展示。
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/posters" className="primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition">
              查看作品 <ArrowRight size={17} />
            </Link>
            <Link to="/contact" className="tech-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition">
              联系我 <Mail size={17} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <SectionTitle eyebrow="Core Ability" title="核心能力" description="围绕 AIGC 视觉创作、视频分镜、广告视觉与作品集呈现形成的复合能力。" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreAbilities.map((item) => (
            <div key={item} className="group rounded-[8px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/35 hover:bg-white/[0.07]">
              <Sparkles size={18} className="mb-4 text-zinc-300 transition group-hover:text-white" />
              <p className="text-base font-medium text-zinc-200">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <SectionTitle eyebrow="Featured Experience" title="代表项目 / Featured Experience" description="以项目卡片呈现创意路径、负责内容和可交付能力。" />
        <div className="grid gap-5">
          {projects.map((project, index) => (
            <article key={project.title} className="tech-card corner-frame overflow-hidden p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Project 0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 inline-flex rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300">{project.type}</p>
                </div>
                {project.note && <p className="w-fit rounded-[8px] border border-white/12 bg-black/30 px-3 py-2 text-xs leading-5 text-zinc-400">{project.note}</p>}
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
                <div className="rounded-[8px] border border-white/10 bg-black/20 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-zinc-500">Description</p>
                  <p className="text-sm leading-7 text-zinc-400">{project.description}</p>
                </div>
                <div className="rounded-[8px] border border-white/10 bg-black/20 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-zinc-500">负责内容</p>
                  <p className="text-sm leading-7 text-zinc-400">{project.responsibility}</p>
                </div>
                <div className="rounded-[8px] border border-white/10 bg-black/20 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-zinc-500">项目亮点</p>
                  <p className="text-sm leading-7 text-zinc-400">{project.highlight}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="tech-card p-5 sm:p-6">
          <SectionTitle eyebrow="Tools" title="工具能力" />
          <div className="flex flex-wrap gap-2.5">
            {tools.map((item) => (
              <span key={item} className="rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 text-sm text-zinc-300">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="tech-card p-5 sm:p-6">
          <SectionTitle eyebrow="Basic Info" title="基础信息" />
          <div className="grid gap-3">
            {basicInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-white/12 bg-white/[0.04] text-zinc-200">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tech-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Next</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">查看作品或联系我</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/images" className="primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition">
            查看作品 <ArrowRight size={17} />
          </Link>
          <Link to="/contact" className="tech-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition">
            联系我 <Mail size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
