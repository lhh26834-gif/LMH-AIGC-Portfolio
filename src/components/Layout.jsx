import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import TechBackground from './TechBackground.jsx';

const navItems = [
  { label: '首页', path: '/' },
  { label: '个人简介', path: '/about' },
  { label: '图片作品', path: '/images' },
  { label: '海报作品', path: '/posters' },
  { label: '视频作品', path: '/videos' },
  { label: '联系我', path: '/contact' },
];

const footerItems = ['AI 创意驱动', '视觉叙事', '技术与艺术结合', '持续进化'];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030609] text-white">
      <TechBackground />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030609]/75 backdrop-blur-2xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-8 w-8 place-items-center rounded-[8px] border border-white/15 bg-white/[0.05] shadow-[0_0_30px_rgba(210,225,245,0.08)]">
              <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
            </span>
            <span className="leading-none">
              <span className="block text-sm font-semibold tracking-[0.22em]">AIGC PORTFOLIO</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-zinc-500">Li Minhao</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-[7px] border px-3 py-1.5 text-sm transition ${
                    isActive
                      ? 'border-white/55 bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.14)]'
                      : 'border-transparent text-zinc-400 hover:border-white/18 hover:bg-white/[0.06] hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            aria-label="切换导航菜单"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[7px] border border-white/15 bg-white/[0.04] text-white transition hover:border-white/35 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open && (
          <div className="border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-2xl lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-[8px] border px-4 py-3 text-sm transition ${
                      isActive ? 'border-white/40 bg-white text-black' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:bg-white/[0.08] hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="page-shell">
        <Outlet />
      </main>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-8 text-sm text-zinc-500 sm:px-6 md:grid-cols-4 lg:px-8">
          {footerItems.map((item) => (
            <div key={item} className="border-l border-white/10 pl-5">
              <p className="font-medium text-zinc-300">{item}</p>
              <p className="mt-1 text-xs">探索 AIGC 的无限可能</p>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
