import React from 'react';

export default function TechBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(210,230,255,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(190,210,230,0.08),transparent_24%),linear-gradient(180deg,#050505_0%,#0b0b0f_52%,#050505_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute -left-32 top-44 h-96 w-96 rounded-full bg-white/[0.045] blur-3xl" />
      <div className="absolute -right-28 bottom-16 h-[30rem] w-[30rem] rounded-full bg-slate-300/[0.055] blur-3xl" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:7px_7px]" />
      <div className="absolute left-[8%] top-[18%] h-px w-72 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute right-[7%] top-[38%] h-px w-56 bg-gradient-to-r from-transparent via-slate-200/25 to-transparent" />
      <div className="absolute bottom-[16%] left-[20%] h-px w-80 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -bottom-40 -left-28 h-80 w-80 rounded-full border border-white/10 opacity-35" />
      <div className="absolute -bottom-48 -right-24 h-96 w-96 rounded-full border border-white/10 opacity-30" />
      <div className="absolute bottom-0 left-0 h-40 w-80 bg-[radial-gradient(ellipse_at_bottom,rgba(210,225,245,0.08),transparent_68%)]" />
      <div className="absolute bottom-0 right-0 h-44 w-96 bg-[radial-gradient(ellipse_at_bottom,rgba(210,225,245,0.075),transparent_68%)]" />
    </div>
  );
}
