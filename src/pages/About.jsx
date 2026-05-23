import React from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { assetUrl } from '../utils/asset.js';

const skills = ['Midjourney', 'Stable Diffusion', 'ComfyUI', 'Photoshop'];
const timeline = [
  ['2021', '专业毕业', '毕业于濮阳职业技术学院文秘（信息化应用）专业，具备文档整理和信息化应用基础。'],
  ['2021+', '设计执行', '从事平面设计及前端 UI 设计制作，参与 PC 端、移动端界面设计与页面制作。'],
  ['2022', '关注 AI', '开始关注 AI 软件与大模型发展，主动学习 AI 工具在内容和设计工作中的应用方式。'],
  ['2023+', 'AI 项目应用', '在文档撰写、应急救援预案整理、隐患整改通知单制作等场景中尝试使用 AI 提效。'],
];
const directions = ['AI 辅助设计', 'AIGC 内容创作', 'UI 视觉设计', '前端页面制作', '内容生产提效', '设计执行落地'];

export default function About() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="02 / About"
        title="个人简介"
        description="基于平面设计、UI 设计和基础前端经验，持续探索 AI 工具在视觉设计、内容创作和工作流程优化中的应用。"
      />

      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <aside className="relative overflow-hidden rounded-[12px] border border-white/10 bg-white/[0.025] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.42)]">
          <div className="relative overflow-hidden rounded-[10px] border border-white/12 bg-[#080b0f]">
            <img src={assetUrl('07_个人头像与简介/个人头像-AIGC.png')} alt="李民昊头像" className="aspect-[4/5] w-full object-cover object-top" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_30%,rgba(0,0,0,0.18)_72%),linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.78)_100%)]" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">AIGC Creator</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">李民昊</h2>
              <p className="mt-2 text-sm text-zinc-300">AIGC / UI Visual Design / Front-end Practice</p>
            </div>
          </div>
          <div className="relative mt-5 min-h-[300px] overflow-hidden">
            <div className="profile-grid-motion absolute inset-0 tech-grid opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(230,240,255,0.09),transparent_46%)]" />
            <div className="profile-orbit absolute left-1/2 top-16 h-48 w-48 -translate-x-1/2 rounded-full border border-white/18 shadow-[0_0_70px_rgba(220,235,255,0.08)]">
              <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
            </div>
            <div className="profile-orbit-reverse absolute left-1/2 top-24 h-28 w-28 -translate-x-1/2 rounded-full border border-dashed border-white/20">
              <span className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.6)]" />
            </div>
            <div className="profile-beam absolute left-1/2 top-36 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-white/65 to-transparent shadow-[0_0_22px_rgba(255,255,255,0.32)]" />
            <div className="profile-scan-line absolute bottom-8 left-8 h-px w-36 bg-gradient-to-r from-white/35 to-transparent" />
            <div className="profile-scan-line absolute bottom-8 right-8 h-px w-28 bg-gradient-to-l from-white/35 to-transparent" />
            <div className="absolute bottom-8 right-8 h-16 w-px bg-gradient-to-t from-white/28 to-transparent" />
            <div className="profile-node absolute left-10 top-10 h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
            <div className="profile-node profile-node-delay absolute right-16 top-28 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_14px_rgba(255,255,255,0.45)]" />
            <div className="profile-node profile-node-delay-long absolute bottom-20 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.6)]" />
          </div>
        </aside>

        <div className="space-y-6">
          <div className="tech-card p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Profile</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">关于我</h3>
            <div className="mt-5 space-y-4 text-sm leading-8 text-zinc-400 sm:text-base">
              <p>
                我叫李民昊，2021 年毕业于濮阳职业技术学院文秘（信息化应用）专业。毕业后曾从事平面设计及前端 UI 设计制作，参与过 PC 端、移动端界面设计与页面制作，具备一定的视觉审美能力、设计执行能力和基础前端实现经验。
              </p>
              <p>
                在后续项目工作中，我开始接触并主动学习 AI 工具。自 2022 年起关注 AI 软件与大模型的发展，2023 年在实际工作中尝试将 AI 应用于文档撰写、应急救援预案整理、隐患整改通知单制作等场景，逐步形成了使用 AI 提升内容生产效率、优化工作流程的意识。
              </p>
              <p>
                随着 AIGC、大模型及各类 AI 设计工具的发展，我认识到 AI 正在深度赋能设计、内容创作和前端实现等领域。结合自己早期的平面设计、UI 设计和基础前端经验，我希望将 AI 工具应用能力与视觉设计能力相结合，向 AI 辅助设计、AIGC 内容创作、UI 视觉设计及相关岗位方向发展。
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {skills.map((item) => (
                <span key={item} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-xs text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="tech-card p-5 sm:p-6">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-zinc-500">Direction</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {directions.map((item) => (
                <div key={item} className="rounded-[8px] border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-zinc-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="tech-card p-5 sm:p-6">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-zinc-500">Experience</p>
            <div className="grid gap-4 md:grid-cols-4">
              {timeline.map(([year, title, text]) => (
                <div key={year} className="relative border-t border-white/18 pt-5">
                  <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
                  <p className="text-2xl font-semibold text-white">{year}</p>
                  <h4 className="mt-2 text-sm font-semibold text-zinc-200">{title}</h4>
                  <p className="mt-2 text-xs leading-6 text-zinc-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
