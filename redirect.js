browser.webNavigation.onCommitted.addListener((details) => {
  // Only act on the main frame (not iframes)
  if (details.frameId !== 0) return;

  const url = new URL(details.url);

  // Redirect bare homepage to subscriptions
  if (url.pathname === "/" || url.pathname === "") {
    browser.tabs.update(details.tabId, {
      url: "https://www.youtube.com/feed/subscriptions"
    });
  }
}, {
  url: [{ hostEquals: "www.youtube.com" }]
});
