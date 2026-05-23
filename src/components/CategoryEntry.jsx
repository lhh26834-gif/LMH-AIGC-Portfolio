import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset.js';

export default function CategoryEntry({ item }) {
  return (
    <Link to={item.path} className="tech-card work-hover group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={assetUrl(item.work.image)} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
        <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition group-hover:border-white/35">
          <ArrowRight size={16} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
      </div>
    </Link>
  );
}
