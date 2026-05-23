import React from 'react';

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-9">
      {eyebrow && <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>}
      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:text-right">{description}</p>}
      </div>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-white/35 via-white/10 to-transparent" />
    </div>
  );
}
