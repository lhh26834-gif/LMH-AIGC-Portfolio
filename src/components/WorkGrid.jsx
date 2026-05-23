import React from 'react';
import WorkCard from './WorkCard.jsx';

export default function WorkGrid({ items }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
}
