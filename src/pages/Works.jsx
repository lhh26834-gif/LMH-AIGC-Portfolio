import React from 'react';
import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import WorkGrid from '../components/WorkGrid.jsx';
import { getManagedCategories, useManagedWorks } from '../utils/adminStore.js';

const allLabel = '\u5168\u90e8';
const defaultTitle = '\u4f5c\u54c1\u5c55\u793a';
const description =
  '\u6309\u80fd\u529b\u65b9\u5411\u6574\u7406\u4f5c\u54c1\uff1aAI\u77ed\u5267\u5206\u955c\u3001\u4eba\u7269\u8bbe\u5b9a\u3001\u573a\u666f\u8bbe\u5b9a\u3001AI\u6d77\u62a5\u3001\u56fe\u7247\u4f5c\u54c1\u548c\u89c6\u9891\u4f5c\u54c1\u3002';

export default function Works({ title = defaultTitle }) {
  const works = useManagedWorks();
  const [active, setActive] = useState(allLabel);
  const filters = [allLabel, ...getManagedCategories(works)];
  const filteredWorks = useMemo(
    () => (active === allLabel ? works : works.filter((work) => work.category === active)),
    [active],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <SectionHeader eyebrow="Works" title={title} description={description} />

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              active === filter
                ? 'border-cyan bg-cyan text-ink'
                : 'border-line bg-white/5 text-muted hover:border-violet/70 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <WorkGrid items={filteredWorks} />
    </section>
  );
}
