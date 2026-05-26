import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import TechBackground from './TechBackground.jsx';

const navItems = [
  { label: '首页', path: '/', matches: ['/'] },
  { label: '作品', path: '/images', matches: ['/images', '/posters', '/videos'] },
  { label: '关于我', path: '/about', matches: ['/about'] },
  { label: '联系', path: '/contact', matches: ['/contact'] },
];

const footerItems = ['AI 创意驱动', '视觉叙事', '技术与艺术结合', '持续进化'];

function isNavActive(pathname, item) {
  if (item.path === '/') return pathname === '/';
  return item.matches.some((path) => pathname.startsWith(path));
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030609] text-white">
      <TechBackground />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/78 backdrop-blur-2xl">
        <nav className="mx-auto flex h-[72px] w-full max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16">
          <NavLink to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">LMH / 李民昊</span>
          </NavLink>

          <div className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative py-2 text-sm font-medium transition ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)] transition-all ${
                      active ? 'w-6 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              className="hidden items-center gap-2 rounded-[8px] border border-cyan-200/45 bg-white/[0.035] px-4 py-2 text-sm font-medium text-white shadow-[0_0_22px_rgba(120,220,255,0.08),inset_0_0_0_1px_rgba(196,181,253,0.12)] transition hover:border-white/55 hover:bg-white hover:text-black sm:inline-flex"
            >
              下载简历 <Download size={15} />
            </a>

            <button
              type="button"
              aria-label="切换导航菜单"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/15 bg-white/[0.04] text-white transition hover:border-white/35 lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-white/10 bg-black/92 px-4 py-3 backdrop-blur-2xl lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => {
                const active = isNavActive(pathname, item);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`rounded-[8px] border px-4 py-3 text-sm transition ${
                      active ? 'border-white/40 bg-white text-black' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-[8px] border border-white/18 bg-white/[0.05] px-4 py-3 text-sm text-white transition hover:bg-white hover:text-black"
              >
                下载简历 <Download size={15} />
              </a>
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
              <p className="mt-1 text-xs">探索 AIGC 的更多可能</p>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
