// Hardcoded fallback — used when cache is empty or storage is unavailable
const FALLBACK_JS_SELECTORS = [
  "ytd-reel-shelf-renderer",
  "ytd-reel-item-renderer",
  "ytd-compact-autoplay-renderer",
  "ytd-search-pyv-renderer",
  ".ytp-ce-element",
  ".ytp-endscreen-content",
  "ytm-shorts-lockup-view-model-v2",
  "grid-shelf-view-model",
  "ytd-merch-shelf-renderer",
  "ytd-primetime-promo-renderer",
  "ytd-statement-banner-renderer",
  "ytd-donation-shelf-renderer",
  "ytd-brand-video-shelf-renderer",
];

let activeSelectors = FALLBACK_JS_SELECTORS;

function removeJunk() {
  for (const selector of activeSelectors) {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  }

  // Remove Shorts and Gaming from sidebar by href
  document.querySelectorAll("ytd-guide-entry-renderer a").forEach((a) => {
    if (a.href.includes("/shorts") || a.href.includes("/gaming")) {
      a.closest("ytd-guide-entry-renderer")?.remove();
    }
  });
}

function injectCSS(cssSelectors) {
  const style = document.createElement("style");
  style.textContent =
    cssSelectors.join(",\n") + " { display: none !important; }";
  (document.head || document.documentElement).appendChild(style);
}

// Run immediately with hardcoded fallback selectors
removeJunk();

// Observe from documentElement — body may not exist yet at document_start
const observer = new MutationObserver(removeJunk);
observer.observe(document.documentElement, { childList: true, subtree: true });

// Async: load cached selectors and apply them
// Falls back silently to the hardcoded list if storage is unavailable
browser.storage.local.get("selectorCache").then(({ selectorCache }) => {
  if (!selectorCache) return;

  if (selectorCache.js) {
    activeSelectors = selectorCache.js;
    removeJunk(); // Re-run with updated list
  }

  if (selectorCache.css) {
    // Injects supplemental CSS on top of the hardcoded style.css
    injectCSS(selectorCache.css);
  }
});
