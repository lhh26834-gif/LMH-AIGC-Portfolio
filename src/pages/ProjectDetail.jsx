import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { assetUrl } from '../utils/asset.js';
import { useManagedWorks } from '../utils/adminStore.js';

const backLabel = '\u8fd4\u56de\u4f5c\u54c1';

export default function ProjectDetail() {
  const { id } = useParams();
  const works = useManagedWorks();
  const work = works.find((item) => item.id === id) ?? works[0];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <Link to="/works" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-cyan">
        <ArrowLeft size={17} />
        {backLabel}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-line bg-panel p-3 shadow-card backdrop-blur-xl">
          <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-black/30 sm:min-h-[460px]">
            <img
              src={assetUrl(work.image)}
              alt={work.title}
              className="max-h-[78vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>

        <aside className="rounded-2xl border border-line bg-panel p-6 shadow-card backdrop-blur-xl sm:p-8">
          <p className="mb-3 text-sm text-cyan">{work.category}</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{work.title}</h1>
          <p className="mt-5 text-base leading-8 text-muted">{work.description}</p>

          <div className="mt-7 border-t border-line pt-7">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-300">Project Detail</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{work.detail}</p>
          </div>

          <div className="mt-7 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(work.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {(work.tools || []).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-violet/35 bg-violet/10 px-3 py-1 text-xs text-gray-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
