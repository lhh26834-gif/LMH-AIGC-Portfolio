import React from 'react';

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${12 + ((index * 37) % 78)}%`,
  top: `${10 + ((index * 53) % 76)}%`,
  size: 2 + (index % 3),
  opacity: 0.22 + (index % 5) * 0.08,
}));

export default function HeroVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center">
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(216,231,248,0.24),transparent_58%)] blur-3xl" />
      <div className="absolute inset-[-2%] rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(220,235,255,0.16),transparent,rgba(255,255,255,0.08),transparent)] opacity-70" style={{ animation: 'orbit-spin 46s linear infinite' }} />
      <div className="absolute inset-[1%] rounded-full border border-white/12 shadow-[0_0_80px_rgba(190,210,230,0.12)]" style={{ animation: 'pulse-glow 5s ease-in-out infinite' }} />
      <div className="absolute inset-[8%] rounded-full border border-dashed border-slate-200/24" style={{ animation: 'orbit-spin 34s linear infinite' }} />
      <div className="absolute inset-[15%] rounded-full border border-white/18 shadow-[0_0_54px_rgba(210,225,245,0.18)]" style={{ animation: 'orbit-spin 24s linear infinite reverse' }} />
      <div className="absolute inset-[24%] rounded-full border border-slate-200/24 bg-white/[0.035] backdrop-blur-md" />
      <div className="absolute inset-[36%] rounded-full border border-white/20 bg-[#090a0d]/70 shadow-[inset_0_0_36px_rgba(255,255,255,0.06)]" />
      <div className="tech-grid absolute inset-[5%] opacity-55" />
      <div className="absolute h-[86%] w-px bg-gradient-to-b from-transparent via-white/38 to-transparent" />
      <div className="absolute h-px w-[86%] bg-gradient-to-r from-transparent via-white/38 to-transparent" />
      <div className="absolute h-[66%] w-[66%] rotate-45 border border-white/10" />
      <div className="absolute h-[52%] w-[52%] -rotate-12 border border-slate-200/10" />
      <div className="absolute left-[8%] top-[30%] h-px w-28 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <div className="absolute bottom-[26%] right-[6%] h-px w-36 bg-gradient-to-r from-transparent via-slate-200/35 to-transparent" />
      <div className="absolute left-[4%] top-[18%] hidden rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur sm:block">
        VISUAL CORE
      </div>
      <div className="absolute right-[2%] top-[34%] hidden rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur sm:block">
        PROMPT ENGINE
      </div>
      <div className="absolute bottom-[12%] left-[18%] hidden rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-400 backdrop-blur sm:block">
        IMAGE / POSTER / VIDEO
      </div>

      {particles.map((item) => (
        <span
          key={item.id}
          className="absolute rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]"
          style={{ left: item.left, top: item.top, width: item.size, height: item.size, opacity: item.opacity }}
        />
      ))}

      <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full border border-white/30 bg-black/55 text-center shadow-[0_0_70px_rgba(210,225,245,0.22)] backdrop-blur-xl sm:h-44 sm:w-44">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-zinc-400">AI CORE</p>
          <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">∞</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-zinc-500">AIGC System</p>
        </div>
      </div>
    </div>
  );
}
