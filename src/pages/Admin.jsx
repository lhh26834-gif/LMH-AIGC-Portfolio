import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Eye, Lock, LogOut, Plus, RotateCcw, Save, Search, Trash2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import { assetUrl } from '../utils/asset.js';
import { getManagedCategories, loadManagedWorks, refreshManagedWorksFromCloud, resetManagedWorks, saveManagedWorks } from '../utils/adminStore.js';
import { clearStoredSession, deleteCloudWork, getStoredSession, signInWithPassword, supabaseInfo, syncCloudWorks, uploadCloudAsset } from '../utils/supabaseCloud.js';

const adminEmail = 'lhh26834@gmail.com';

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
  const [session, setSession] = useState(() => getStoredSession());
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [works, setWorks] = useState(() => loadManagedWorks());
  const [selectedId, setSelectedId] = useState(() => loadManagedWorks()[0]?.id || '');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const importInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const posterInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const selectedWork = works.find((work) => work.id === selectedId) || works[0] || emptyWork;
  const [form, setForm] = useState(() => workToForm(selectedWork));

  useEffect(() => {
    refreshManagedWorksFromCloud()
      .then((nextWorks) => {
        if (!nextWorks.length) return;
        setWorks(nextWorks);
        setSelectedId((current) => current || nextWorks[0]?.id || '');
        setForm((current) => (current.id ? current : workToForm(nextWorks[0])));
        setStatus('已连接 Supabase，并同步云端作品数据');
      })
      .catch((error) => {
        setStatus(`云端作品暂未同步：${error.message}。如果你还没建表，这是正常的。`);
      });
  }, []);

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

  const persist = async (nextWorks, message) => {
    setSaving(true);
    setWorks(nextWorks);
    saveManagedWorks(nextWorks);

    try {
      const cloudWorks = await syncCloudWorks(nextWorks);
      setWorks(cloudWorks);
      saveManagedWorks(cloudWorks);
      setStatus(`${message}，已同步到 Supabase 云端`);
    } catch (error) {
      setStatus(`${message}，但云端同步失败：${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');
    setSaving(true);

    try {
      const nextSession = await signInWithPassword(email, password);
      setSession(nextSession);

      try {
        const cloudWorks = await refreshManagedWorksFromCloud();
        setWorks(cloudWorks);
        setSelectedId(cloudWorks[0]?.id || '');
        setForm(workToForm(cloudWorks[0] || emptyWork));
        setStatus('登录成功，已读取云端作品数据');
      } catch (cloudError) {
        setStatus(`登录成功，但云端作品表暂时无法读取：${cloudError.message}。请确认已经运行 supabase-setup.sql。`);
      }
    } catch (error) {
      setLoginError(error.message || '登录失败，请检查邮箱和密码');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    clearStoredSession();
    setSession(null);
    setPassword('');
    setStatus('已退出后台登录');
  };

  const handleNew = () => {
    const draft = workToForm({ ...emptyWork, id: createId('new-work'), title: '新作品' });
    setSelectedId(draft.id);
    setForm(draft);
    setStatus('已创建草稿，填写后点击保存');
  };

  const handleSave = async () => {
    const nextWork = formToWork(form);
    const exists = works.some((work) => work.id === nextWork.id);
    const nextWorks = exists ? works.map((work) => (work.id === nextWork.id ? nextWork : work)) : [nextWork, ...works];

    setSelectedId(nextWork.id);
    setForm(workToForm(nextWork));
    await persist(nextWorks, '已保存作品');
  };

  const handleDelete = async () => {
    if (!selectedWork?.id) return;

    const nextWorks = works.filter((work) => work.id !== selectedWork.id);
    const nextSelected = nextWorks[0] || emptyWork;
    setSelectedId(nextSelected.id || '');
    setForm(workToForm(nextSelected));
    setWorks(nextWorks);
    saveManagedWorks(nextWorks);
    setSaving(true);

    try {
      await deleteCloudWork(selectedWork.id);
      setStatus('已删除作品，并同步到 Supabase 云端');
    } catch (error) {
      setStatus(`本地已删除，但云端删除失败：${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    resetManagedWorks();
    const nextWorks = loadManagedWorks();
    setWorks(nextWorks);
    setSelectedId(nextWorks[0]?.id || '');
    setForm(workToForm(nextWorks[0] || emptyWork));
    setStatus('已恢复为源码默认作品数据。需要同步云端时，请点击保存作品或导入 JSON 后保存。');
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
      if (!Array.isArray(imported)) throw new Error('JSON 根节点必须是数组');

      setSelectedId(imported[0]?.id || '');
      setForm(workToForm(imported[0] || emptyWork));
      await persist(imported, '已导入 JSON');
    } catch (error) {
      setStatus(`导入失败：${error.message}`);
    } finally {
      event.target.value = '';
    }
  };

  const handleUpload = async (event, field, folder) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSaving(true);
    try {
      const url = await uploadCloudAsset(file, folder);
      updateForm(field, url);
      setStatus(`上传成功，已写入 ${field} 字段，记得点击保存作品`);
    } catch (error) {
      setStatus(`上传失败：${error.message}`);
    } finally {
      event.target.value = '';
      setSaving(false);
    }
  };

  if (!session) {
    return (
      <section className="mx-auto flex min-h-[calc(100vh-130px)] w-full max-w-xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <form onSubmit={handleLogin} className="tech-card corner-frame w-full p-7 sm:p-9">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.04] text-white">
            <Lock size={22} />
          </div>
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Supabase Admin</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">云端后台登录</h1>
          <p className="mt-4 text-sm leading-7 text-zinc-400">使用 Supabase Auth 邮箱账号登录后，可以在任何设备管理作品内容并同步到网站。</p>
          <label className="mt-7 grid gap-2 text-sm text-zinc-400">
            登录邮箱
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-[10px] border border-white/12 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/45"
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm text-zinc-400">
            登录密码
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="输入你在 Supabase Auth 创建的密码"
              className="w-full rounded-[10px] border border-white/12 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/45"
            />
          </label>
          {loginError && <p className="mt-3 text-sm text-red-300">{loginError}</p>}
          <button type="submit" disabled={saving} className="primary-button mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? '登录中...' : '进入云端后台'}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="Cloud Admin"
        title="云端作品后台"
        description={`已接入 ${supabaseInfo.url}。这里保存的内容会同步到 Supabase，其他设备打开网站也能读取最新作品。`}
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
          <button type="button" onClick={() => importInputRef.current?.click()} className="tech-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Upload size={16} /> 导入 JSON
          </button>
          <button type="button" onClick={handleReset} className="tech-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <RotateCcw size={16} /> 恢复默认
          </button>
          <button type="button" onClick={handleLogout} className="tech-button inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-300">
            <LogOut size={16} /> 退出
          </button>
          <input ref={importInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
          <input ref={imageInputRef} type="file" accept="image/*" onChange={(event) => handleUpload(event, 'image', 'images')} className="hidden" />
          <input ref={posterInputRef} type="file" accept="image/*" onChange={(event) => handleUpload(event, 'poster', 'posters')} className="hidden" />
          <input ref={videoInputRef} type="file" accept="video/*" onChange={(event) => handleUpload(event, 'video', 'videos')} className="hidden" />
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
                <div className="flex gap-2">
                  <input value={form.image || ''} onChange={(event) => updateForm('image', event.target.value)} placeholder="本地路径或 Supabase 图片 URL" className="min-w-0 flex-1 rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none placeholder:text-zinc-700 focus:border-white/40" />
                  <button type="button" onClick={() => imageInputRef.current?.click()} className="tech-button shrink-0 px-3 text-xs">上传</button>
                </div>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-zinc-400">
                  视频封面
                  <div className="flex gap-2">
                    <input value={form.poster || ''} onChange={(event) => updateForm('poster', event.target.value)} className="min-w-0 flex-1 rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
                    <button type="button" onClick={() => posterInputRef.current?.click()} className="tech-button shrink-0 px-3 text-xs">上传</button>
                  </div>
                </label>
                <label className="grid gap-2 text-sm text-zinc-400">
                  站内视频
                  <div className="flex gap-2">
                    <input value={form.video || ''} onChange={(event) => updateForm('video', event.target.value)} className="min-w-0 flex-1 rounded-[9px] border border-white/12 bg-black/35 px-3 py-2.5 text-white outline-none focus:border-white/40" />
                    <button type="button" onClick={() => videoInputRef.current?.click()} className="tech-button shrink-0 px-3 text-xs">上传</button>
                  </div>
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
                <button type="button" onClick={handleSave} disabled={saving} className="primary-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">
                  <Save size={16} /> {saving ? '处理中...' : '保存到云端'}
                </button>
                <button type="button" onClick={handleDelete} disabled={saving} className="tech-button inline-flex items-center gap-2 px-5 py-3 text-sm text-red-200 disabled:cursor-not-allowed disabled:opacity-60">
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
