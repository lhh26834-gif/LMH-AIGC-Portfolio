const SUPABASE_URL = 'https://myrbizqygcknzwmziynn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_nMl4vCwecV3Hdw7Orh6OUQ_QDwCLG9i';
const WORKS_TABLE = 'works';
const STORAGE_BUCKET = 'portfolio-assets';
const SESSION_KEY = 'lmh_aigc_supabase_session';

function apiUrl(path) {
  return `${SUPABASE_URL}${path}`;
}

function baseHeaders(token) {
  return {
    apikey: SUPABASE_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;

  return String(tags || '')
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeWork(work) {
  return {
    ...work,
    tags: normalizeTags(work.tags),
    featured: Boolean(work.featured),
  };
}

function rowToWork(row) {
  return normalizeWork({
    id: row.id,
    ...(row.data || {}),
    title: row.title || row.data?.title || '',
    category: row.category || row.data?.category || '',
  });
}

function workToRow(work, index = 0) {
  const data = normalizeWork(work);

  return {
    id: data.id,
    title: data.title || '',
    category: data.category || '',
    sort_order: index,
    data,
  };
}

async function parseResponse(response) {
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const detail = body?.message || body?.msg || body?.error_description || body?.error || body?.code || response.statusText;
    throw new Error(detail ? `Supabase ${response.status}: ${detail}` : `Supabase request failed (${response.status})`);
  }

  return body;
}

export function getStoredSession() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredSession(session) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(SESSION_KEY);
}

export async function signInWithPassword(email, password) {
  const response = await fetch(apiUrl('/auth/v1/token?grant_type=password'), {
    method: 'POST',
    headers: {
      ...baseHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const session = await parseResponse(response);
  saveStoredSession(session);
  return session;
}

export async function fetchCloudWorks() {
  const session = getStoredSession();
  const response = await fetch(apiUrl(`/rest/v1/${WORKS_TABLE}?select=id,title,category,sort_order,data&order=sort_order.asc.nullslast,title.asc`), {
    headers: baseHeaders(session?.access_token),
  });

  const rows = await parseResponse(response);
  return Array.isArray(rows) ? rows.map(rowToWork) : [];
}

export async function syncCloudWorks(nextWorks) {
  const token = getStoredSession()?.access_token;
  if (!token) throw new Error('请先登录 Supabase 后台账号');

  const response = await fetch(apiUrl(`/rest/v1/${WORKS_TABLE}?on_conflict=id`), {
    method: 'POST',
    headers: {
      ...baseHeaders(token),
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(nextWorks.map(workToRow)),
  });

  const rows = await parseResponse(response);
  return Array.isArray(rows) ? rows.map(rowToWork) : nextWorks;
}

export async function deleteCloudWork(id) {
  const token = getStoredSession()?.access_token;
  if (!token) throw new Error('请先登录 Supabase 后台账号');

  const response = await fetch(apiUrl(`/rest/v1/${WORKS_TABLE}?id=eq.${encodeURIComponent(id)}`), {
    method: 'DELETE',
    headers: {
      ...baseHeaders(token),
      Prefer: 'return=minimal',
    },
  });

  await parseResponse(response);
}

export async function uploadCloudAsset(file, folder = 'works') {
  const token = getStoredSession()?.access_token;
  if (!token) throw new Error('请先登录 Supabase 后台账号');

  const safeName = `${Date.now()}-${file.name}`.replace(/[^\w.\-\u4e00-\u9fa5]/g, '-');
  const path = `${folder}/${safeName}`;
  const response = await fetch(apiUrl(`/storage/v1/object/${STORAGE_BUCKET}/${encodeURIComponent(path).replace(/%2F/g, '/')}`), {
    method: 'POST',
    headers: {
      ...baseHeaders(token),
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: file,
  });

  await parseResponse(response);
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}

export const supabaseInfo = {
  url: SUPABASE_URL,
  worksTable: WORKS_TABLE,
  storageBucket: STORAGE_BUCKET,
};
