import React from 'react';

export default function StatCard({ value, label }) {
  return (
    <div className="tech-card work-hover relative overflow-hidden p-5">
      <div className="absolute right-0 top-0 h-px w-24 bg-gradient-to-r from-transparent to-white/45" />
      <div className="absolute bottom-0 left-0 h-px w-16 bg-gradient-to-r from-white/30 to-transparent" />
      <p className="text-3xl font-semibold text-white sm:text-4xl">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    </div>
  );
}
