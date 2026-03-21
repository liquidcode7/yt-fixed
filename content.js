const SELECTORS_TO_REMOVE = [
  "ytd-reel-shelf-renderer",
  "ytd-reel-item-renderer",
  "ytd-compact-autoplay-renderer",
  "ytd-search-pyv-renderer",
  ".ytp-ce-element",
  ".ytp-endscreen-content",
  "ytm-shorts-lockup-view-model-v2",
  "grid-shelf-view-model",
];

function removeJunk() {
  for (const selector of SELECTORS_TO_REMOVE) {
    document.querySelectorAll(selector).forEach(el => el.remove());
  }

  // Remove Shorts from sidebar by href
  document.querySelectorAll("ytd-guide-entry-renderer a").forEach(a => {
    if (a.href.includes("/shorts")) {
      a.closest("ytd-guide-entry-renderer")?.remove();
    }
  });
}

// Run once immediately when page loads
removeJunk();

// Then keep watching for new elements being injected
const observer = new MutationObserver(removeJunk);
observer.observe(document.body, { childList: true, subtree: true });
