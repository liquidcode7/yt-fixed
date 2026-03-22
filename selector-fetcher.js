// URL of the hosted selectors.json — update if the repo moves
const SELECTORS_URL =
  "https://raw.githubusercontent.com/liquidcode7/yt-fixed/main/selectors.json";
const CACHE_KEY = "selectorCache";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

async function fetchAndCache() {
  try {
    const res = await fetch(SELECTORS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    await browser.storage.local.set({
      [CACHE_KEY]: { ...data, cachedAt: Date.now() },
    });
  } catch (err) {
    console.warn("[yt-fixed] Selector fetch failed:", err.message);
    // Cached version (or hardcoded fallback in content.js) will be used
  }
}

async function maybeRefresh() {
  const result = await browser.storage.local.get(CACHE_KEY);
  const cache = result[CACHE_KEY];
  if (!cache || Date.now() - cache.cachedAt > CACHE_TTL_MS) {
    await fetchAndCache();
  }
}

// On install: create the daily alarm and do an immediate fetch
browser.runtime.onInstalled.addListener(() => {
  browser.alarms.create("refreshSelectors", { periodInMinutes: 1440 });
  fetchAndCache();
});

// On browser startup: refresh if cache is stale
browser.runtime.onStartup.addListener(maybeRefresh);

// Daily alarm fires even when the background is sleeping (event page)
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "refreshSelectors") fetchAndCache();
});
