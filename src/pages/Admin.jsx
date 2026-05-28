import React, { useMemo, useRef, useState } from 'react';
import { Download, Eye, Lock, Plus, RotateCcw, Save, Search, Trash2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import { assetUrl } from '../utils/asset.js';
import { getManagedCategories, loadManagedWorks, resetManagedWorks, saveManagedWorks } from '../utils/adminStore.js';

const emptyWork = {
  id: '',
  title: '',
  category: '图片作品',
  image: '',
  poster: '',
  video: '',
  externalUrl: '',
  description: '',
  tags: [],
  featured: false,
};

const password = 'LMH2026';
const sessionKey = 'lmh_aigc_admin_session';

function createId(title) {
  const base = String(title || 'new-work')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${base || 'new-work'}-${Date.now().toString(36)}`;
}

function workToForm(work) {
  return {
    ...emptyWork,
    ...work,
    tagsText: (work.tags || []).join('，'),
  };
}

function formToWork(form) {
  const next = {
    ...form,
    id: form.id || createId(form.title),
    tags: String(form.tagsText || '')
      .split(/[,，]/)
      .map((tag) => tag.trim())
      .filter(Boolean),
    featured: Boolean(form.featured),
  };

  delete next.tagsText;

  Object.keys(next).forEach((key) => {
    if (next[key] === '') delete next[key];
  });

  return next;
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => window.localStorage.getItem(sessionKey) === '1');
  const [loginValue, setLoginValue] = useState('');
  const [loginError, setLoginError] = useState('');
  const [works, setWorks] = useState(() => loadManagedWorks());
  const [selectedId, setSelectedId] = useState(() => loadManagedWorks()[0]?.id || '');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const fileInputRef = useRef(null);

  const selectedWork = works.find((work) => work.id === selectedId) || works[0] || emptyWork;
  const [form, setForm] = useState(() => workToForm(selectedWork));

  const categories = useMemo(() => getManagedCategories(works), [works]);
  const filteredWorks = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return works;

    return works.filter((work) =>
      [work.title, work.category, work.description, work.id].some((value) => String(value || '').toLowerCase().includes(keyword)),
    );
  }, [query, works]);

  const selectWork = (work) => {
    setSelectedId(work.id);
    setForm(workToForm(work));
    setStatus('');
  };

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const persist = (nextWorks, message) => {
    setWorks(nextWorks);
    saveManagedWorks(nextWorks);
    setStatus(message);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (loginValue === password) {
      window.localStorage.setItem(sessionKey, '1');
      setAuthed(true);
      setLoginError('');
      return;
    }

    setLoginError('密码不正确');
  };

  const handleNew = () => {
    const draft = workToForm({ ...emptyWork, id: createId('new-work'), title: '新作品' });
    setSelectedId(draft.id);
    setForm(draft);
    setStatus('已创建草稿，填写后点击保存');
  };

  const handleSave = () => {
    const nextWork = formToWork(form);
    const exists = works.some((work) => work.id === nextWork.id);
    const nextWorks = exists ? works.map((work) => (work.id === nextWork.id ? nextWork : work)) : [nextWork, ...works];

    setSelectedId(nextWork.id);
    setForm(workToForm(nextWork));
    persist(nextWorks, '已保存，前台页面已更新');
  };

  const handleDelete = () => {
    if (!selectedWork?.id) return;

    const nextWorks = works.filter((work) => work.id !== selectedWork.id);
    const nextSelected = nextWorks[0] || emptyWork;
    setSelectedId(nextSelected.id || '');
    setForm(workToForm(nextSelected));
    persist(nextWorks, '已删除作品');
  };

  const handleReset = () => {
    resetManagedWorks();
    const nextWorks = loadManagedWorks();
    setWorks(nextWorks);
    setSelectedId(nextWorks[0]?.id || '');
    setForm(workToForm(nextWorks[0] || emptyWork));
    setStatus('已恢复为源码默认作品数据');
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(works, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lmh-aigc-works.json';
    link.click();
    URL.revokeObjectURL(url);
    setStatus('已导出 JSON');
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      if (!Array.isArray(imported)) throw new Error('Invalid JSON');

      persist(imported, '已导入 JSON，前台页面已更新');
      setSelectedId(imported[0]?.id || '');
      setForm(workToForm(imported[0] || emptyWork));
    } catch {
      setStatus('导入失败，请检查 JSON 格式');
    } finally {
      event.target.value = '';
    }
  };

  if (!authed) {
    return (
      <section className="mx-auto flex min-h-[calc(100vh-130px)] w-full max-w-xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <form onSubmit={handleLogin} className="tech-card corner-frame w-full p-7 sm:p-9">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.04] text-white">
            <Lock size={22} />
          </div>
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Admin Login</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">后台管理</h1>
          <p className="mt-4 text-sm leading-7 text-zinc-400">用于管理作品数据、视频链接、封面路径和精选状态。默认密码：LMH2026</p>
          <input
            type="password"
            value={loginValue}
            onChange={(event) => setLoginValue(event.target.value)}
            placeholder="输入后台密码"
            className="mt-7 w-full rounded-[10px] border border-white/12 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/45"
          />
          {loginError && <p className="mt-3 text-sm text-red-300">{loginError}</p>}
          <button type="submit" className="primary-button mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold">
            进入后台
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="Admin System"
        title="作品后台管理"
        description="管理作品标题、分类、封面、视频、链接、标签和精选状态。静态站数据保存在当前浏览器，可导出 JSON 交给源码更新。"
      />

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索作品标题 / 分类 / ID"
            className="w-full rounded-[10px] border border-white/12 bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={handleNew} className="tech-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Plus size={16} /> 新增
          </button>
          <button type="button" onClick={handleExport} className="tech-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Download size={16} /> 导出 JSON
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="tech-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Upload size={16} /> 导入 JSON
          </button>
          <button type="button" onClick={handleReset} className="tech-button inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-300">
            <RotateCcw size={16} /> 恢复默认
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
        </div>
      </div>

      {status && <div className="mb-5 rounded-[10px] border border-cyan-200/20 bg-cyan-200/[0.06] px-4 py-3 text-sm text-cyan-100">{status}</div>}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.35fr]">
        <aside className="tech-card corner-frame overflow-hidden p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Works List</p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">{filteredWorks.length} / {works.length}</span>
          </div>
          <div className="max-h-[720px] space-y-2 overflow-y-auto pr-1">
            {filteredWorks.map((work) => (
              <button
                key={work.id}
                type="button"
                onClick={() => selectWork(work)}
                className={`flex w-full gap-3 rounded-[10px] border p-3 text-left transition ${
                  work.id === selectedId
                    ? 'border-white/45 bg-white/[0.08]'
                    : 'border-white/8 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]'
                }`}
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[8px] bg-black/50">
                  {work.image || work.poster ? (
                    <img src={assetUrl(work.image || work.poster)} alt={work.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-[10px] text-zinc-600">No Image</div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{work.title || '未命名作品'}</p>
                  <p className="mt-1 truncate text-xs text-zinc-500">{work.category}</p>
                  <p className="mt-2 truncate text-[11px] text-zinc-600">{work.id}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="tech-card corner-frame p-5 sm:p-6">
          <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-zinc-500">Preview</p>
              <div className="overflow-hidden rounded-[12px] border border-white/12 bg-black/45">
                <div className="aspect-[4/3] bg-black/50">
                  {form.image || form.poster ? (
                    <img src={assetUrl(form.image || form.poster)} alt={form.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-sm text-zinc-600">暂无封面</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-zinc-500">{form.category}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{form.title || '未命名作品'}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{form.description || '暂无描述'}</p>
                </div>
              </div>
              <Link to="/images" className="tech-button mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm">
                <Eye size={16} /> 查看前台
              </Link>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2 text-sm text-zinc-400">
                作品 ID
                <input value={form.id || ''} onChange={(event) => updateForm('id', event.target.value)} className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
              </label>
              <label className="grid gap-2 text-sm text-zinc-400">
                标题
                <input value={form.title || ''} onChange={(event) => updateForm('title', event.target.value)} className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
              </label>
              <label className="grid gap-2 text-sm text-zinc-400">
                分类
                <select value={form.category || ''} onChange={(event) => updateForm('category', event.target.value)} className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-zinc-400">
                封面 / 图片路径
                <input value={form.image || ''} onChange={(event) => updateForm('image', event.target.value)} placeholder="例如：05_图片作品/作品.png" className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none placeholder:text-zinc-700 focus:border-white/40" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-zinc-400">
                  视频封面路径
                  <input value={form.poster || ''} onChange={(event) => updateForm('poster', event.target.value)} className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
                </label>
                <label className="grid gap-2 text-sm text-zinc-400">
                  站内视频路径
                  <input value={form.video || ''} onChange={(event) => updateForm('video', event.target.value)} className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-zinc-400">
                外部视频 / 链接
                <input value={form.externalUrl || ''} onChange={(event) => updateForm('externalUrl', event.target.value)} className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
              </label>
              <label className="grid gap-2 text-sm text-zinc-400">
                标签，用逗号分隔
                <input value={form.tagsText || ''} onChange={(event) => updateForm('tagsText', event.target.value)} className="rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
              </label>
              <label className="grid gap-2 text-sm text-zinc-400">
                描述
                <textarea value={form.description || ''} onChange={(event) => updateForm('description', event.target.value)} rows={5} className="resize-none rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
              </label>
              <label className="inline-flex items-center gap-3 text-sm text-zinc-300">
                <input type="checkbox" checked={Boolean(form.featured)} onChange={(event) => updateForm('featured', event.target.checked)} className="h-4 w-4 accent-white" />
                设为精选作品
              </label>
              <div className="flex flex-wrap gap-3 pt-2">
                <button type="button" onClick={handleSave} className="primary-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold">
                  <Save size={16} /> 保存作品
                </button>
                <button type="button" onClick={handleDelete} className="tech-button inline-flex items-center gap-2 px-5 py-3 text-sm text-red-200">
                  <Trash2 size={16} /> 删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
