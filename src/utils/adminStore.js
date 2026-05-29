import { useEffect, useState } from 'react';
import { categories as baseCategories, works as baseWorks } from '../data/works.js';
import { fetchCloudWorks } from './supabaseCloud.js';

export const ADMIN_WORKS_KEY = 'lmh_aigc_admin_works_v1';
export const ADMIN_EVENT = 'lmh-aigc-works-updated';

function normalizeWork(work) {
  return {
    ...work,
    tags: Array.isArray(work.tags)
      ? work.tags
      : String(work.tags || '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
    featured: Boolean(work.featured),
  };
}

export function loadManagedWorks() {
  if (typeof window === 'undefined') return baseWorks;

  try {
    const raw = window.localStorage.getItem(ADMIN_WORKS_KEY);
    if (!raw) return baseWorks;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return baseWorks;

    return mergeWithBaseWorks(parsed);
  } catch {
    return baseWorks;
  }
}

export function saveManagedWorks(nextWorks) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(ADMIN_WORKS_KEY, JSON.stringify(nextWorks.map(normalizeWork)));
  window.dispatchEvent(new Event(ADMIN_EVENT));
}

function mergeWithBaseWorks(nextWorks) {
  const merged = new Map(baseWorks.map((work) => [work.id, normalizeWork(work)]));

  nextWorks.map(normalizeWork).forEach((work) => {
    merged.set(work.id, work);
  });

  return Array.from(merged.values());
}

export async function refreshManagedWorksFromCloud() {
  const cloudWorks = await fetchCloudWorks();

  if (cloudWorks.length > 0) {
    const mergedWorks = mergeWithBaseWorks(cloudWorks);
    saveManagedWorks(mergedWorks);
    return mergedWorks;
  }

  return loadManagedWorks();
}

export function resetManagedWorks() {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(ADMIN_WORKS_KEY);
  window.dispatchEvent(new Event(ADMIN_EVENT));
}

export function useManagedWorks() {
  const [managedWorks, setManagedWorks] = useState(() => loadManagedWorks());

  useEffect(() => {
    const update = () => setManagedWorks(loadManagedWorks());
    let ignore = false;

    refreshManagedWorksFromCloud()
      .then((cloudWorks) => {
        if (!ignore && cloudWorks.length > 0) setManagedWorks(cloudWorks);
      })
      .catch(() => {
        if (!ignore) setManagedWorks(loadManagedWorks());
      });

    window.addEventListener(ADMIN_EVENT, update);
    window.addEventListener('storage', update);

    return () => {
      ignore = true;
      window.removeEventListener(ADMIN_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return managedWorks;
}

export function getManagedCategories(works = baseWorks) {
  return Array.from(new Set([...baseCategories, ...works.map((work) => work.category).filter(Boolean)]));
}
