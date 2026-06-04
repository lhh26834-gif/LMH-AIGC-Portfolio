import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { assetUrl } from '../utils/asset.js';

export default function ImageLightbox({ items, activeIndex, onClose, onMove }) {
  const item = activeIndex >= 0 ? items[activeIndex] : null;

  useEffect(() => {
    if (!item) return undefined;
    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onMove(-1);
      if (event.key === 'ArrowRight') onMove(1);
    }

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose, onMove]);

  if (!item) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-black/[0.94] px-3 py-5 backdrop-blur-[12px] sm:px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} 大图预览`}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/72 text-white shadow-[0_0_28px_rgba(255,255,255,0.12)] backdrop-blur transition hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.24)] sm:right-6 sm:top-6"
        aria-label="关闭预览"
      >
        <X size={24} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMove(-1);
        }}
        className="fixed left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/26 bg-black/68 text-white shadow-[0_0_24px_rgba(255,255,255,0.1)] backdrop-blur transition hover:border-white/65 hover:bg-white/18 sm:left-7 sm:h-[52px] sm:w-[52px]"
        aria-label="上一张"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMove(1);
        }}
        className="fixed right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/26 bg-black/68 text-white shadow-[0_0_24px_rgba(255,255,255,0.1)] backdrop-blur transition hover:border-white/65 hover:bg-white/18 sm:right-7 sm:h-[52px] sm:w-[52px]"
        aria-label="下一张"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex max-h-[94vh] w-full max-w-[94vw] flex-col items-center justify-center" onClick={(event) => event.stopPropagation()}>
        <div className="box-border inline-flex max-h-[78vh] max-w-[92vw] items-center justify-center rounded-[18px] border border-white/22 bg-[#050609] p-4 shadow-[0_0_90px_rgba(190,210,230,0.2)] sm:p-5">
          <img
            src={assetUrl(item.image)}
            alt={item.title}
            className="block max-h-[calc(78vh-2rem)] max-w-[calc(92vw-2rem)] rounded-[10px] object-contain sm:max-h-[calc(78vh-2.5rem)] sm:max-w-[calc(92vw-2.5rem)]"
          />
        </div>
        <div className="mt-4 w-full max-w-3xl rounded-[14px] border border-white/10 bg-black/42 px-5 py-4 text-center backdrop-blur sm:mt-5">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{item.category}</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-2xl">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
